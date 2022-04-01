package com.bigdata.wooahgong.user.dtos.request;

import lombok.Builder;
import lombok.Data;

@Data
public class FindPwInsertCodeReq {
    private String userId;
    private String authCode;

    @Builder
    public FindPwInsertCodeReq(String userId, String authCode) {
        this.userId = userId;
        this.authCode = authCode;
    }
}
