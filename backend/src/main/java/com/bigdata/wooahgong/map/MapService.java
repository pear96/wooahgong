package com.bigdata.wooahgong.map;

import ch.qos.logback.classic.Logger;
import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.map.dtos.request.GetMapReq;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.repository.PlaceRepository;
import com.bigdata.wooahgong.search.dtos.response.SearchPlaceDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MapService {
    private final PlaceRepository placeRepository;
    private final Logger logger = (Logger) LoggerFactory.getLogger(this.getClass().getSimpleName());


    public List<SearchPlaceDto> getOldMap(double lng, double lat, int rad) {
        // logger.info("[MapService - getOldMap] 시작");
        List<SearchPlaceDto> answers = new ArrayList<>();
        List<Place> places = placeRepository.findAll();
        // logger.info("범위 내 장소 개수 : " + places.size());
        for (Place place : places) {
            // 킬로미터(Kilo Meter) 단위
            double distanceKiloMeter =
                    distance(lat, lng, place.getLatitude(), place.getLongitude(), "meter");
            if (distanceKiloMeter < rad) {
                answers.add(SearchPlaceDto.builder()
                        .placeSeq(place.getPlaceSeq())
                        .lat(place.getLatitude())
                        .lng(place.getLongitude())
                        .name(place.getName())
                        .build());
            }
        }
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
        } else if (unit == "meter") {
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



    public List<SearchPlaceDto> getMap(double lng, double lat, int rad) {
        // long start = System.currentTimeMillis();
        // logger.info("[MapService - getMap] 시작. 요청 위치 : " + lat + " " + lng);
        if (lng == 0 || lat == 0 || rad == 0) {
            throw new CustomException(ErrorCode.INVALID_DATA);
        }

        List<Place> places = placeRepository.ifUserAndPlaceIn(lng, lat, rad);
        // long sql = System.currentTimeMillis();
        List<SearchPlaceDto> results = new ArrayList<>();
        // logger.info("범위 내 장소 개수 : " + places.size() + "개, SQL 시간 : " + (sql - start) + "ms");
        Pageable topOne = PageRequest.of(0, 1);

        for(Place place : places) {
            results.add(SearchPlaceDto.builder()
                .placeSeq(place.getPlaceSeq())
                .name(place.getName())
                .lng(place.getLongitude())
                .lat(place.getLatitude())
                .build());
        }
        // long end = System.currentTimeMillis();
        // logger.info("걸린 시간 : " + (end-start) + "ms");
        return results;
    }

    public List<SearchPlaceDto> getIndexMap(double lng, double lat, int rad) {
        // long start = System.currentTimeMillis();
        // logger.info("[MapService - getIndexMap] 시작. 요청 위치 : " + lat + " " + lng);
        if (lng == 0 || lat == 0 || rad == 0) {
            throw new CustomException(ErrorCode.INVALID_DATA);
        }
        final double EARTH_RADIUS = 111_000;
        double latDiff = rad / EARTH_RADIUS;
        double lngDiff = rad / (EARTH_RADIUS * Math.cos(Math.toRadians(lat)));

        List<Place> places = placeRepository.findPlaceinMBR(lat-latDiff, lng-lngDiff, lat+latDiff, lng+lngDiff);
        // long sql = System.currentTimeMillis();
        List<SearchPlaceDto> results = new ArrayList<>();
        // logger.info("범위 내 장소 개수 : " + places.size() + "개, SQL 시간 : " + (sql - start) + "ms");
        Pageable topOne = PageRequest.of(0, 1);

        for(Place place : places) {
            results.add(SearchPlaceDto.builder()
                .placeSeq(place.getPlaceSeq())
                .name(place.getName())
                .lng(place.getLongitude())
                .lat(place.getLatitude())
                .build());
        }
        // long end = System.currentTimeMillis();
        // logger.info("걸린 시간 : " + (end-start) + "ms");
        return results;
    }
}
