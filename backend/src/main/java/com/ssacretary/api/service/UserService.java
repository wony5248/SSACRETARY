package com.ssacretary.api.service;

import com.ssacretary.api.request.user.DeleteUserReq;
import com.ssacretary.api.request.user.EditUserReq;
import com.ssacretary.api.request.user.LoginReq;
import com.ssacretary.api.request.user.SignupReq;
import com.ssacretary.api.response.user.UserLoginPostRes;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public boolean createUser(SignupReq signupReq);

    public UserLoginPostRes login(LoginReq loginReq);

//    public BaseResponseBody signOut(String JWT);

    public UserLoginPostRes editUser(String jwt, EditUserReq editUserReq);

    public boolean deleteUser(String jwt, DeleteUserReq deleteUserReq);

//    public UserLoginPostRes getProfile(String token);
}
