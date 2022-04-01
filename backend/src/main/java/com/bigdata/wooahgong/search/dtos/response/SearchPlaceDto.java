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
    private Double lat;
    private Double lng;

    @Builder
    public SearchPlaceDto(Long placeSeq, String address, String name, String imageUrl, Double ratings, Double lat, Double lng) {
        this.placeSeq = placeSeq;
        this.address = address;
        this.name = name;
        this.imageUrl = imageUrl;
        this.ratings = ratings;
        this.lat = lat;
        this.lng = lng;
    }
}
