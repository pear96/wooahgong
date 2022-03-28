package com.bigdata.wooahgong.user.dtos.response;

import lombok.Builder;
import lombok.Data;

@Data
public class GetMyPlacesRes {
    private Long placeSeq;
    private String thumbnail;

    @Builder
    public GetMyPlacesRes(Long placeSeq, String thumbnail) {
        this.placeSeq = placeSeq;
        this.thumbnail = thumbnail;
    }
}
