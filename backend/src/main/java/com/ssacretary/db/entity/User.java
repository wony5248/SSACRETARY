package com.ssacretary.db.entity;

import com.ssacretary.api.request.user.EditUserReq;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "user")
    private List<Setting> settingList = new ArrayList<>();

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "phone")
    private String phone;

    @Column(name = "password")
    private String password;

    public void updateUserProfile(EditUserReq editUserReq){
        this.nickname=editUserReq.getNickname();
        this.phone=editUserReq.getPhoneNum();
    }

}
