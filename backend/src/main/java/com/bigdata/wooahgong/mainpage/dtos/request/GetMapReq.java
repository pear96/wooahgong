package com.bigdata.wooahgong.mainpage.dtos.request;

import lombok.Builder;
import lombok.Data;

@Data
public class GetMapReq {
    private Integer radius;
    private Double lat;
    private Double lng;

    @Builder
    public GetMapReq(Integer radius, Double lat, Double lng) {
        this.radius = radius;
        this.lat = lat;
        this.lng = lng;
    }
}
