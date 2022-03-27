package com.bigdata.wooahgong.place.dtos.request;


import lombok.Builder;
import lombok.Data;

@Data
public class CustomFeedDto {
    private Long feedSeq;
    private String thumbnail;

    @Builder
    public CustomFeedDto(Long feedSeq, String thumbnail){
        this.feedSeq = feedSeq;
        this.thumbnail = thumbnail;
    }
}
