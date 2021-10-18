package com.ssacretary.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Test API", tags = {"Test"})
@RequestMapping("/test")
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class TestController {

    // 기업회원 아이디 중복 확인
    @GetMapping("/testCheck/{testId}")
    @ApiOperation(value = "Test 확인", notes = "TestID를 리턴한다")
    public ResponseEntity<String> userNicknameCheck(@PathVariable("testId") String testId) {
        return new ResponseEntity<String>(testId, HttpStatus.OK);
    }
}
