package com.ssacretary.api.service;

import com.ssacretary.api.request.user.DeleteUserReq;
import com.ssacretary.api.request.user.EditUserReq;
import com.ssacretary.api.request.user.LoginReq;
import com.ssacretary.api.request.user.SignupReq;
import com.ssacretary.api.response.user.UserLoginPostRes;
import com.ssacretary.config.JwtTokenProvider;
import com.ssacretary.db.entity.User;
import com.ssacretary.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean createUser(SignupReq signupReq) {
        try{
            if (signupReq.getPassword().equals(signupReq.getPasswordCheck())) {
                userRepository.save(User.builder()
                        .email(signupReq.getEmail())
                        .nickname(signupReq.getNickname())
                        .phone(signupReq.getPhoneNum())
                        .password(passwordEncoder.encode(signupReq.getPassword()))
                        .build());
            }
            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }

    @Override
    public UserLoginPostRes login(LoginReq loginReq) {
        User user = userRepository.findByEmail(loginReq.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 E-MAIL 입니다."));
        if (!passwordEncoder.matches(loginReq.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        UserLoginPostRes resbody = new UserLoginPostRes();
        resbody.setJwt(jwtTokenProvider.createToken(loginReq.getEmail()));
        resbody.setEmail(loginReq.getEmail());
        resbody.setNickname(user.getNickname());
        resbody.setPhoneNum(user.getPhone());
        return resbody;
    }

    @Override
    public UserLoginPostRes editUser(String jwt, EditUserReq editUserReq){
        try{
            String email = jwtTokenProvider.getUserInfo(jwt);
            if(!email.equals(editUserReq.getEmail())) throw new Exception();
            User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));
            user.updateUserProfile(editUserReq);
            userRepository.save(user);

            UserLoginPostRes resbody = new UserLoginPostRes();
            resbody.setJwt(jwt);
            resbody.setNickname(user.getNickname());
            resbody.setEmail(email);
            resbody.setPhoneNum(user.getPhone());
            return resbody;
        }catch (Exception e){
            System.out.println(e);
            UserLoginPostRes resbody = new UserLoginPostRes();
            resbody.setJwt(jwt);
            resbody.setEmail("");
            return resbody;
        }
    }

    @Override
    public boolean deleteUser(String jwt, DeleteUserReq deleteUserReq){
        try{
            String email = jwtTokenProvider.getUserInfo(jwt);
            if(!email.equals(deleteUserReq.getEmail())) return false;
            userRepository.deleteByEmail(email);
            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    }

//    @Override
//    public BaseResponseBody signOut(String JWT) {
//        ValueOperations<String, String> logoutValueOpations = redisTemplate.opsForValue();
//        logoutValueOpations.set(JWT, JWT);
//        User member = (User) jwtTokenProvider.getAuthentication(JWT).getPrincipal();
//        return BaseResponseBody.of(200, "Success Logout");
//    }

//    @Override
//    public UserLoginPostRes getProfile(String token) {
//        String email = jwtTokenProvider.getUserInfo(token);
//
//        User member = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));
//        UserLoginPostRes userLoginPostRes = new UserLoginPostRes();
//
//        userLoginPostRes.setEmail(email);
//        userLoginPostRes.setNickname(member.getNickname());
//        userLoginPostRes.setPhoneNum(member.getPhone());
//        return userLoginPostRes;
//    }
}
