package com.ssacretary.api.request.crawling;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.checkerframework.checker.units.qual.A;

import java.util.List;

@Getter
@Setter
@ApiModel("AddSettingReq")
public class AddSettingReq {
    @ApiModelProperty(name = "email",example = "jh@gamil.com")
    String email;
    @ApiModelProperty(name = "type",example = "and / or")
    String type;
    @ApiModelProperty(name = "keywords", example = "[keyword1, keyword2, ..]")
    List<String> keywords;
    @ApiModelProperty(name = "url", example = "www.ssacretary.com")
    String url;
    @ApiModelProperty(name = "period", example = "1")
    int period;
    @ApiModelProperty(name = "mailAlarm", example = "true/false")
    boolean mailAlarm;
    @ApiModelProperty(name = "smsAlarm", example = "true/false")
    boolean smsAlarm;
    @ApiModelProperty(name = "name", example = "크롤링세팅1")
    String name;
}
