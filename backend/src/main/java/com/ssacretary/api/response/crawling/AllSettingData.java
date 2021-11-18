package com.ssacretary.api.response.crawling;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
public class AllSettingData {
    @ApiModelProperty(name = "settingId",example = "234")
    int settingId;
    @ApiModelProperty(name = "name",example = "setting name")
    String name;
    @ApiModelProperty(name = "keywords",example = "[keyword1,keyword2,...]")
    List<String> keywords;
    @ApiModelProperty(name = "url",example = "www.ssacreyary.com")
    String url;
}
