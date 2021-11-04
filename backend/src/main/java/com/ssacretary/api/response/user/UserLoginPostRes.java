package com.ssacretary.api.response.user;

import com.ssacretary.api.response.crawling.AllSettingData;
import com.ssacretary.api.response.crawling.GetAllSettingsRes;
import com.ssacretary.common.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 유저 로그인 API 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
//@Builder
@ApiModel("UserLoginPostRes")
public class UserLoginPostRes extends BaseResponseBody {
    @ApiModelProperty(name = "토큰")
    String jwt;
    @ApiModelProperty(name = "이메일")
    String email;
    @ApiModelProperty(name = "핸드폰번호")
    String phoneNum;
    @ApiModelProperty(name = "닉네임")
    String nickname;

    public static UserLoginPostRes of(Integer statusCode, String message, String jwt, String email, String phoneNum, String nickname){
        UserLoginPostRes body = new UserLoginPostRes();
        body.setStatusCode(statusCode);
        body.setMessage(message);
        body.setJwt(jwt);
        body.setEmail(email);
        body.setPhoneNum(phoneNum);
        body.setNickname(nickname);
        return body;
    }
}
