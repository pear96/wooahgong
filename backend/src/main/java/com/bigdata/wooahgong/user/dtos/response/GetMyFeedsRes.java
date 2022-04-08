package com.bigdata.wooahgong.user.dtos.response;

import lombok.Builder;
import lombok.Data;

@Data
public class GetMyFeedsRes {
    private Long feedSeq;
    private String imageUrl;
    private Long placeSeq;

    @Builder
    public GetMyFeedsRes(Long feedSeq, String imageUrl, Long placeSeq) {
        this.feedSeq = feedSeq;
        this.imageUrl = imageUrl;
        this.placeSeq = placeSeq;
    }
}
