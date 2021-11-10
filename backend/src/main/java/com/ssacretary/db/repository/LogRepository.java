package com.ssacretary.db.repository;

import com.ssacretary.db.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogRepository extends JpaRepository<Log,Integer> {
    List<Log> findBySetting_SettingId(int settingId);
}
