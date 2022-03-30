package com.bigdata.wooahgong.feed;

import com.bigdata.wooahgong.comment.entity.Comment;
import com.bigdata.wooahgong.comment.repository.CommentRepository;
import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.common.s3.S3Service;
import com.bigdata.wooahgong.feed.dtos.request.CreateFeedReq;
import com.bigdata.wooahgong.feed.dtos.response.DetailFeedRes;
import com.bigdata.wooahgong.feed.dtos.response.GetCommentsRes;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.feed.entity.FeedImage;
import com.bigdata.wooahgong.feed.entity.FeedMood;
import com.bigdata.wooahgong.feed.repository.FeedImageRepository;
import com.bigdata.wooahgong.feed.repository.FeedMoodRepository;
import com.bigdata.wooahgong.feed.repository.FeedRepository;
import com.bigdata.wooahgong.mood.repository.MoodRepository;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.repository.PlaceRepository;
import com.bigdata.wooahgong.user.UserService;
import com.bigdata.wooahgong.user.entity.CommentLike;
import com.bigdata.wooahgong.user.entity.FeedLike;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.repository.CommentLikeRepository;
import com.bigdata.wooahgong.user.repository.FeedLikeRepository;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final S3Service s3Service;
    private final UserService userService;
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final PlaceRepository placeRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final CommentRepository commentRepository;
    private final FeedImageRepository feedImageRepository;
    private final FeedMoodRepository feedMoodRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final MoodRepository moodRepository;

    // 일단 모든 피드들 리턴
    // 추후에 어떤 정렬 방식을 이용할지 결정.
//    public List<Feed> getFeedsTrend(String token) {
//        List<Feed> feedList = feedRepository.findAll();
//        return feedList;
//    }

    @Transactional
    public Map<String,Long> createFeed(String token, List<MultipartFile> images, CreateFeedReq createFeedReq) {
        for (MultipartFile multipartFile : images){
            System.out.println("Service multipartFile : "+ multipartFile);
        }
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(userService.getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        // 파일 업로드 후 urls 저장
        List<String> urls = null;
        try {
            urls = s3Service.uploadImg(images, "/feed");
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("첫번째 사진 : " + urls.get(0));
        // moods
        List<String> moods = createFeedReq.getMoods();
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
        for (String mood : moods) {
            FeedMood feedMood = FeedMood.builder()
                    .feed(feed)
                    .mood(moodRepository.findByMoodContaining(mood).orElseThrow(() ->
                            new CustomException(ErrorCode.MOOD_NOT_FOUND))).build();
            feedMoodRepository.save(feedMood);
        }
        // 피드_사진 테이블에 저장
        for (String url : urls) {
            System.out.println("사진 url = "+url);
            FeedImage feedImage = FeedImage.builder()
                    .feed(feed)
                    .imageUrl(url).build();
            feedImageRepository.save(feedImage);
        }
        HashMap<String,Long> hm = new HashMap<>();
        hm.put("FeedSeq",feed.getFeedSeq());
        return hm;
    }


    // 피드 상세 보기
    public DetailFeedRes detailFeed(String token, Long feedSeq) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(userService.getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));

        // 피드 찾기
        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        // 피드 주인
        User owner = feed.getUser();
        // 장소 찾기
        Place place = feed.getPlace();
        // 사진 찾기
        List<FeedImage> feedImages = feedImageRepository.findAllByFeed(feed).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        List<String> urls = new ArrayList<>();
        for (FeedImage feedImage : feedImages) {
            urls.add(feedImage.getImageUrl());
        }
        // DTO 만들기
        List<String> moods = new ArrayList<>();
        for (FeedMood feedMood : feed.getFeedMoods()) {
            moods.add(feedMood.getMood().getMood());
        }
        return DetailFeedRes.builder()
                .feedSeq(feedSeq).userSeq(owner.getUserSeq()).userImageUrl(owner.getImageUrl())
                .nickname(feed.getUser().getNickname()).placeSeq(place.getPlaceSeq()).placeName(place.getName())
                .address(place.getAddress()).images(urls)
                .content(feed.getContent()).amIOwner(owner.getEmail().equals(user.getEmail()))
                .ratings(feed.getRatings()).createDate(DateTimeFormatter.ofPattern("yyyy-MM-dd").format(feed.getCreatedDate()))
                .moods(moods).amILike(amIPressedLike(feed, user))
                .likesCnt(feed.getFeedLikes().size()).commentsCnt(feed.getComments().size())
                .build();
    }

    public boolean amIPressedLike(Feed feed, User user) {
        FeedLike feedLike = feedLikeRepository.findByFeedAndUser(feed, user).orElseGet(FeedLike::new);
        return feedLike.getFeed() != null;
    }

    public String updateFeed(String token, Long feedSeq, String content) {
        Feed feed = check(token, feedSeq);
        feed.updateContent(content);
        feedRepository.save(feed);
        return "수정 완료.";
    }

    public String deleteFeed(String token, Long feedSeq) {
        Feed feed = check(token, feedSeq);
        Place place = feed.getPlace();
        // 최후의 피드라면 장소도 같이 삭제
        if(place.getFeeds().size() == 1){
            feedRepository.delete(feed);
            placeRepository.delete(place);
            return "장소, 피드 삭제 완료";
        }
        feedRepository.delete(feed);
        return "삭제 완료.";
    }

    public Feed check(String token, Long feedSeq) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(userService.getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));

        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        // 주인이 아님
        if (!feed.getUser().getEmail().equals(user.getEmail())) {
            throw new CustomException(ErrorCode.INVALID_AUTHORIZED);
        }
        return feed;
    }

    public List<GetCommentsRes> getComments(String token, Long feedSeq) {
        List<GetCommentsRes> getCommentsResList = new ArrayList<>();
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(userService.getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        // 피드 찾기
        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        // 피드에 달린 댓글들
        List<Comment> comments = feed.getComments();
        for (Comment comment : comments) {
            // 댓글 쓴사람
            User CommentOwner = comment.getUser();
            // 내가 좋아요를 눌렀는지
            CommentLike commentLike = commentLikeRepository.findByCommentAndUser(comment, user).orElseGet(CommentLike::new);
            boolean amILike = commentLike.getCommentLikeSeq() != null;
            // 댓글 주인인지
            boolean amIOwner = true ? user.getUserSeq() == CommentOwner.getUserSeq() : false;

            getCommentsResList.add(GetCommentsRes.builder()
                    .commentSeq(comment.getCommentSeq()).userSeq(CommentOwner.getUserSeq())
                    .userImage(CommentOwner.getImageUrl()).nickname(CommentOwner.getNickname())
                    .content(comment.getContent())
                    .amILike(amILike).amIOwner(amIOwner)
                    .createDate(DateTimeFormatter.ofPattern("yyyy-MM-dd").format(comment.getCreatedDate()))
                    .likeCnt(comment.getCommentLikes().size()).build());
        }
        return getCommentsResList;
    }

    public String createComment(String token, Long feedSeq, String content) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(userService.getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        // 피드 찾기
        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        commentRepository.save(Comment.builder()
                .feed(feed).user(user).content(content).build());
        return "댓글 작성에 성공하였습니다.";
    }

    public String deleteComment(String token, Long feedSeq, Long commentSeq) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(userService.getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        // 피드 찾기
        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        // 댓글 찾기
        Comment comment = commentRepository.findByCommentSeq(commentSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        commentRepository.delete(comment);
        return "삭제 완료";
    }
    @Transactional
    public boolean likedFeed(String token, Long feedSeq) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(userService.getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        boolean isLiked = true;
        FeedLike feedLike = feedLikeRepository.findByFeedAndUser(feed, user).orElseGet(FeedLike::new);
        // 좋아요를 누르지 않았음
        if(feedLike.getFeed() == null){
            feedLikeRepository.save(FeedLike.builder()
                    .user(user).feed(feed).build());
        }else{
            feedLikeRepository.delete(feedLike);
            isLiked = false;
        }
        return isLiked;
    }
    @Transactional
    public Boolean likeComment(String token, Long feedSeq, Long commentSeq) {
        // 토큰으로 유저 찾기
        User user = userRepository.findByEmail(userService.getEmailByToken(token)).orElseThrow(() ->
                new CustomException(ErrorCode.NOT_OUR_USER));
        Comment comment = commentRepository.findByCommentSeq(commentSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        boolean isLiked = true;
        CommentLike commentLike = commentLikeRepository.findByCommentAndUser(comment,user).orElseGet(CommentLike::new);
        // 좋아요를 누르지 않았음
        if(commentLike.getCreatedDate() == null){
            commentLikeRepository.save(CommentLike.builder()
                    .user(user).comment(comment).build());
        }else{
            commentLikeRepository.delete(commentLike);
            isLiked = false;
        }
        return isLiked;
    }
}
