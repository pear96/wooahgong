package com.bigdata.wooahgong.user.dtos.response;

import lombok.Builder;
import lombok.Data;

@Data
public class GetMyFeedsRes {
    private Long feedSeq;
    private String imageUrl;

    @Builder
    public GetMyFeedsRes(Long feedSeq, String imageUrl) {
        this.feedSeq = feedSeq;
        this.imageUrl = imageUrl;
    }
}
