package com.ssacretary.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SignupReq")
public class SignupReq {

    @ApiModelProperty(name="유저 이메일")
    String email;

    @ApiModelProperty(name="유저 닉네임")
    String nickname;

    @ApiModelProperty(name="유저 비밀번호")
    String password;

    @ApiModelProperty(name="유저 비밀번호 체크")
    String passwordCheck;

    @ApiModelProperty(name="유저 핸드폰 번호")
    String phoneNum;

}
