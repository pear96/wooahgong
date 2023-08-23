package com.bigdata.wooahgong.mainpage;

import com.bigdata.wooahgong.feed.ImageService;
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
    private final ImageService imageService;


    public List<SearchPlaceDto> getMap(GetMapReq getMapReq) {
        List<Place> places = placeRepository.ifUserAndPlaceIn(getMapReq.getLng(), getMapReq.getLat(), getMapReq.getRadius()*1000);
        List<SearchPlaceDto> results = new ArrayList<>();

        for(Place place : places) {
            results.add(SearchPlaceDto.builder()
                    .placeSeq(place.getPlaceSeq())
                    .name(place.getName())
                    .address(place.getAddress())
                    .lng(place.getLongitude())
                    .lat(place.getLatitude())
                    .ratings(place.getAvgScore())
                    .imageUrl(imageService.getImage(place.getFeeds().get(0).getThumbnail()))
//                    .imageUrl(place.getFeeds().get(0).getThumbnail())
                    .build());
        }
        return results;
    }
}
