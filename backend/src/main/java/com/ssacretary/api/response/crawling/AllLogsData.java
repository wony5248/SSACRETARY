package com.ssacretary.api.response.crawling;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class AllLogsData {
    @ApiModelProperty(name = "날짜",example = "localdatetime")
    LocalDateTime date;
    @ApiModelProperty(name = "matchSentences",example = "keyword1 was in the room.")
    List<String> matchSentences;
    @ApiModelProperty(name = "keyword and Count array",example = "[[keyword1,3],...]")
    List<Map<String , Integer>> keywordCount;
    @ApiModelProperty(name = "htmlSuccess",example = "true")
    boolean htmlSuccess;
    @ApiModelProperty(name = "htmlSoource",example = "<html>...</html>")
    String htmlSource;
}
