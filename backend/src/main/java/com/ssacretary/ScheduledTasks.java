package com.ssacretary;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.ssacretary.db.entity.*;
import com.ssacretary.db.repository.*;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import javax.transaction.Transactional;


@Component
@Transactional
public class ScheduledTasks {
    @Autowired
    SettingRepository settingRepository;
    @Autowired
    SettingKeywordRepository settingKeywordRepository;
    @Autowired
    LogRepository logRepository;
    @Autowired
    SentenceRepository sentenceRepository;
    @Autowired
    CountRepository countRepository;

    public boolean cantCrawlRobotTxt(String targetUrl) {
        /* robot.txt와 targetUrl을 대조하여 robot.txt에 있다면 크롤링 차단 */
        String[] array = targetUrl.split("/");
        ArrayList<String> list = new ArrayList();
        for (String a : array) {
            list.add(a);
        }
        final String ROBOT = "robots.txt";
        list.add(ROBOT);
        String robotURL = String.join("/",list);
        ArrayList<String> disallows = new ArrayList();

        try(BufferedReader in = new BufferedReader(
                new InputStreamReader(new URL("https://google.com/robots.txt").openStream()))) {
            String line = null;
            boolean target = false;
            while((line = in.readLine()) != null) {
                if (!target) {
                    if (line.equals("User-agent: *")) {
                        target = true;
                    }
                } else {
                    if (line == " " || line.startsWith("User-agent:")) {
                        target = false;
                        break;
                    } else {
                        if (line.startsWith("Disallow:")) {
                            String[] disallow = line.split(" ");
                            disallows.add(disallow[1]);
//                            System.out.println(disallow[1]);
                        }
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        boolean usable = true;
        for (int i=0;i<disallows.size();i++) {
            if (targetUrl.contains(disallows.get(i))) {
//                System.out.println(disallows.get(i));
                usable = false;
                break;
            };
        }
        return usable;
    }

    public void mailService(String settingName, String targetUrl,List<String> result){
        /* 메일 보내줌 */
        String useremail = "wony5248@gmail.com";
        String password = "hjvqhqcmqjjyhenj";
        String subject = targetUrl + " 사이트에 대한 ["+settingName+"]세팅 크롤링 결과";
        String fromMail = "wony5248@gmail.com";
        String fromName = "Ssacretary";
        String toMail = "jihyun9623@gmail.com";
        Properties props = new Properties();

        props.put("mail.smtp.host", "smtp.gmail.com"); // use Gmail
        props.put("mail.smtp.port", "587"); // set port
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true"); // use TLS

        Session mailSession = Session.getInstance(props, new javax.mail.Authenticator(){
            protected PasswordAuthentication getPasswordAuthentication(){
                return new PasswordAuthentication(useremail, password);
            }
        });

        try {
            MimeMessage message = new MimeMessage(mailSession);

            message.setFrom(new InternetAddress(fromMail, MimeUtility.encodeText(fromName, "UTF-8", "B")));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(toMail)
            );

            message.setSubject(subject);
            if(result==null){
                message.setContent("해당 url은 robot.txt의 크롤링 금지 url에 해당되어 세팅을 삭제 처리 하였습니다.","text/html;charset=UTF-8");
            }else{
                String content = "<strong>"+settingName+"</strong><br/><strong>["+result.size() + "개의 키워드에 일치하는 결과]</strong><br/>";
                for(String r : result) {
                    content += r + "<br/>";
                }
                message.setContent(content,"text/html;charset=UTF-8");
            }
            message.setSentDate(new java.util.Date());

            Transport t = mailSession.getTransport("smtp");
            t.connect(useremail, password);
            t.sendMessage(message, message.getAllRecipients());
            t.close();
            System.out.println("DONE");
        }catch (Exception e){
            e.printStackTrace();
        }


    }

    @Scheduled(cron = "0 0 0/1 * * *")
//    @Scheduled(fixedRate = 60000)
    public void makeCrawling() {
        //주기 가져오기
        LocalTime now = LocalTime.now();
        List<Setting> settings = new ArrayList<>();
        List<Setting> setting = settingRepository.findAll();
        for(Setting s : setting){
            //targeturl이 크롤링 가능하고 현재시각을 period로 나눈 나머지가 0일때만 저장
//            if(now.getHour()%setting.get(i).getPeriod()==0 && cantCrawlRobotTxt(setting.get(i).getUrl())) {
            if(s.getPeriod()==25 && cantCrawlRobotTxt(s.getUrl())) {//테스팅용
                settings.add(s);
            }else if(!cantCrawlRobotTxt(s.getUrl())){
                //실패 사유를 메일로 보내주고 세팅 삭제
                System.out.println("크롤링하지마");
                String targetUrl = s.getUrl();
                List<String> result = null;
                mailService(targetUrl,targetUrl,null);
                settingRepository.deleteBySettingId(s.getSettingId());
            }
        }

        /* 크롤링 시작 */
        try {
            for(Setting s : settings){
                String targetUrl = s.getUrl();
                List<String> allSentences = new ArrayList<>();
                Connection conn = Jsoup.connect(targetUrl);
                Document document = conn.get();
                String doctext = document.html();

                //로그 저장 - html성공
                LocalDateTime dateTime = LocalDateTime.now();
//                Log log = logRepository.save(Log.builder().user(s.getUser()).setting(s).date(dateTime).htmlSuccess(true).htmlSource(doctext).build());

                List<SettingKeyword> sk = settingKeywordRepository.findBySetting_SettingId(s.getSettingId());
                List<String> kw = new ArrayList<>();

                for(int b=0;b<sk.size();b++){
                    String keyword = sk.get(b).getKeyword().getKeyword();
                    System.out.println("키워드 : "+keyword);

                    Pattern pattern = Pattern.compile(keyword);
                    Matcher matcher = pattern.matcher(doctext);
//                    System.out.println(document.text());

                    int cnt = 0;
                    while (true){
                        boolean matfind = matcher.find();
                        if (matfind){
                            int i = matcher.start();
                            int start = 0;
                            int end = 0;
                            cnt += 1;
                            String regx1 = "\"";
                            String regx2 = ">";
                            String regx3 = "<";
                            char c1 = regx1.charAt(0);
                            char c2 = regx2.charAt(0);
                            char c3 = regx3.charAt(0);
                            while(true){
                                if (doctext.charAt(i) != c1 && doctext.charAt(i) != c2) {
                                    i -= 1;
                                }
                                else{
                                    start = i+1;
                                    break;
                                }
                            }
                            int j = matcher.start();
                            while(true){
                                if (doctext.charAt(j) != c1 && doctext.charAt(j) != c3) {
                                    j += 1;
                                }
                                else{
                                    end = j;
                                    break;
                                }
                            }
//                    System.out.println(doctext.substring(start, end));
                            String oneSentence = doctext.substring(start, end).trim().replaceAll(" ", "");
//                            System.out.println("찾은거? "+oneSentence);
                            if(!allSentences.contains(oneSentence)) {
                                allSentences.add(oneSentence);
//                                sentenceRepository.save(Sentence.builder().log(log).keyword(sk.get(b).getKeyword()).matchSentence(oneSentence).build());
                            }
                        }
                        else{
                            break;
                        }
                    }
                    System.out.println(cnt);
//                    countRepository.save(Count.builder().log(log).keyword(sk.get(b).getKeyword()).count(cnt).build());
                }
                System.out.println(allSentences);
//                if(allSentences.size()>0)
//                    mailService(s.getName(),targetUrl,allSentences);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}