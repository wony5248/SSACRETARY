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

    public String getEmailFromJwt(String jwt){
        String email = jwtTokenProvider.getUserInfo(jwt);
        User user = userRepository.findByEmail(email).orElseThrow(()-> new IllegalArgumentException("존재하지 않는 아이디입니다"));
        return user.getEmail();
    }

    @Override
    public boolean addSetting(String jwt, AddSettingReq addSettingReq){
        try {
            //jwt로 본인확인후


            //키워드가 있는지를 검사
            for(int i=0;i<addSettingReq.getKeywords().size();i++){
                String k = addSettingReq.getKeywords().get(i);
                keywordRepository.save(Keyword.builder().keyword(k).build());
            }
            Optional<User> user = userRepository.findByEmail(addSettingReq.getUserEmail());
            LocalDateTime dateTime = LocalDateTime.now();
            settingRepository.save(Setting.builder()
            .user(user.get()).url(addSettingReq.getUrl()).type(addSettingReq.getType()).alarm(addSettingReq.isMailAlarm()).sms(addSettingReq.isSmsAlarm())
            .name(addSettingReq.getName()).createdAt(dateTime).updatedAt(dateTime).build());
            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    };
    @Override
    public GetAllSettingsRes getAllSettings(){
        //jwt인증 후
//        Setting setting = settingRepository.
        return null;
    };
    @Override
    public GetSettingDetailRes getSettingDetail(String crawlingId){

        return null;
    };
    @Override
    public boolean editSetting(String crawlingId){

        return false;
    };
    @Override
    public boolean deleteSetting(String crawlingId){

        return false;
    };
    @Override
    public GetAllLogsRes getAllLog(){

        return null;
    };
}
