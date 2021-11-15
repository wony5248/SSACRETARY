package com.ssacretary.api.service;

import com.ssacretary.api.request.crawling.AddSettingReq;
import com.ssacretary.api.request.crawling.EditSettingReq;
import com.ssacretary.api.request.crawling.BaseCrawlingReq;
import com.ssacretary.api.response.crawling.*;
import com.ssacretary.config.JwtTokenProvider;
import com.ssacretary.db.entity.*;
import com.ssacretary.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

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
            for(int i=0;i<addSettingReq.getKeywords().size();i++){
                Keyword keyId = keywordRepository.findByKeyword(addSettingReq.getKeywords().get(i));
                //키워드가 존재하지 않으면
                if(keyId==null){
                    //db에 저장
                    keywordRepository.save(Keyword.builder().keyword(addSettingReq.getKeywords().get(i)).build());
                }
            }

            User user = userRepository.findByEmail(email).orElseThrow(()-> new IllegalArgumentException("존재하지 않는 이메일입니다."));
            LocalDateTime dateTime = LocalDateTime.now();
            Setting sets = settingRepository.save(Setting.builder()
                    .user(user).period(addSettingReq.getPeriod()).url(addSettingReq.getUrl()).type(addSettingReq.getType()).alarm(addSettingReq.isMailAlarm()).sms(addSettingReq.isSmsAlarm())
                    .name(addSettingReq.getName()).createdAt(dateTime).updatedAt(dateTime).build());

            //세팅키워드 테이블에 저장
            Setting setting = settingRepository.findBySettingId(sets.getSettingId());
            for(int i=0;i<addSettingReq.getKeywords().size();i++){
                Keyword keyword = keywordRepository.findByKeyword(addSettingReq.getKeywords().get(i));
                settingKeywordRepository.save(SettingKeyword.builder().keyword(keyword).setting(setting).build());
            }

            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    };
    @Override
    public GetAllSettingsRes getAllSettings(String jwt){
        try{
            //jwt로 본인확인후
            String email = jwtTokenProvider.getUserInfo(jwt);

            //해당 유저의 전체 세팅 찾기
            List<Setting> setting = settingRepository.findByUser_Email(email);

            //모든 세팅 목록 불러오기
            List<AllSettingData> allList = new ArrayList<>();
            for (int i =0;i<setting.size();i++){
                AllSettingData allset = new AllSettingData();
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
    public GetSettingDetailRes getSettingDetail(String jwt, int settingId){
        try{
            //jwt로 본인확인후
            String email = jwtTokenProvider.getUserInfo(jwt);

            //세팅 아이디로 세팅 찾기
            Setting setting = settingRepository.findBySettingId(settingId);

            //세팅아이디로 로그 찾기
            List<Log> logList = logRepository.findBySetting_SettingId(settingId);

            List<AllLogsData> allLogsData = new ArrayList<>();

            for(int i=0;i<logList.size();i++) {
                List<Map<String,Integer>> keywordCounts = new ArrayList<Map<String,Integer>>();
                List<String> sentences = new ArrayList<>();
                AllLogsData allLogs = new AllLogsData();
                allLogs.setDate(logList.get(i).getDate());
                allLogs.setHtmlSuccess(logList.get(i).isHtmlSuccess());
                allLogs.setHtmlSource(logList.get(i).getHtmlSource());

                //로그 아이디로 카운트 찾고 해당 카운트의 키워드아이디로 키워드 찾기
                List<Count> count = countRepository.findByLog_LogId(logList.get(i).getLogId());
                for(int j=0;j<count.size();j++){
                    Keyword keyword = keywordRepository.findByKeywordId(count.get(j).getKeyword().getKeywordId());
                    List<Sentence> sentence = sentenceRepository.findByLog_LogIdAndKeyword_KeywordId(logList.get(i).getLogId(),keyword.getKeywordId());
                    Map<String, Integer> map = new HashMap<String, Integer>();

                    map.put(keyword.getKeyword(),count.get(j).getCount());

                    //sentecne는 키워드 쌍 없이 몽땅 저장하기
                    for(int k=0;k<sentence.size();k++){
                        sentences.add(sentence.get(k).getMatchSentence());
                    }
                    keywordCounts.add(map);
                }
                allLogs.setKeywordCount(keywordCounts);
                allLogs.setMatchSentences(sentences);
                allLogsData.add(allLogs);
            }

            GetSettingDetailRes resbody = new GetSettingDetailRes();
            resbody.setSettingId(settingId);
            resbody.setUrl(setting.getUrl());
            resbody.setType(setting.getType());
            resbody.setPeriod(setting.getPeriod());
            resbody.setMailAlarm(setting.getAlarm());
            resbody.setSmsAlarm(setting.getSms());
            resbody.setName(setting.getName());
            resbody.setCreatedAt(setting.getCreatedAt());
            resbody.setUpdatedAt(setting.getUpdatedAt());
            resbody.setLogs(allLogsData);
            return resbody;
        }catch (Exception e){
            System.out.println(e);
            GetSettingDetailRes resbody = new GetSettingDetailRes();
            resbody.setSettingId(-1);
            return resbody;
        }
    };
    @Override
    public boolean editSetting(String jwt, EditSettingReq editSettingReq){
        try{
            //jwt로 본인확인후
            String email = jwtTokenProvider.getUserInfo(jwt);
            if(!email.equals(editSettingReq.getEmail())) throw new Exception();

            Setting setting = settingRepository.findBySettingId(editSettingReq.getSettingId());

            //키워드가 있는지를 검사
            for(int i=0;i<editSettingReq.getKeywords().size();i++){
                Keyword keyId = keywordRepository.findByKeyword(editSettingReq.getKeywords().get(i));
                //키워드가 존재하지 않으면
                if(keyId==null){
                    //db에 저장
                    keywordRepository.save(Keyword.builder().keyword(editSettingReq.getKeywords().get(i)).build());
                }
            }

            //세팅키워드 테이블에 저장
            for(int i=0;i<editSettingReq.getKeywords().size();i++){
                Keyword keyword = keywordRepository.findByKeyword(editSettingReq.getKeywords().get(i));
                settingKeywordRepository.save(SettingKeyword.builder().keyword(keyword).setting(setting).build());
            }

            setting.updateSetting(editSettingReq);
            settingRepository.save(setting);

            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    };
    @Override
    public boolean deleteSetting(String jwt, BaseCrawlingReq baseCrawlingReq){
        try {
            //jwt로 본인확인후
            String email = jwtTokenProvider.getUserInfo(jwt);
            if(!email.equals(baseCrawlingReq.getEmail())) throw new Exception();
            settingRepository.deleteBySettingId(baseCrawlingReq.getSettingId());
            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }
    };
    @Override
    public GetAllLogsRes getAllLog(String jwt){
        try{
            //jwt로 본인확인후
            String email = jwtTokenProvider.getUserInfo(jwt);

            //이메일로 로그 찾기
            List<Log> logList = logRepository.findBySetting_User_Email(email);

            List<AllLogsData> allLogsData = new ArrayList<>();

            for(int i=0;i<logList.size();i++) {
                List<Map<String,Integer>> keywordCounts = new ArrayList<Map<String,Integer>>();
                List<String> sentences = new ArrayList<>();
                AllLogsData allLogs = new AllLogsData();
                allLogs.setDate(logList.get(i).getDate());
                allLogs.setHtmlSuccess(logList.get(i).isHtmlSuccess());
                allLogs.setHtmlSource(logList.get(i).getHtmlSource());

                //로그 아이디로 카운트 찾고 해당 카운트의 키워드아이디로 키워드 찾기
                List<Count> count = countRepository.findByLog_LogId(logList.get(i).getLogId());
                for(int j=0;j<count.size();j++){
                    Keyword keyword = keywordRepository.findByKeywordId(count.get(j).getKeyword().getKeywordId());
                    List<Sentence> sentence = sentenceRepository.findByLog_LogIdAndKeyword_KeywordId(logList.get(i).getLogId(),keyword.getKeywordId());
                    Map<String, Integer> map = new HashMap<String, Integer>();

                    map.put(keyword.getKeyword(),count.get(j).getCount());

                    //sentecne는 키워드 쌍 없이 몽땅 저장하기
                    for(int k=0;k<sentence.size();k++){
                        sentences.add(sentence.get(k).getMatchSentence());
                    }
                    keywordCounts.add(map);
                }
                allLogs.setKeywordCount(keywordCounts);
                allLogs.setMatchSentences(sentences);
                allLogsData.add(allLogs);
            }

            GetAllLogsRes resbody = new GetAllLogsRes();
            resbody.setAllLogsData(allLogsData);
            return resbody;
        }catch (Exception e){
            System.out.println(e);
            GetAllLogsRes resbody = new GetAllLogsRes();
            resbody.setAllLogsData(new ArrayList<>());
            return resbody;
        }
    };
}
