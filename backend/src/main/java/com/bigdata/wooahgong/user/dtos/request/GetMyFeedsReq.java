package com.bigdata.wooahgong.user.dtos.request;

import lombok.Builder;
import lombok.Data;

@Data
public class GetMyFeedsReq {
    private int limit;
    private int lastIdx;

    @Builder
    public GetMyFeedsReq(int limit, int lastIdx) {
        this.limit = limit;
        this.lastIdx = lastIdx;
    }
}
