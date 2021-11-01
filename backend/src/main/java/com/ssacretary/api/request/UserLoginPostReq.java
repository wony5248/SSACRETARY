package com.ssacretary.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserLoginPostReq")
public class UserLoginPostReq {

    @ApiModelProperty(name = "유저 이메일")
    String email;

    @ApiModelProperty(name = "유저 비밀번호")
    String password;

}
