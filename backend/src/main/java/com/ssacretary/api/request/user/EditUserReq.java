package com.ssacretary.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("EditUserReq")
public class EditUserReq {
    @ApiModelProperty("phoneNum")
    String phoneNum;
    @ApiModelProperty("nickname")
    String nickname;
}
