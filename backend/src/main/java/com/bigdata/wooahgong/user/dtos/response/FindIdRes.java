package com.bigdata.wooahgong.user.dtos.response;

import lombok.Builder;
import lombok.Data;

@Data
public class FindIdRes {
    private String userId;
    private boolean provider;

    @Builder
    public FindIdRes(String userId, boolean provider) {
        this.userId = userId;
        this.provider = provider;
    }
}
