package com.bigdata.wooahgong.mainpage;

import com.bigdata.wooahgong.mainpage.dtos.request.GetMapReq;
import com.bigdata.wooahgong.place.entity.Place;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MainService {
    public List<Place> getMap(GetMapReq getMapReq) {
        int radius = getMapReq.getRadius();
        Double lat = getMapReq.getLat();
        Double lng = getMapReq.getLng();
        List<Place> answers = new ArrayList<>();

        // 킬로미터(Kilo Meter) 단위
        double distanceKiloMeter =
                distance(lat, lng, 37.6264146, 126.70673858, "kilometer");

        System.out.println(distanceKiloMeter);

        return answers;
    }

    private static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {

        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;

        if (unit == "kilometer") {
            dist = dist * 1.609344;
        } else if(unit == "meter"){
            dist = dist * 1609.344;
        }

        return (dist);
    }


    // This function converts decimal degrees to radians
    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    // This function converts radians to decimal degrees
    private static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }


}
