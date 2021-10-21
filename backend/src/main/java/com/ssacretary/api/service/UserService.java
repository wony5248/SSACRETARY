package com.ssacretary.api.service;

import com.ssacretary.api.request.UserPostReq;
import com.ssacretary.db.entity.User;
import com.ssacretary.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public void createUser(UserPostReq userPostReq) {

        if (userPostReq.getPassword().equals(userPostReq.getPasswordCheck())) {
            userRepository.save(User.builder()
                    .email(userPostReq.getEmail())
                    .nickname(userPostReq.getNickname())
                    .phone(userPostReq.getPhone())
                    .password(passwordEncoder.encode(userPostReq.getPassword()))
                    .build());
        }

    }

}
