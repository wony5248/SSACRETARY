package com.ssacretary.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DeleteUserReq")
public class DeleteUserReq {
    @ApiModelProperty("email")
    String email;
}
