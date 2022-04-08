package com.bigdata.wooahgong.place.dtos.request;


import lombok.Builder;
import lombok.Getter;

@Getter
public class CustomFeedDto {
    private final Long feedSeq;
    private final String thumbnail;

    @Builder
    public CustomFeedDto(Long feedSeq, String thumbnail){
        this.feedSeq = feedSeq;
        this.thumbnail = thumbnail;
    }
}
