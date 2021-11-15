package com.ssacretary.api.service;

import com.ssacretary.api.request.crawling.AddSettingReq;
import com.ssacretary.api.request.crawling.EditSettingReq;
import com.ssacretary.api.request.crawling.BaseCrawlingReq;
import com.ssacretary.api.response.crawling.GetAllLogsRes;
import com.ssacretary.api.response.crawling.GetAllSettingsRes;
import com.ssacretary.api.response.crawling.GetSettingDetailRes;
import org.springframework.stereotype.Service;

@Service
public interface CrawlingService {
    public boolean addSetting(String jwt, AddSettingReq addSettingReq);

    public GetAllSettingsRes getAllSettings(String jwt);

    public GetSettingDetailRes getSettingDetail(String jwt, int settingId);

    public boolean editSetting(String jwt, EditSettingReq editSettingReq);

    public boolean deleteSetting(String jwt, BaseCrawlingReq baseCrawlingReq);

    public GetAllLogsRes getAllLog(String jwt);
}
