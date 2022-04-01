package com.bigdata.wooahgong.search.dtos.response;

import lombok.Builder;
import lombok.Data;

@Data
public class SearchPlaceDto {
    private Long placeSeq;
    private String address;
    private String name;
    private String imageUrl;
    private Double ratings;

    @Builder
    public SearchPlaceDto(Long placeSeq, String address, String name, String imageUrl, Double ratings) {
        this.placeSeq = placeSeq;
        this.address = address;
        this.name = name;
        this.imageUrl = imageUrl;
        this.ratings = ratings;
    }
}
