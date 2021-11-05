package com.ssacretary.api.controller;

import com.ssacretary.api.request.crawling.AddSettingReq;
import com.ssacretary.api.response.crawling.GetAllLogsRes;
import com.ssacretary.api.response.crawling.GetAllSettingsRes;
import com.ssacretary.api.response.crawling.GetSettingDetailRes;
import com.ssacretary.api.service.CrawlingService;
import com.ssacretary.common.response.BaseResponseBody;
import com.ssacretary.config.JwtTokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Crawling API", tags = {"Crawling"})
@RequestMapping("/api/crawling")
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class CrawlingController {

    @Autowired
    CrawlingService crawlingService;

    @PostMapping("/")
    @ApiOperation(value = "크롤링 세팅 db에 저장")
    public ResponseEntity<BaseResponseBody> addSetting(@RequestHeader("Authorization") String JWT, @RequestBody AddSettingReq addSettingReq){

        boolean resbody = crawlingService.addSetting(JWT, addSettingReq);

        if(resbody){
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401,"Failed"));
    }

    @GetMapping("/")
    @ApiOperation(value = "나의 모든 크롤링 정보 가져오기")
    public ResponseEntity<GetAllSettingsRes> getAllSettings(@RequestHeader("Authorization") String JWT) {
        //jwt로 본인확인후 가져옴

        GetAllSettingsRes getAllSettingsRes = crawlingService.getAllSettings(JWT);

        return ResponseEntity.status(401).body(GetAllSettingsRes.of(401, "Failed",null));
    }

    @GetMapping("/{crawlingId}")
    @ApiOperation(value = "크롤링 세팅 하나의 정보 가져오기")
    public ResponseEntity<GetSettingDetailRes> getSettingDetail(@RequestHeader("Authorization") String JWT, @PathVariable("crawlingId") String crawlingId){
        //jwt로 본인확인
        GetSettingDetailRes getSettingDetailRes = crawlingService.getSettingDetail(JWT, crawlingId);

        return ResponseEntity.status(401).body(GetSettingDetailRes.of(401, "Failed",null,null,null,null,0,false,false,null));
    }

    @PutMapping("/{crawlingId}")
    @ApiOperation(value = "크롤링 세팅 수정")
    public ResponseEntity<BaseResponseBody> editSetting(@RequestHeader("Authorization") String JWT, @PathVariable("crawlingId") String crawlingId){
        //jwt로 본인확인후 가져옴
        boolean resbody = crawlingService.editSetting(JWT, crawlingId);

        if(resbody){
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failed"));
    }

    @DeleteMapping("/{crawlingId}")
    @ApiOperation(value = "크롤링 세팅 삭제")
    public ResponseEntity<BaseResponseBody> deleteSetting(@RequestHeader("Authorization") String JWT, @PathVariable("crawlingId") String crawlingId){
        //jwt로 본인확인후 가져옴
        boolean resbody = crawlingService.deleteSetting(JWT, crawlingId);

        if(resbody){
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failed"));
    }

    @GetMapping("/log")
    @ApiOperation(value = "나의 모든 크롤링 로그 조회")
    public ResponseEntity<GetAllLogsRes> getAllLog(@RequestHeader("Authorization") String JWT){
        //jwt로 본인확인후 가져옴
        GetAllLogsRes getAllLogsRes = crawlingService.getAllLog(JWT);

        return ResponseEntity.status(401).body(GetAllLogsRes.of(401, "Failed",null));
    }
}
