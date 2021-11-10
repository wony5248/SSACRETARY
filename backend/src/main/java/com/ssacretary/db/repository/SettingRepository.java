package com.ssacretary.db.repository;

import com.ssacretary.db.entity.Setting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SettingRepository extends JpaRepository<Setting,Integer> {
    Setting findBySettingId(int settingId);

    List<Setting> findByUser_Email(String email);

    long deleteBySettingId(int settingId);


}
