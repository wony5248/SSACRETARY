package com.ssacretary.api.service;

import com.ssacretary.api.request.user.EditUserReq;
import com.ssacretary.api.request.user.LoginReq;
import com.ssacretary.api.request.user.SignupReq;
import com.ssacretary.api.response.user.UserLoginPostRes;
import com.ssacretary.common.response.BaseResponseBody;
import com.ssacretary.config.JwtTokenProvider;
import com.ssacretary.db.entity.User;
import com.ssacretary.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean isValidToken(String token) {
        if (token != null && token.length() > 0) {
            //logger.debug("token 검증");
            return jwtTokenProvider.validateToken(token);
        } else {
            throw new RuntimeException("인증 토큰이 없습니다");
        }
    }

    @Override
    public void createUser(SignupReq signupReq) {
        if (signupReq.getPassword().equals(signupReq.getPasswordCheck())) {
            userRepository.save(User.builder()
                    .email(signupReq.getEmail())
                    .nickname(signupReq.getNickname())
                    .phone(signupReq.getPhone())
                    .password(passwordEncoder.encode(signupReq.getPassword()))
                    .build());
        }
    }
//    public void signUp(UserReq info) {
//        // 유저만 만들어서 저장. Role이 다르다!
//            User user = User.builder()
//                    .id(info.getId())
//                    .nickname(info.getNickname())
//                    .passwd(passwordEncoder.encode(info.getPasswd()))   //decoding how?
//                    //   .roles(Collections.singletonList("ROLE_USER"))
//                    .role("USER")
//                    .pg(info.getPg())
//                    .photo(info.getPhoto())
//                    .build();
//            userRepository.save(user);
//    }

    @Override
    public UserLoginPostRes login(LoginReq loginReq) {
        //logger.debug("로그인 메서드 진입");
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
            User user = userRepository.findByEmail(email).get();
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
            return null;
        }
    }

//    @Override
//    public BaseResponseBody signOut(String JWT) {
//        ValueOperations<String, String> logoutValueOpations = redisTemplate.opsForValue();
//        logoutValueOpations.set(JWT, JWT);
//        User member = (User) jwtTokenProvider.getAuthentication(JWT).getPrincipal();
//        return BaseResponseBody.of(200, "Success Logout");
//    }

    @Override
    public UserLoginPostRes getProfile(String token) {
        String email = jwtTokenProvider.getUserInfo(token);

        User member = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));
        UserLoginPostRes userLoginPostRes = new UserLoginPostRes();

        userLoginPostRes.setEmail(email);
        userLoginPostRes.setNickname(member.getNickname());
        userLoginPostRes.setPhoneNum(member.getPhone());
        return userLoginPostRes;
    }
}
