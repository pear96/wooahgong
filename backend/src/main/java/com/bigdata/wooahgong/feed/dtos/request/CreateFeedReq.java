package com.bigdata.wooahgong.feed.dtos.request;

import com.bigdata.wooahgong.mood.entity.Mood;
import lombok.Data;

import java.util.List;

@Data
public class CreateFeedReq {
    private Long placeSeq;
    private String content;
    private Double ratings;
    private List<Mood> moods;
}
