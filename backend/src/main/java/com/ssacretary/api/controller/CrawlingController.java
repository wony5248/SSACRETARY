package com.ssacretary.api.controller;

import com.ssacretary.api.request.AddSettingReq;
import com.ssacretary.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Test API", tags = {"Test"})
@RequestMapping("/test")
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class CrawlingController extends BaseResponseBody {

    //크롤링 세팅 db에 저장
    @PostMapping("/crawling")
    public ResponseEntity<BaseResponseBody> addSetting(@RequestHeader("JWT") String JWT, @RequestBody AddSettingReq addSettingReq){
        return ResponseEntity.status(401).body(BaseResponseBody.of(401,"Failed"));
    }

    //나의 모든 크롤링 정보 가져오기
    @GetMapping("/crawling")
    public ResponseEntity<BaseResponseBody> getAllSettings(@RequestHeader("JWT") String JWT) {
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failed"));
    }

    //크롤링 세팅 하나의 정보 가져오기
    @GetMapping("/crawling/{crawlingId}")
    public ResponseEntity<BaseResponseBody> getSettingDetail(){
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failed"));
    }

    //크롤링 세팅 수정
    @PutMapping("/crawling/{crawlingId}")
    public ResponseEntity<BaseResponseBody> editSetting(){
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failed"));
    }

    //크롤링 세팅 삭제
    @DeleteMapping("/crawling/{crawlingId}")
    public ResponseEntity<BaseResponseBody> deleteSetting(){
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failed"));
    }

    //유저가 가지고 있는 모든 크롤링 로그 전체 조회(결과값)-전체 로그 다 보내기
    @GetMapping("/log")
    public ResponseEntity<BaseResponseBody> getAllLog(){
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failed"));
    }
}
