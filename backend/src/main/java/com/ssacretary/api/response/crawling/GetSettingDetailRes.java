package com.ssacretary.api.response.crawling;

import com.ssacretary.common.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@ApiModel("GetSettingDetailRes")
public class GetSettingDetailRes extends BaseResponseBody {
    @ApiModelProperty(name = "settingId",example = "234")
    int settingId;
    @ApiModelProperty(name = "url",example = "www.ssacretary.com")
    String url;
    @ApiModelProperty(name = "type",example = "or/and")
    String type;
    @ApiModelProperty(name = "period",example = "30000")
    int period;
    @ApiModelProperty(name = "mailAlarm",example = "true")
    boolean mailAlarm;
    @ApiModelProperty(name = "smsAlarm",example = "false")
    boolean smsAlarm;
    @ApiModelProperty(name = "name",example = "크롤링세팅1")
    String name;
    @ApiModelProperty(name = "keywords",example = "['keywords',keywordd']")
    List<String> keywords;
    @ApiModelProperty(name = "createdAt",example = "localdatetime")
    LocalDateTime createdAt;
    @ApiModelProperty(name = "updatedAt",example = "localdatetime")
    LocalDateTime updatedAt;
    List<AllLogsData> logs;

    public static GetSettingDetailRes of(Integer statusCode,String message, int settingId, String url, String type,
                                         int period, boolean mailAlarm, boolean smsAlarm, String name, LocalDateTime createdAt, LocalDateTime updatedAt, List<String> keywords, List<AllLogsData> logs){
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
        body.setCreatedAt(createdAt);
        body.setUpdatedAt(updatedAt);
        body.setKeywords(keywords);
        body.setLogs(logs);
        return body;
    }
}
