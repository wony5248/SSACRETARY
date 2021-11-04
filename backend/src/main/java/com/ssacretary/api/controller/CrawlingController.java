package com.ssacretary.api.controller;

import com.ssacretary.api.request.crawling.AddSettingReq;
import com.ssacretary.api.response.crawling.GetAllLogsRes;
import com.ssacretary.api.response.crawling.GetAllSettingsRes;
import com.ssacretary.api.response.crawling.GetSettingDetailRes;
import com.ssacretary.api.service.CrawlingService;
import com.ssacretary.common.response.BaseResponseBody;
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

    @PostMapping("/crawling")
    @ApiOperation(value = "크롤링 세팅 db에 저장")
    public ResponseEntity<BaseResponseBody> addSetting(@RequestHeader("JWT") String JWT, @RequestBody AddSettingReq addSettingReq){
        //jwt로 본인확인후

        boolean resbody = crawlingService.addSetting(addSettingReq);

        if(resbody){
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401,"Failed"));
    }

    @GetMapping("/crawling")
    @ApiOperation(value = "나의 모든 크롤링 정보 가져오기")
    public ResponseEntity<GetAllSettingsRes> getAllSettings(@RequestHeader("JWT") String JWT) {
        //jwt로 본인확인후 가져옴

        GetAllSettingsRes getAllSettingsRes = crawlingService.getAllSettings();

        return ResponseEntity.status(401).body(GetAllSettingsRes.of(401, "Failed",null));
    }

    @GetMapping("/crawling/{crawlingId}")
    @ApiOperation(value = "크롤링 세팅 하나의 정보 가져오기")
    public ResponseEntity<GetSettingDetailRes> getSettingDetail(@RequestHeader("JWT") String JWT, @PathVariable("crawlingId") String crawlingId){
        //jwt로 본인확인
        GetSettingDetailRes getSettingDetailRes = crawlingService.getSettingDetail(crawlingId);

        return ResponseEntity.status(401).body(GetSettingDetailRes.of(401, "Failed",null,null,null,null,0,false,false,null));
    }

    @PutMapping("/crawling/{crawlingId}")
    @ApiOperation(value = "크롤링 세팅 수정")
    public ResponseEntity<BaseResponseBody> editSetting(@RequestHeader("JWT") String JWT, @PathVariable("crawlingId") String crawlingId){
        //jwt로 본인확인후 가져옴
        boolean resbody = crawlingService.editSetting(crawlingId);

        if(resbody){
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failed"));
    }

    @DeleteMapping("/crawling/{crawlingId}")
    @ApiOperation(value = "크롤링 세팅 삭제")
    public ResponseEntity<BaseResponseBody> deleteSetting(@RequestHeader("JWT") String JWT, @PathVariable("crawlingId") String crawlingId){
        //jwt로 본인확인후 가져옴
        boolean resbody = crawlingService.deleteSetting(crawlingId);

        if(resbody){
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failed"));
    }

    @GetMapping("/log")
    @ApiOperation(value = "나의 모든 크롤링 로그 조회")
    public ResponseEntity<GetAllLogsRes> getAllLog(@RequestHeader("JWT") String JWT){
        //jwt로 본인확인후 가져옴
        GetAllLogsRes getAllLogsRes = crawlingService.getAllLog();

        return ResponseEntity.status(401).body(GetAllLogsRes.of(401, "Failed",null));
    }
}
