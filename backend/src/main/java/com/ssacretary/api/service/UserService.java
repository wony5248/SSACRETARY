package com.ssacretary.api.service;

import com.ssacretary.api.request.user.EditUserReq;
import com.ssacretary.api.request.user.LoginReq;
import com.ssacretary.api.request.user.SignupReq;
import com.ssacretary.api.response.user.UserLoginPostRes;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public boolean isValidToken(String token);

    public void createUser(SignupReq signupReq);

    public UserLoginPostRes login(LoginReq loginReq);

//    public BaseResponseBody signOut(String JWT);

    public boolean editUser(String jwt, EditUserReq editUserReq);

    public UserLoginPostRes getProfile(String token);
}
