package com.ssacretary.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Setting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "setting_id")
    private int settingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private User user;

    @OneToMany(mappedBy = "setting")
    private List<SettingKeyword> settingKeywordList = new ArrayList<>();

    @OneToMany(mappedBy = "setting")
    private List<Log> logList = new ArrayList<>();

    @Column(name = "url")
    private String url;

    @Column(name = "type")
    private String type;

    @Column(name = "alarm")
    private Boolean alarm;

    @Column(name = "sms")
    private Boolean sms;

    @Column(name = "name")
    private String name;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime  updatedAt;

}
