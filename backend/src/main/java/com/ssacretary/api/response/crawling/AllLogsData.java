package com.ssacretary.api.response.crawling;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AllLogsData {
    String crawlingId;
    LocalDateTime date;
    List<String> keywords;
    List<Integer> matchCounts;
    List<String> matchSentences;
}
