package com.bigdata.wooahgong.place;


import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.feed.repository.FeedRepository;
import com.bigdata.wooahgong.place.dtos.request.CreatePlaceReq;
import com.bigdata.wooahgong.place.dtos.request.CustomFeedDto;
import com.bigdata.wooahgong.place.dtos.response.DetailPlaceRes;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.repository.PlaceRepository;
import com.bigdata.wooahgong.user.UserService;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaceService {
    private final UserService userService;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private final FeedRepository feedRepository;

    public ResponseEntity<String> createPlace(String token, CreatePlaceReq createPlaceReq) {
        // token이 유효한지 검사한다.
        User user = userRepository.findByEmail(userService.getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));

        // 요청이 정상인지 검사한다.
        String name = createPlaceReq.getName();
        String address = createPlaceReq.getAddress();
        Double lag = createPlaceReq.getLat();
        Double lng = createPlaceReq.getLng();

        if ("".equals(name) || "".equals(address) || lag == 0.0 || lng == 0.0) {
            throw new CustomException(ErrorCode.WRONG_DATA);
        }

        // 장소를 생성한다.
        Place newPlace = Place.builder()
                .user(user)
                .name(name)
                .address(address)
                .latitude(lag)
                .longitude(lng)
                .build();

        placeRepository.save(newPlace);
        // 성공 응답을 보낸다.
        return ResponseEntity.status(200).body("장소 등록 성공");
    }

    public ResponseEntity<DetailPlaceRes> getPlace(String token, String placeName) {
        // token이 유효한지 검사한다.
        if ("".equals(userService.getEmailByToken(token))){
            throw new CustomException(ErrorCode.NOT_OUR_USER);
        }

        // 이름에 해당하는 장소가 있는지 검사한다.
        Optional<Place> findPlace = placeRepository.findByName(placeName);
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

        Double sumRating = 0.0;
        // 해당 피드들의 점수만 취합해 평균 평점을 계산한다.
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
        List<String> placeImages = new ArrayList<>();
        for (int i = 0; i < foundFeeds.size(); i++) {
            if (i > 2) {
                break;
            }
            Feed feed = foundFeeds.get(i);
            placeImages.add(feed.getThumbnail());
        }

        // Dto에 담는다.
        DetailPlaceRes detailPlaceRes = DetailPlaceRes.builder()
                .name(placeName)
                .address(place.getAddress())
                .avgRatings(avgRating)
                .placeImages(placeImages)
                .feeds(customFeeds)
                .build();
        return ResponseEntity.status(200).body(detailPlaceRes);
    }
}
