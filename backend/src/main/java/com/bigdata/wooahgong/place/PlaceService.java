package com.bigdata.wooahgong.place;


import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.feed.entity.FeedLikesComparator;
import com.bigdata.wooahgong.feed.repository.FeedRepository;
import com.bigdata.wooahgong.place.dtos.request.CreatePlaceReq;
import com.bigdata.wooahgong.place.dtos.request.CustomFeedDto;
import com.bigdata.wooahgong.place.dtos.response.DetailPlaceRes;
import com.bigdata.wooahgong.place.dtos.response.PlaceFeedsRes;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.entity.PlaceWish;
import com.bigdata.wooahgong.place.repository.PlaceRepository;
import com.bigdata.wooahgong.place.repository.PlaceWishRepository;
import com.bigdata.wooahgong.user.UserService;
import com.bigdata.wooahgong.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final UserService userService;
    private final PlaceRepository placeRepository;
    private final PlaceWishRepository placeWishRepository;
    private final FeedRepository feedRepository;

    public ResponseEntity<HashMap<String, Long>> createPlace(String token, CreatePlaceReq createPlaceReq) {
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);

        // 요청이 정상인지 검사한다.
        String name = createPlaceReq.getName();
        String address = createPlaceReq.getAddress();
        Double lat = createPlaceReq.getLat();
        Double lng = createPlaceReq.getLng();

        if ("".equals(name) || "".equals(address) || lat == 0.0 || lng == 0.0) {
            throw new CustomException(ErrorCode.WRONG_DATA);
        }

        // 주소 중복 검사
        if (placeRepository.findByAddress(address).size() > 0) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

        // 장소를 생성한다.
        Place newPlace = Place.builder()
                .user(user)
                .name(name)
                .address(address)
                .latitude(lat)
                .longitude(lng)
                .build();

        placeRepository.save(newPlace);
        HashMap<String, Long> createPlaceRes = new HashMap<>();
        createPlaceRes.put("placeSeq", newPlace.getPlaceSeq());
        // 성공 응답을 보낸다.
        return ResponseEntity.status(201).body(createPlaceRes);
    }

    public ResponseEntity<DetailPlaceRes> getPlace(String token, Long placeSeq) {
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);

        // 해당하는 장소가 있는지 검사한다.
        Optional<Place> findPlace = placeRepository.findByPlaceSeq(placeSeq);
        if(findPlace.isEmpty()) {
            throw new CustomException(ErrorCode.PLACE_NOT_FOUND);
        }
        Place place = findPlace.get();

        // 찜한 장소인지 확인한다.
        Boolean isWished = false;
        Optional<PlaceWish> wished = placeWishRepository.findByUserAndPlace(user, place);
        if (wished.isPresent()) {
            isWished = true;
        }

        // 장소를 찾고 해당 피드들을 불러온다.
        List<Feed> foundFeeds = feedRepository.findByPlace(place);
        if (foundFeeds.isEmpty()) {
            throw new CustomException(ErrorCode.FEED_NOT_FOUND);
        }

        // feed 객체의 모든 내용이 아닌, seq와 이미지만 담아서 보내야 한다.
        List<CustomFeedDto> customFeeds = new ArrayList<>();

        // 해당 피드들의 점수만 취합해 평균 평점을 계산한다.
        Double sumRating = 0.0;
        // 동시에 피드의 시퀀스 넘버, 썸네일만 가져와서 반환할 리스트를 만든다.
        // 우선 최신순 정렬
        for (int i = foundFeeds.size() - 1; i >= 0; i--) {
            Feed feed = foundFeeds.get(i);
            CustomFeedDto customFeed = new CustomFeedDto(feed.getFeedSeq(), feed.getThumbnail());
            customFeeds.add(customFeed);
            sumRating += feed.getRatings();
        }
        Double avgRating = sumRating / foundFeeds.size();

        // 피드 중에서 이미지를 골라온다.
        String placeImageUrl = foundFeeds.get(0).getThumbnail();

        // Dto에 담는다.
        DetailPlaceRes detailPlaceRes = DetailPlaceRes.builder()
                .name(place.getName())
                .address(place.getAddress())
                .avgRatings(avgRating).latitude(place.getLatitude()).longitude(place.getLongitude())
                .placeImageUrl(placeImageUrl)
                .feeds(customFeeds)
                .isWished(isWished)
                .build();
        return ResponseEntity.status(200).body(detailPlaceRes);
    }

    public ResponseEntity<PlaceFeedsRes> getPlaceFeedsBySorting(String token, Long placeSeq, String sort) {
        // token이 유효한지 검사한다.
        userService.getUserByToken(token);
        // 정렬 방식 점검
        if ("".equals(sort)){
            throw new CustomException(ErrorCode.WRONG_DATA);
        }
        // 해당하는 장소가 있는지 검사한다.
        Optional<Place> findPlace = placeRepository.findByPlaceSeq(placeSeq);
        if(findPlace.isEmpty()) {
            throw new CustomException(ErrorCode.PLACE_NOT_FOUND);
        }
        Place place = findPlace.get();

        // 장소를 찾고 해당 피드들을 불러온다.
        List<Feed> foundFeeds = feedRepository.findByPlace(place);
        if (foundFeeds.isEmpty()) {
            throw new CustomException(ErrorCode.FEED_NOT_FOUND);
        }
        // feed 객체의 모든 내용이 아닌, seq와 이미지만 담아서 보내야 한다.
        List<CustomFeedDto> customFeeds = new ArrayList<CustomFeedDto>();


        if ("popular".equals(sort)) {
            foundFeeds.sort(new FeedLikesComparator());
        }
        // 피드의 시퀀스 넘버, 썸네일만 가져와서 반환할 리스트를 만든다.

        for (int i = foundFeeds.size() - 1; i >= 0; i--) {
            Feed feed = foundFeeds.get(i);
            CustomFeedDto customFeed = new CustomFeedDto(feed.getFeedSeq(), feed.getThumbnail());
            customFeeds.add(customFeed);
        }

        PlaceFeedsRes placeFeedsRes = PlaceFeedsRes.builder()
                .feeds(customFeeds)
                .build();

        return ResponseEntity.status(200).body(placeFeedsRes);
    }

    // delete를 위해 붙임
    @Transactional
    public ResponseEntity<HashMap<String, Boolean>> wishPlace(String token, Long placeSeq) {
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);

        // 장소가 있는지 확인
        Optional<Place> findPlace = placeRepository.findByPlaceSeq(placeSeq);
        if (findPlace.isEmpty()) {
            throw new CustomException(ErrorCode.PLACE_NOT_FOUND);
        }
        Place place = findPlace.get();

        Optional<PlaceWish> wished = placeWishRepository.findByUserAndPlace(user, place);
        // 찜한 적이 없다면 -> 찜
        Boolean isWished = true;
        if (wished.isEmpty()) {
            PlaceWish newPlaceWish = PlaceWish.builder()
                    .user(user)
                    .place(place)
                    .build();

            placeWishRepository.save(newPlaceWish);
        } else {
            // 찜한 적이 있다면 -> 찜 해제
            placeWishRepository.deleteByUserAndPlace(user, place);
            isWished = false;
        }

        HashMap<String, Boolean> data = new HashMap<>();
        data.put("isWished", isWished);

        return ResponseEntity.status(200).body(data);
    }

}
