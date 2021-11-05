package com.ssacretary.api.service;

import com.ssacretary.api.request.crawling.AddSettingReq;
import com.ssacretary.api.response.crawling.GetAllLogsRes;
import com.ssacretary.api.response.crawling.GetAllSettingsRes;
import com.ssacretary.api.response.crawling.GetSettingDetailRes;
import com.ssacretary.config.JwtTokenProvider;
import com.ssacretary.db.entity.Keyword;
import com.ssacretary.db.entity.Setting;
import com.ssacretary.db.entity.User;
import com.ssacretary.db.repository.KeywordRepository;
import com.ssacretary.db.repository.SettingRepository;
import com.ssacretary.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CrawlingServiceImpl implements CrawlingService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SettingRepository settingRepository;
    @Autowired
    private KeywordRepository keywordRepository;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean addSetting(String jwt, AddSettingReq addSettingReq){
        try {
            //jwt로 본인확인후
            String email = jwtTokenProvider.getUserInfo(jwt);
            if(!email.equals(addSettingReq.getEmail())) throw new Exception();

            //키워드가 있는지를 검사

            for(int i=0;i<addSettingReq.getKeywords().size();i++){
                String k = addSettingReq.getKeywords().get(i);
                keywordRepository.save(Keyword.builder().keyword(k).build());
            }
            User user = userRepository.findByEmail(email).orElseThrow(()-> new IllegalArgumentException("존재하지 않는 이메일입니다."));
            LocalDateTime dateTime = LocalDateTime.now();
            settingRepository.save(Setting.builder()
            .user(user).url(addSettingReq.getUrl()).type(addSettingReq.getType()).alarm(addSettingReq.isMailAlarm()).sms(addSettingReq.isSmsAlarm())
            .name(addSettingReq.getName()).createdAt(dateTime).updatedAt(dateTime).build());
            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    };
    @Override
    public GetAllSettingsRes getAllSettings(String jwt){
        //jwt로 본인확인후
//        String email = jwtTokenProvider.getUserInfo(jwt);
//        if(!email.equals(addSettingReq.getEmail())) throw new Exception();

//        Setting setting = settingRepository.
        return null;
    };
    @Override
    public GetSettingDetailRes getSettingDetail(String jwt, String crawlingId){

        return null;
    };
    @Override
    public boolean editSetting(String jwt, String crawlingId){

        return false;
    };
    @Override
    public boolean deleteSetting(String jwt, String crawlingId){

        return false;
    };
    @Override
    public GetAllLogsRes getAllLog(String jwt){

        return null;
    };
}
