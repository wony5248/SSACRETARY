package com.ssacretary.api.service;

import com.ssacretary.api.request.crawling.AddSettingReq;
import com.ssacretary.api.request.crawling.GetAllSettingReq;
import com.ssacretary.api.request.crawling.BaseCrawlingReq;
import com.ssacretary.api.response.crawling.*;
import com.ssacretary.config.JwtTokenProvider;
import com.ssacretary.db.entity.*;
import com.ssacretary.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CrawlingServiceImpl implements CrawlingService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SettingRepository settingRepository;
    @Autowired
    private KeywordRepository keywordRepository;
    @Autowired
    private SettingKeywordRepository settingKeywordRepository;
    @Autowired
    private LogRepository logRepository;
    @Autowired
    private CountRepository countRepository;
    @Autowired
    private SentenceRepository sentenceRepository;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean addSetting(String jwt, AddSettingReq addSettingReq){
        try {
            //jwt로 본인확인후
            String email = jwtTokenProvider.getUserInfo(jwt);
            if(!email.equals(addSettingReq.getEmail())) throw new Exception();

            //키워드가 있는지를 검사
            List<String> keyList = new ArrayList<>();
            for(int i=0;i<addSettingReq.getKeywords().size();i++){
                Keyword keyId = keywordRepository.findByKeyword(keyList.get(i));
                if(keyId==null){
                    keywordRepository.save(Keyword.builder().keyword(keyList.get(i)).build());
                }

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
    public GetAllSettingsRes getAllSettings(String jwt, GetAllSettingReq getAllSettingReq){
        try{
            //jwt로 본인확인후
            String email = jwtTokenProvider.getUserInfo(jwt);
            if(!email.equals(getAllSettingReq.getEmail())) throw new Exception();

            //해당 유저의 전체 세팅 찾기
            List<Setting> setting = settingRepository.findByUser_Email(email);

            //모든 세팅 목록 불러오기
            List<AllSettingData> allList = new ArrayList<>();
            AllSettingData allset = new AllSettingData();
            for (int i =0;i<setting.size();i++){
                allset.setSettingId(setting.get(i).getSettingId());

                List<SettingKeyword> sk = settingKeywordRepository.findBySetting_SettingId(setting.get(i).getSettingId());
                List<String> keywords = new ArrayList<>();
                for(int j=0;j<sk.size();j++){
                    keywords.add(sk.get(j).getKeyword().getKeyword());
                }
                allset.setKeywords(keywords);
                allset.setUrl(setting.get(i).getUrl());
                allList.add(allset);
            }

            GetAllSettingsRes resbody = new GetAllSettingsRes();
            resbody.setAllSettingData(allList);
            return resbody;
        }catch (Exception e){
            System.out.println(e);
            GetAllSettingsRes resbody = new GetAllSettingsRes();
            resbody.setAllSettingData(new ArrayList<>());
            return resbody;
        }
    };
    @Override
    public GetSettingDetailRes getSettingDetail(String jwt, BaseCrawlingReq baseCrawlingReq){
        try{
            //jwt로 본인확인후
            String email = jwtTokenProvider.getUserInfo(jwt);
            if(!email.equals(baseCrawlingReq.getEmail())) throw new Exception();

            //세팅 아이디로 세팅 찾기
            Setting setting = settingRepository.findBySettingId(baseCrawlingReq.getSettingId());

            //로그
            List<Log> logList = logRepository.findBySetting_SettingId(baseCrawlingReq.getSettingId());
            List<AllLogsData> allLogsData = new ArrayList<>();
            //세팅 아이디로 키워드, 카운트 횟수 찾기
            List<SettingKeyword> sk = settingKeywordRepository.findBySetting_SettingId(baseCrawlingReq.getSettingId());
            List<String> keywords = new ArrayList<>();
            List<Integer> counts = new ArrayList<>();
            List<String> sentences = new ArrayList<>();

            AllLogsData allLogs = new AllLogsData();
            allLogs.setMatchCounts(counts);
            allLogs.setMatchSentences(sentences);

            for(int i=0;i<logList.size();i++) {
                allLogs.setDate(logList.get(i).getDate());
                //로그아이디로 키워드아이디 찾기
                //키워드아이디로 키워드 찾아서 map에 넣어주기
                for(int j=0;j<sk.size();j++){
                    Keyword kw = sk.get(j).getKeyword();
                    keywords.add(kw.getKeyword());
                    int keyId = keywordRepository.findByKeyword(kw.getKeyword()).getKeywordId();
                    Count cnt = countRepository.findByKeyword_KeywordId(keyId);
                    Sentence sentence = sentenceRepository.findByKeyword_KeywordId(keyId);
                    counts.add(cnt.getCount());
                    sentences.add(sentence.getMatchSentence());
                }
            }


            GetSettingDetailRes resbody = new GetSettingDetailRes();
            resbody.setSettingId(baseCrawlingReq.getSettingId());
            resbody.setUrl(setting.getUrl());
            resbody.setType(setting.getType());
            resbody.setPeriod(setting.getPeriod());
            resbody.setMailAlarm(setting.getAlarm());
            resbody.setSmsAlarm(setting.getSms());
            resbody.setName(setting.getName());
            resbody.setCreatedAt(setting.getCreatedAt());
            resbody.setUpdatedAt(setting.getUpdatedAt());
//            resbody.setLogs();

            return resbody;
        }catch (Exception e){
            System.out.println(e);
            GetSettingDetailRes resbody = new GetSettingDetailRes();
            resbody.setSettingId(-1);
            return resbody;
        }
    };
    @Override
    public boolean editSetting(String jwt, String crawlingId){

        return false;
    };
    @Override
    public boolean deleteSetting(String jwt, BaseCrawlingReq baseCrawlingReq){

        return false;
    };
    @Override
    public GetAllLogsRes getAllLog(String jwt){

        return null;
    };
}
