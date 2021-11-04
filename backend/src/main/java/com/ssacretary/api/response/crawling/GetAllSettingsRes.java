package com.ssacretary.api.response.crawling;

import com.ssacretary.common.response.BaseResponseBody;
import lombok.Setter;

import java.util.List;

@Setter
public class GetAllSettingsRes extends BaseResponseBody {
    List<AllSettingData> allSettingData;

    public static GetAllSettingsRes of(Integer statusCode,String message, List<AllSettingData> allSettingData){
        GetAllSettingsRes body = new GetAllSettingsRes();
        body.setStatusCode(statusCode);
        body.setMessage(message);
        body.setAllSettingData(allSettingData);
        return body;
    }
}
