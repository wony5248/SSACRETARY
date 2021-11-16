package com.ssacretary.db.repository;

import com.ssacretary.db.entity.SettingKeyword;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface SettingKeywordRepository extends JpaRepository<SettingKeyword,Integer> {
    List<SettingKeyword> findBySetting_SettingId(int settingId);

    long deleteBySkId(int skId);
}
