package com.bigdata.wooahgong.mainpage;

import ch.qos.logback.classic.Logger;
import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.feed.ImageService;
import com.bigdata.wooahgong.mainpage.dtos.request.GetMapReq;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.repository.PlaceRepository;
import com.bigdata.wooahgong.search.dtos.response.SearchPlaceDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {
    private final PlaceRepository placeRepository;
    private final ImageService imageService;

    private final Logger logger = (Logger) LoggerFactory.getLogger(this.getClass().getSimpleName());


    public List<SearchPlaceDto> getMap(GetMapReq getMapReq) {

        if (getMapReq.getLat() == null || getMapReq.getLng() == null || getMapReq.getRadius() == null) {
            throw new CustomException(ErrorCode.INVALID_DATA);
        }

        List<Place> places = placeRepository.ifUserAndPlaceIn(getMapReq.getLng(), getMapReq.getLat(), getMapReq.getRadius());
        List<SearchPlaceDto> results = new ArrayList<>();
        logger.info("범위 내 장소 개수 : " + places.size());
        Pageable topOne = PageRequest.of(0, 1);

        for(Place place : places) {
            results.add(SearchPlaceDto.builder()
                    .placeSeq(place.getPlaceSeq())
                    .name(place.getName())
                    .address(place.getAddress())
                    .lng(place.getLongitude())
                    .lat(place.getLatitude())
                    .ratings(place.getAvgScore())
                    .imageUrl(placeRepository.findThumbnailByPlaceSeq(place.getPlaceSeq(), topOne).get(0))
                    .build());
        }
        return results;
    }
}
