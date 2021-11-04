package com.ssacretary.api.controller;

import com.ssacretary.api.request.user.EditUserReq;
import com.ssacretary.api.request.user.LoginReq;
import com.ssacretary.api.request.user.SignupReq;
import com.ssacretary.api.response.user.UserLoginPostRes;
import com.ssacretary.api.service.UserServiceImpl;
import com.ssacretary.common.response.BaseResponseBody;
import com.ssacretary.config.JwtTokenProvider;
import com.ssacretary.db.entity.Log;
import com.ssacretary.db.entity.User;
import com.ssacretary.db.repository.UserRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Api(value = "유저 API", tags = {"User"})
@RequestMapping("/api/user")
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Autowired
    UserServiceImpl userServiceImpl;

    // 회원가입
    @PostMapping("/")
    @ApiOperation(value = "회원 가입", notes = "<strong>이메일과 패스워드</strong>를 통해 회원가입 한다.")
    public ResponseEntity<? extends BaseResponseBody> signUp(@RequestBody SignupReq signupReq) {

        userServiceImpl.createUser(signupReq);

        return ResponseEntity.ok().body(BaseResponseBody.of(200, "정상"));
    }

    // 로그인
    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) LoginReq loginReq, HttpServletResponse response) {
        UserLoginPostRes resbody = userServiceImpl.login(loginReq);
        response.setHeader("Authorization",resbody.getJwt());
        if(resbody.getNickname()!=null){
            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success",resbody.getJwt(), resbody.getEmail(), resbody.getPhoneNum(), resbody.getNickname()));
        }
        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "아이디 또는 비밀번호가 틀렸습니다.",null,null,null,null));
    }




    // 회원정보 수정
    @PutMapping("/editUser")
    @ApiOperation(value = "회원정보 수정")
    public ResponseEntity<BaseResponseBody> editUser(@RequestHeader(value = "Authorization") String JWT, @RequestBody EditUserReq editUserReq){
        boolean resbody = userServiceImpl.editUser(JWT,editUserReq);
        if(resbody){
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failed"));
    }

//    //로그아웃
//    @ApiImplicitParams({@ApiImplicitParam(name = "SSACRETARY-TOKEN", value = "JWT token", required = true, dataType = "string", paramType = "header")})
//    @ApiOperation(value = "로그아웃")
//    @GetMapping("/signout")
//    public BaseResponseBody signOut(@RequestHeader(value = "SSACRETARY-TOKEN") String JWT) {
//        return userServiceImpl.signOut(JWT);
//    }


    // 회원 이메일 중복 확인
    @GetMapping("/userEmailCheck/{email}")
    @ApiOperation(value = "회원 이메일 중복 확인", notes = "DB에 있으면 202, 없으면 201")
    public ResponseEntity<? extends BaseResponseBody> userEmailCheck(@PathVariable("email") String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(202).body(BaseResponseBody.of(202, "이메일이 중복입니다"));
        } else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "이메일 사용가능"));
        }
    }

    // 회원 닉네임 중복 확인
    @GetMapping("/userNickNameCheck/{nickname}")
    @ApiOperation(value = "회원 닉네임 중복 확인", notes = "DB에 있으면 202, 없으면 201")
    public ResponseEntity<? extends BaseResponseBody> userNickNameCheck(@PathVariable("nickname") String nickname) {
        if (userRepository.findByNickname(nickname).isPresent()) {
            return ResponseEntity.status(202).body(BaseResponseBody.of(202, "닉네임이 중복입니다"));
        } else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "닉네임 사용가능"));
        }
    }

    // 회원 닉네임 중복 확인
    @GetMapping("/userPhoneNumberCheck/{phone}")
    @ApiOperation(value = "회원 핸드폰 번호 중복 확인", notes = "DB에 있으면 202, 없으면 201")
    public ResponseEntity<? extends BaseResponseBody> userPhoneNumberCheck(@PathVariable("phone") String phone) {
        if (userRepository.findByPhone(phone).isPresent()) {
            return ResponseEntity.status(202).body(BaseResponseBody.of(202, "닉네임이 중복입니다"));
        } else {
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "닉네임 사용가능"));
        }
    }

}
