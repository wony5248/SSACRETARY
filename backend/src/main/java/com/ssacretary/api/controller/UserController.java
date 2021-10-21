package com.ssacretary.api.controller;

import com.ssacretary.api.request.UserLoginPostReq;
import com.ssacretary.api.request.UserPostReq;
import com.ssacretary.api.response.UserLoginPostRes;
import com.ssacretary.api.service.UserService;
import com.ssacretary.common.response.BaseResponseBody;
import com.ssacretary.config.JwtTokenProvider;
import com.ssacretary.db.entity.User;
import com.ssacretary.db.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "유저 API", tags = {"User"})
@RequestMapping("/user")
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Autowired
    UserService userService;

    // 회원가입
    @PostMapping("/")
    @ApiOperation(value = "회원 가입", notes = "<strong>이메일과 패스워드</strong>를 통해 회원가입 한다.")
    public ResponseEntity<? extends BaseResponseBody> signUp(@RequestBody UserPostReq userPostReq) {

        userService.createUser(userPostReq);

        return ResponseEntity.status(201).body(BaseResponseBody.of(200, "정상"));
    }

    // 로그인
    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    public ResponseEntity<UserLoginPostRes> login(@RequestBody UserLoginPostReq userLoginPostReq) {
        User user = userRepository.findByEmail(userLoginPostReq.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 E-MAIL 입니다."));
        if (!passwordEncoder.matches(userLoginPostReq.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        return new ResponseEntity<UserLoginPostRes>(jwtTokenProvider.loginResponse(user.getEmail()), HttpStatus.OK);
    }

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
