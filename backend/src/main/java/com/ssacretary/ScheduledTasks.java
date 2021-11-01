package com.ssacretary;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {
    @Scheduled(fixedRate = 5000)
    public void getStockPriceList() {

        final String stockList = "https://cafe.naver.com/ArticleList.nhn?search.clubid=27907035&search.boardtype=L&search.totalCount=151&search.cafeId=27907035&search.page=1";
//        final String stockList = "https://finance.naver.com/sise/sise_market_sum.nhn?&page=1";
        Connection conn = Jsoup.connect(stockList);
        List<String> arr = new ArrayList<String>();
        try {
            Document document = conn.get();
            String doctext = document.html();
            Pattern pattern = Pattern.compile("이터널스");


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
                    System.out.println(doctext.substring(start, end));
                    arr.add(doctext.substring(start, end));
                }
                else{
                    break;
                }
            }
//            System.out.println(doctext);
            System.out.println(cnt);
//            System.out.println(tbody);


        } catch (IOException ignored) {
        }
    }


}