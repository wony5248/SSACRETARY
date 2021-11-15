package com.ssacretary.db.entity;

import com.ssacretary.api.request.crawling.EditSettingReq;
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

    @OneToMany(mappedBy = "setting", cascade = CascadeType.ALL)
    private List<SettingKeyword> settingKeywordList = new ArrayList<>();

    @OneToMany(mappedBy = "setting", cascade = CascadeType.ALL)
    private List<Log> logList = new ArrayList<>();

    @Column(name = "url")
    private String url;

    @Column(name = "type")
    private String type;

    @Column(name = "period")
    private int period;

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

    public void updateSetting(EditSettingReq editSettingReq){
        this.url=editSettingReq.getUrl();
        this.type=editSettingReq.getType();
        this.period= editSettingReq.getPeriod();
        this.alarm=editSettingReq.isMailAlarm();
        this.sms = editSettingReq.isSmsAlarm();
        this.name= editSettingReq.getName();
        LocalDateTime dateTime = LocalDateTime.now();
        this.updatedAt=dateTime;
    }

}
