package com.ssacretary.api.response.crawling;

import com.ssacretary.common.response.BaseResponseBody;
import com.ssacretary.db.entity.Log;
import io.swagger.annotations.ApiModel;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@ApiModel("GetSettingDetailRes")
public class GetSettingDetailRes extends BaseResponseBody {
    long settingId;
    String url;
    String type;
    int period;
    boolean mailAlarm;
    boolean smsAlarm;
    String name;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    List<AllLogsData> logs;

    public static GetSettingDetailRes of(Integer statusCode,String message, int settingId, String url, String type,
                                         int period, boolean mailAlarm, boolean smsAlarm, String name, LocalDateTime createdAt, LocalDateTime updatedAt, List<AllLogsData> logs){
        GetSettingDetailRes body = new GetSettingDetailRes();
        body.setStatusCode(statusCode);
        body.setMessage(message);
        body.setSettingId(settingId);
        body.setUrl(url);
        body.setType(type);
        body.setPeriod(period);
        body.setMailAlarm(mailAlarm);
        body.setSmsAlarm(smsAlarm);
        body.setName(name);
        body.setLogs(logs);
        return body;
    }
}
