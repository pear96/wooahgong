package com.bigdata.wooahgong.place.dtos.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePlaceReq {
    private String name;
    private String address;
    private Double lat;
    private Double lng;
}
