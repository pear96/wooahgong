package com.bigdata.wooahgong.feed.dtos.request;

import lombok.Data;

import java.util.List;

@Data
public class CreateFeedReq {
    private Long placeSeq;
    private String content;
    private Double ratings;
    private List<String> moods;
}
