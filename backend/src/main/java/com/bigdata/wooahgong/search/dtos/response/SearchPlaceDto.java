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
    public SearchPlaceDto(Long placeSeq, String name, Double lat, Double lng) {
        this.placeSeq = placeSeq;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}
