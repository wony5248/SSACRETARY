package com.ssacretary.api.request.crawling;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GetAllSettingReq")
public class GetAllSettingReq {
    @ApiModelProperty(name = "email",example = "jh@gamil.com")
    String email;
}
