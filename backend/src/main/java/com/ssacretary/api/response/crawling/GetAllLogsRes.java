package com.ssacretary.api.response.crawling;

import com.ssacretary.common.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class GetAllLogsRes extends BaseResponseBody {
    List<AllLogsData> allLogsData;

    public static GetAllLogsRes of(Integer statusCode,String message, List<AllLogsData> allLogsData){
        GetAllLogsRes body = new GetAllLogsRes();
        body.setStatusCode(statusCode);
        body.setMessage(message);
        body.setAllLogsData(allLogsData);
        return body;
    }
}
