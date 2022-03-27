package com.bigdata.wooahgong.search.dtos.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchPlaceDto {
    private final Long placeSeq;
    private final String address;
    private final String name;
    private final String imageUrl;

    @Builder
    public SearchPlaceDto(Long placeSeq, String address, String name, String imageUrl) {
        this.placeSeq = placeSeq;
        this.address = address;
        this.name = name;
        this.imageUrl = imageUrl;
    }
}
