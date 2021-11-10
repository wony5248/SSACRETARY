package com.ssacretary.api.response.crawling;

import io.swagger.models.auth.In;
import lombok.Data;
import org.w3c.dom.Text;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class AllLogsData {
    LocalDateTime date;
    List<String> matchSentences;
    List<Map<String , Integer>> keywordCount;
    boolean htmlSuccess;
    String htmlSource;
}
