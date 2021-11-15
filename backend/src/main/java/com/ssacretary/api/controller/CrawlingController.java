package com.ssacretary.api.controller;

import com.ssacretary.api.request.crawling.AddSettingReq;
import com.ssacretary.api.request.crawling.EditSettingReq;
import com.ssacretary.api.request.crawling.BaseCrawlingReq;
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

    @PostMapping("/")
    @ApiOperation(value = "크롤링 세팅 db에 저장")
    public ResponseEntity<BaseResponseBody> addSetting(@RequestHeader("Authorization") String JWT, @RequestBody AddSettingReq addSettingReq){

        boolean resbody = crawlingService.addSetting(JWT, addSettingReq);

        if(resbody){
            return ResponseEntity.ok(BaseResponseBody.of(200, "저장 성공"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401,"저장 실패"));
    }

    @GetMapping("/")
    @ApiOperation(value = "나의 모든 세팅 정보 가져오기")
    public ResponseEntity<GetAllSettingsRes> getAllSettings(@RequestHeader("Authorization") String JWT) {
        GetAllSettingsRes getAllSettingsRes = crawlingService.getAllSettings(JWT);

        if(getAllSettingsRes.getAllSettingData()!=null){
            return ResponseEntity.ok(GetAllSettingsRes.of(200, "조회 성공",getAllSettingsRes.getAllSettingData()));
        }
        return ResponseEntity.status(401).body(GetAllSettingsRes.of(401, "조회 실패",null));
    }

    @GetMapping("/detail/{settingId}")
    @ApiOperation(value = "크롤링 세팅 하나의 정보 가져오기")
    public ResponseEntity<GetSettingDetailRes> getSettingDetail(@RequestHeader("Authorization") String JWT, @PathVariable int settingId){
        GetSettingDetailRes resbody = crawlingService.getSettingDetail(JWT, settingId);

        if(resbody.getSettingId()>0){
            return ResponseEntity.ok(GetSettingDetailRes.of(200, "조회 성공",resbody.getSettingId(), resbody.getUrl(), resbody.getType(), resbody.getPeriod(),
                    resbody.isMailAlarm(), resbody.isSmsAlarm(), resbody.getName(), resbody.getCreatedAt(), resbody.getUpdatedAt(),resbody.getKeywords(), resbody.getLogs()));
        }
        return ResponseEntity.status(401).body(GetSettingDetailRes.of(401, "조회 실패",-1,null,null,-1,false,false,null,null,null,null,null));
    }

    @PutMapping("/")
    @ApiOperation(value = "크롤링 세팅 수정")
    public ResponseEntity<BaseResponseBody> editSetting(@RequestHeader("Authorization") String JWT, @RequestBody EditSettingReq editSettingReq){
        //jwt로 본인확인후 가져옴
        boolean resbody = crawlingService.editSetting(JWT, editSettingReq);

        if(resbody){
            return ResponseEntity.ok(BaseResponseBody.of(200, "수정 성공"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "수정 실패"));
    }

    @DeleteMapping("/{settingId}")
    @ApiOperation(value = "크롤링 세팅 삭제")
    public ResponseEntity<BaseResponseBody> deleteSetting(@RequestHeader("Authorization") String JWT, @PathVariable int settingId){
        //jwt로 본인확인후 가져옴
        boolean resbody = crawlingService.deleteSetting(JWT, settingId);

        if(resbody){
            return ResponseEntity.ok(BaseResponseBody.of(200, "삭제 성공"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "삭제 실패"));
    }

    @GetMapping("/log")
    @ApiOperation(value = "나의 모든 크롤링 로그 조회")
    public ResponseEntity<GetAllLogsRes> getAllLog(@RequestHeader("Authorization") String JWT){
        //jwt로 본인확인후 가져옴
        GetAllLogsRes getAllLogsRes = crawlingService.getAllLog(JWT);

        if (getAllLogsRes.getAllLogsData()!=null){
            return ResponseEntity.ok(GetAllLogsRes.of(200, "조회 성공",getAllLogsRes.getAllLogsData()));
        }

        return ResponseEntity.status(401).body(GetAllLogsRes.of(401, "조회 실패",null));
    }
}
