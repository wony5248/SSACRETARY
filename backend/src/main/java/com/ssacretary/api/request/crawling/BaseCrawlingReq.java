package com.ssacretary.api.request.crawling;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GetSettingDetailReq")
public class BaseCrawlingReq {
    @ApiModelProperty(name = "settingId", example = "123")
    int settingId;
    @ApiModelProperty(name = "이메일", example = "jh@gmail.com")
    String email;
}
