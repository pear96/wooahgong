package com.bigdata.wooahgong.mainpage;

import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.mainpage.dtos.request.GetMapReq;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.repository.PlaceRepository;
import com.bigdata.wooahgong.search.dtos.response.SearchPlaceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {
    private final PlaceRepository placeRepository;

    public List<SearchPlaceDto> getMap(GetMapReq getMapReq) {
        int radius = getMapReq.getRadius();
        Double lat = getMapReq.getLat();
        Double lng = getMapReq.getLng();
        List<SearchPlaceDto> answers = new ArrayList<>();

        List<Place> places = placeRepository.findAll();
        for (Place place : places) {
            // 킬로미터(Kilo Meter) 단위
            double distanceKiloMeter =
                    distance(lat, lng, place.getLatitude(), place.getLongitude(), "meter");
            if (distanceKiloMeter < radius) {
                // 모든 피드 평점 계산
                double ratings = 0;
                for (Feed feed : place.getFeeds()) {
                    ratings += feed.getRatings();
                }
                ratings = ratings / place.getFeeds().size();
                ratings = Math.round(ratings * 10) / 10.0;
                // 피드 맨 최근꺼 사진 첫번째꺼 가져오기
                String url = place.getFeeds().get(0).getThumbnail();
                answers.add(SearchPlaceDto.builder()
                        .address(place.getAddress()).placeSeq(place.getPlaceSeq()).ratings(ratings)
                        .name(place.getName()).imageUrl(url).build());
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


}
