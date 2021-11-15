package com.ssacretary;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.net.URL;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

@Component
public class ScheduledTasks {
    @Scheduled(fixedRate = 60000)
    public void getStockPriceList() {
        final String useremail = "wony5248@gmail.com";
//        System.out.println("hihi");
        final String password = "hjvqhqcmqjjyhenj";
        StringBuffer contents = new StringBuffer();
//        final String stockList = "https://www.daangn.com/hot_articles";
        final String stockList = "https://finance.naver.com/sise/sise_market_sum.nhn?&page=1";
        final String URL = "https://www.google.com/search";
//        String[] array = stockList.split("/");
//        ArrayList<String> list = new ArrayList();
//        for (int i=0;i<3;i++) {
//            list.add(array[i]);
//        }
//        final String ROBOT = "robots.txt";
//        list.add(ROBOT);
//        String robotURL = String.join("/",list);
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
                            System.out.println(disallow[1]);
                        }
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        boolean usable = true;
        for (int i=0;i<disallows.size();i++) {
            if (URL.contains(disallows.get(i))) {
                System.out.println(disallows.get(i));
                usable = false;
                break;
            };
        }

        Connection conn = Jsoup.connect(stockList);
        List<String> arr = new ArrayList<String>();
        List<String> arr2 = new ArrayList<String>();
        List<String> result = new ArrayList<String>();
//        arr2.add("이터널스 개봉 기념! 영화 예매권 획득 이벤트 결과 발표");
//        arr2.add("이터널스 개봉 기념 이벤트");
//        arr2.add("이터널스 개인 후기 (스포없음)");
//        arr2.add("뇌피셜) 다음 이터널스 업뎃 때 태생 3티 나올 거 같음");

//        System.out.println(str1 == str2);
//        System.out.println(str1.equals(str2));
        try {
            Document document = conn.get();
            String doctext = document.html();
            Pattern pattern = Pattern.compile("인치");


            Matcher matcher = pattern.matcher(doctext);
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
                        else
                        {
                            start = i+1;
                            break;
                        }
                    }
                    int j = matcher.start();
                    while(true){
                        if (doctext.charAt(j) != c1 && doctext.charAt(j) != c3) {
                            j += 1;
                        }
                        else
                        {
                            end = j;
                            break;
                        }
                    }
//                    System.out.println(doctext.substring(start, end));
                    arr.add(doctext.substring(start, end).trim().replaceAll(" ", ""));


                }
                else{
                    break;
                }
            }
//            System.out.println(document.text());

            for(String items : arr){
//                System.out.println(items);
                if(!result.contains(items)){
                    result.add(items);
                }
            }
//            System.out.println(result.size());
//            System.out.println(result);
//            System.out.println(arr2);
//            System.out.println(arr.containsAll(arr2));
//            String subject = stockList + "사이트에 대한 새로운 크롤링 결과";
//            String fromMail = "wony5248@gmail.com";
//            String fromName = "장범진";
//            String toMail = "wony5248@gmail.com";
//            Properties props = new Properties();
//
//            props.put("mail.smtp.host", "smtp.gmail.com"); // use Gmail
//            props.put("mail.smtp.port", "587"); // set port
//            props.put("mail.smtp.auth", "true");
//            props.put("mail.smtp.starttls.enable", "true"); // use TLS
//
//
//            Session mailSession = Session.getInstance(props, new javax.mail.Authenticator(){
//                protected PasswordAuthentication getPasswordAuthentication(){
//                    return new PasswordAuthentication(useremail, password);
//                }
//            });
//
//            try {
//                MimeMessage message = new MimeMessage(mailSession);
//
//                message.setFrom(new InternetAddress(fromMail, MimeUtility.encodeText(fromName, "UTF-8", "B")));
//                message.setRecipients(
//                        Message.RecipientType.TO,
//                        InternetAddress.parse(toMail)
//                );
//                message.setSubject(subject);
//                message.setContent(result.size() + "개의 크롤링 조건에 일치하는 결과" + result.toString(),"text/html;charset=UTF-8");
//                message.setSentDate(new java.util.Date());
//
//                Transport t = mailSession.getTransport("smtp");
//               t.connect(useremail, password);
//               t.sendMessage(message, message.getAllRecipients());
//               t.close();
//                System.out.println("DONE");
//            }catch (Exception e){
//                e.printStackTrace();
//            }
//
//
//

//            System.out.println(tbody);


        } catch (IOException ignored) {
        }
    }
}