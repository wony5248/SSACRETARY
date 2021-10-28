package com.ssacretary.api.service;

import com.ssacretary.api.request.AddSettingReq;
import com.ssacretary.api.response.crawling.GetAllLogsRes;
import com.ssacretary.api.response.crawling.GetAllSettingsRes;
import com.ssacretary.api.response.crawling.GetSettingDetailRes;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CrawlingService {
    public boolean addSetting(AddSettingReq addSettingReq);

    public GetAllSettingsRes getAllSettings();

    public GetSettingDetailRes getSettingDetail(String crawlingId);

    public boolean editSetting(String crawlingId);

    public boolean deleteSetting(String crawlingId);

    public GetAllLogsRes getAllLog();
}
