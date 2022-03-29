package com.bigdata.wooahgong.place.dtos.response;

import com.bigdata.wooahgong.place.dtos.request.CustomFeedDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class PlaceFeedsRes {
    private final List<CustomFeedDto> feeds;

    @Builder
    public PlaceFeedsRes(List<CustomFeedDto> feeds) {
        this.feeds = feeds;
    }
}
