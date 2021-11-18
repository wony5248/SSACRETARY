package com.ssacretary.api.service;

import com.ssacretary.api.request.crawling.AddSettingReq;
import com.ssacretary.api.request.crawling.EditSettingReq;
import com.ssacretary.api.response.crawling.GetAllLogsRes;
import com.ssacretary.api.response.crawling.GetAllSettingsRes;
import com.ssacretary.api.response.crawling.GetSettingDetailRes;
import org.springframework.stereotype.Service;

@Service
public interface CrawlingService {
    public boolean addSetting(String email, AddSettingReq addSettingReq);

    public GetAllSettingsRes getAllSettings(String email);

    public GetSettingDetailRes getSettingDetail(String email, int settingId);

    public boolean editSetting(EditSettingReq editSettingReq);

    public boolean deleteSetting(int settingId);

    public GetAllLogsRes getAllLog(String email);
}
