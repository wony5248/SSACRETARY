package com.ssacretary.api.response.crawling;

import lombok.Data;

import java.util.List;

@Data
public class AllSettingData {
    String crawlingId;
    List<String> keywords;
    String url;
}
