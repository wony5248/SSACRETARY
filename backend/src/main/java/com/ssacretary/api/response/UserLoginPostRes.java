package com.ssacretary.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@Builder
@ApiModel("UserLoginPostRes")
public class UserLoginPostRes {

    @ApiModelProperty(name = "토큰")
    String token;

    @ApiModelProperty(name = "statusCode")
    int statusCode;

    @ApiModelProperty(name = "message")
    String message;

}
