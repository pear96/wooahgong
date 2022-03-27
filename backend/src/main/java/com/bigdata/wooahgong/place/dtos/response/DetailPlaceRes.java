package com.bigdata.wooahgong.place.dtos.response;


import com.bigdata.wooahgong.place.dtos.request.CustomFeedDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class DetailPlaceRes {
    private final String name;
    private final String address;
    private final Double avgRatings;
    private final String placeImageUrl;
    private final List<CustomFeedDto> feeds;

    @Builder
    public DetailPlaceRes(String name, String address, Double avgRatings, String placeImageUrl, List<CustomFeedDto> feeds) {
        this.name = name;
        this.address = address;
        this.avgRatings = avgRatings;
        this.placeImageUrl = placeImageUrl;
        this.feeds = feeds;
    }
}
