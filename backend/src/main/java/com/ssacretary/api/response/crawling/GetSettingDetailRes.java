package com.ssacretary.api.response.crawling;

import com.ssacretary.common.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Setter;

import java.util.List;

@Setter
@ApiModel("GetSettingDetailRes")
public class GetSettingDetailRes extends BaseResponseBody {
    String userEmail;
    String type;
    List<String> keywords;
    String url;
    int period;
    boolean mailAlarm;
    boolean smsAlarm;
    String name;

    public static GetSettingDetailRes of(Integer statusCode,String message, String userEmail, String type, List<String> keywords,
                                         String url, int period, boolean mailAlarm, boolean smsAlarm, String name){
        GetSettingDetailRes body = new GetSettingDetailRes();
        body.setStatusCode(statusCode);
        body.setMessage(message);
        body.setUserEmail(userEmail);
        body.setType(type);
        body.setKeywords(keywords);
        body.setUrl(url);
        body.setPeriod(period);
        body.setMailAlarm(mailAlarm);
        body.setSmsAlarm(smsAlarm);
        body.setName(name);
        return body;
    }
}
