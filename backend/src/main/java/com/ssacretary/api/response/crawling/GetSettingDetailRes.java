package com.ssacretary.api.response.crawling;

import com.ssacretary.common.response.BaseResponseBody;
import lombok.Setter;

import java.util.List;

@Setter
public class GetSettingDetailRes extends BaseResponseBody {
    List<AllSettingData> allSettingData;

    public static GetSettingDetailRes of(Integer statusCode,String message, List<AllSettingData> allSettingData){
        GetSettingDetailRes body = new GetSettingDetailRes();
        body.setStatusCode(statusCode);
        body.setMessage(message);
        body.setAllSettingData(allSettingData);
        return body;
    }
}
