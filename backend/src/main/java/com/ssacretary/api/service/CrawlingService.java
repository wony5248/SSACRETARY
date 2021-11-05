package com.ssacretary.api.service;

import com.ssacretary.api.request.crawling.AddSettingReq;
import com.ssacretary.api.response.crawling.GetAllLogsRes;
import com.ssacretary.api.response.crawling.GetAllSettingsRes;
import com.ssacretary.api.response.crawling.GetSettingDetailRes;
import org.springframework.stereotype.Service;

@Service
public interface CrawlingService {
    public boolean addSetting(String jwt, AddSettingReq addSettingReq);

    public GetAllSettingsRes getAllSettings(String jwt);

    public GetSettingDetailRes getSettingDetail(String jwt, String crawlingId);

    public boolean editSetting(String jwt, String crawlingId);

    public boolean deleteSetting(String jwt, String crawlingId);

    public GetAllLogsRes getAllLog(String jwt);
}
