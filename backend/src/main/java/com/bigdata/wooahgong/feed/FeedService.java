package com.bigdata.wooahgong.feed;

import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.common.s3.S3Uploader;
import com.bigdata.wooahgong.feed.dtos.request.CreateFeedReq;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.feed.entity.FeedImage;
import com.bigdata.wooahgong.feed.entity.FeedMood;
import com.bigdata.wooahgong.feed.repository.FeedImageRepository;
import com.bigdata.wooahgong.feed.repository.FeedMoodRepository;
import com.bigdata.wooahgong.feed.repository.FeedRepository;
import com.bigdata.wooahgong.mood.entity.Mood;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.repository.PlaceRepository;
import com.bigdata.wooahgong.user.UserService;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final S3Uploader s3Uploader;
    private final UserService userService;
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private final FeedImageRepository feedImageRepository;
    private final FeedMoodRepository feedMoodRepository;

    // 일단 모든 피드들 리턴
    // 추후에 어떤 정렬 방식을 이용할지 결정.
    public List<Feed> getFeedsTrend(String token) {
        List<Feed> feedList = feedRepository.findAll();
        return feedList;
    }

    @Transactional
    public String createFeed(String token, List<MultipartFile> images, CreateFeedReq createFeedReq) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(userService.getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        // 파일 업로드 후 urls 저장
        List<String> urls = s3Uploader.upload(images, "static", "feed");
        System.out.println("첫번째 사진 : " + urls.get(0));
        // moods
        List<Mood> moods = createFeedReq.getMoods();
        // place
        Place place = placeRepository.findByPlaceSeq(createFeedReq.getPlaceSeq()).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        Feed feed = Feed.builder()
                .content(createFeedReq.getContent())
                .ratings(createFeedReq.getRatings())
                .thumbnail(urls.get(0))
                .user(user)
                .place(place).build();
        // 피드 저장
        feedRepository.save(feed);
        // 피드_분위기 테이블에 저장
        for(Mood mood : moods){
            FeedMood feedMood = FeedMood.builder()
                    .feed(feed)
                    .mood(mood).build();
            feedMoodRepository.save(feedMood);
        }
        // 피드_사진 테이블에 저장
        for(String url : urls){
            FeedImage feedImage = FeedImage.builder()
                    .feed(feed)
                    .imageUrl(url).build();
            feedImageRepository.save(feedImage);
        }
        // 평점 재계산
        double totalRating = 0;
//        List<Feed> feedList =
        return null;
    }
}
