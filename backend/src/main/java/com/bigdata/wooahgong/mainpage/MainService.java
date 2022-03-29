package com.bigdata.wooahgong.mainpage;

import com.bigdata.wooahgong.mainpage.dtos.request.GetMapReq;
import com.bigdata.wooahgong.place.entity.Place;

import java.util.ArrayList;
import java.util.List;

public class MainService {
    public List<Place> getMap(GetMapReq getMapReq) {
        int radius = getMapReq.getRadius();
        Double lat = getMapReq.getLat();
        Double lng = getMapReq.getLng();
        List<Place> places = new ArrayList<>();
        return null;
    }
}
