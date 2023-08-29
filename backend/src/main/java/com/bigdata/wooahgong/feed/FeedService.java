package com.bigdata.wooahgong.feed;

import ch.qos.logback.classic.Logger;
import com.bigdata.wooahgong.comment.entity.Comment;
import com.bigdata.wooahgong.comment.repository.CommentRepository;
import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.common.util.JwtTokenUtil;
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
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final ImageService imageService;
    private final UserService userService;
    private final FeedRepository feedRepository;
    private final PlaceRepository placeRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final CommentRepository commentRepository;
    private final FeedImageRepository feedImageRepository;
    private final FeedMoodRepository feedMoodRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final MoodRepository moodRepository;
    private final Logger logger = (Logger) LoggerFactory.getLogger(this.getClass().getSimpleName());

    /**
     * 피드 생성하는 함수
     * @param token 사용자 토큰
     * @param images 피드에 삽입할 이미지 파일들
     * @param createFeedReq 장소PK, 피드 내용, 평점, 분위기
     * @return 생성한 피드의 PK
     */
    @Transactional
    public Map<String, Long> createFeed(String token, List<MultipartFile> images, CreateFeedReq createFeedReq) {

        logger.debug("[create feed]");

        // 토큰으로 유저 찾기
        User user = userService.getUserByToken(token);
        logger.debug("[create feed] userId : " + user.getUserId());

        // 파일 업로드 후 urls 저장
        List<String> urls = imageService.uploadImages(user.getUserId(), images);

        // moods
        List<String> moods = createFeedReq.getMoods();

        // place
        Place place = placeRepository.findByPlaceSeq(createFeedReq.getPlaceSeq()).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        logger.debug("[create feed] place : " + place.getName());

        // 피드 저장. 피드를 저장하고 PK를 받아야 피드 분위기와 이미지들을 DB에 저장할 수 있다.
        Feed feed = Feed.builder()
                .content(createFeedReq.getContent())
                .ratings(createFeedReq.getRatings())
                .thumbnail(urls.get(0))
                .user(user)
                .place(place).build();
        feedRepository.save(feed);
        logger.debug("[create feed] feed saved");

        // 피드_분위기 테이블에 저장
        for (String mood : moods) {
            FeedMood feedMood = FeedMood.builder()
                    .feed(feed)
                    .mood(moodRepository.findByMoodContaining(mood).orElseThrow(() ->
                            new CustomException(ErrorCode.MOOD_NOT_FOUND))).build();
            feedMoodRepository.save(feedMood);
        }

        // 피드_사진 테이블에 저장 (피드가 생성 되어야 피드 이미지들과 연결지을 수 있음)
        for (String url : urls) {
            FeedImage feedImage = FeedImage.builder()
                    .feed(feed)
                    .imageUrl(url)
                    .build();
            feedImageRepository.save(feedImage);
        }

        // 클라이언트에 피드의 PK 반환
        HashMap<String, Long> createdFeedSeq = new HashMap<>();
        createdFeedSeq.put("FeedSeq", feed.getFeedSeq());
        logger.debug("[create feed] return feed seq : " + createdFeedSeq);

        return createdFeedSeq;
    }


    // 피드 상세 보기
    public DetailFeedRes detailFeed(String token, Long feedSeq) {
        // 토큰으로 유저 찾기
        User user = userService.getUserByToken(token);

        // 피드 찾기
        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));

        // 피드 주인
        User owner = feed.getUser();

        // 장소 찾기
        Place place = feed.getPlace();

        // 사진 찾기
        List<String> feedImages = feedImageRepository.findImageUrlAllByFeed(feed.getFeedSeq()).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));

        // DTO 만들기
        List<String> moods = new ArrayList<>();
        for (FeedMood feedMood : feed.getFeedMoods()) {
            moods.add(feedMood.getMood().getMood());
        }

        return DetailFeedRes.builder()
                .feedSeq(feedSeq)
                .userSeq(owner.getUserSeq())
                .userImageUrl(imageService.getImage(owner.getImageUrl()))
                .nickname(feed.getUser().getNickname())
                .placeSeq(place.getPlaceSeq())
                .placeName(place.getName())
                .address(place.getAddress())
                .images(feedImages)
                .content(feed.getContent())
                .amIOwner(owner.getEmail().equals(user.getEmail()))
                .ratings(feed.getRatings())
                .createDate(DateTimeFormatter.ofPattern("yyyy-MM-dd").format(feed.getCreatedDate()))
                .moods(moods)
                .amILike(amIPressedLike(feed, user))
                .likesCnt(feed.getFeedLikes().size())
                .commentsCnt(feed.getComments().size())
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

    @Transactional
    public String deleteFeed(String token, Long feedSeq) {
        Feed feed = check(token, feedSeq);
        Place place = feed.getPlace();
        // 최후의 피드라면 장소도 같이 삭제
        if (place.getFeeds().size() == 1) {
            place.getFeeds().remove(feed);
            placeRepository.delete(place);
            return "장소, 피드 삭제 완료";
        }
        // 2. 부모에서 자식 삭제
        place.getFeeds().remove(feed);
        // 3. 삭제
//        feedRepository.delete(feed);
        return "삭제 완료.";
    }

    public Feed check(String token, Long feedSeq) {
        // 토큰으로 유저 찾기
        User user = userService.getUserByToken(token);
        logger.debug("userId : " + user.getUserId());

        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));
        logger.debug("feedSeq : " + feed.getFeedSeq());

        // 주인이 아님
        if (!feed.getUser().getEmail().equals(user.getEmail())) {
            logger.info("user doesn't own this feed.");
            throw new CustomException(ErrorCode.INVALID_AUTHORIZED);
        }

        return feed;
    }

    @Transactional
    public boolean likedFeed(String token, Long feedSeq) {
        // 토큰으로 유저 찾기
        User user = userService.getUserByToken(token);

        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));

        boolean isLiked = true;
        FeedLike feedLike = feedLikeRepository.findByFeedAndUser(feed, user).orElseGet(FeedLike::new);

        // 좋아요를 누르지 않았음
        if (feedLike.getFeed() == null) {
            feedLikeRepository.save(FeedLike.builder()
                    .user(user).feed(feed).build());
        } else {
            feedLikeRepository.delete(feedLike);
            isLiked = false;
        }

        return isLiked;
    }

    public List<GetCommentsRes> getComments(String token, Long feedSeq) {
        // 토큰으로 유저 찾기
        User user = userService.getUserByToken(token);

        // 피드 찾기
        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));

        // 피드에 달린 댓글들
        List<GetCommentsRes> getCommentsResList = new ArrayList<>();
        List<Comment> comments = feed.getComments();

        for (Comment comment : comments) {
            // 댓글 쓴사람
            User CommentOwner = comment.getUser();

            // 내가 좋아요를 눌렀는지
            CommentLike commentLike = commentLikeRepository.findByCommentAndUser(comment, user).orElseGet(CommentLike::new);
            boolean amILike = commentLike.getCommentLikeSeq() != null;

            // 댓글 주인인지
            boolean amIOwner = Objects.equals(user.getUserSeq(), CommentOwner.getUserSeq());

            getCommentsResList.add(GetCommentsRes.builder()
                    .commentSeq(comment.getCommentSeq())
                    .userSeq(CommentOwner.getUserSeq())
                    .userImage(imageService.getImage(CommentOwner.getImageUrl()))
                    .nickname(CommentOwner.getNickname())
                    .content(comment.getContent())
                    .amILike(amILike).amIOwner(amIOwner)
                    .createDate(DateTimeFormatter.ofPattern("yyyy-MM-dd").format(comment.getCreatedDate()))
                    .likeCnt(comment.getCommentLikes().size())
                    .build());
        }
        return getCommentsResList;
    }

    public String createComment(String token, Long feedSeq, String content) {
        // 토큰으로 유저 찾기
        User user = userService.getUserByToken(token);
        // 피드 찾기
        Feed feed = feedRepository.findByFeedSeq(feedSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));

        commentRepository.save(Comment.builder()
                .feed(feed).user(user).content(content).build());
        return "댓글 작성에 성공하였습니다.";
    }

    public String deleteComment(String token, Long feedSeq, Long commentSeq) {
        // 토큰으로 유저 찾기
        JwtTokenUtil.verifyToken(token);
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
    public Boolean likeComment(String token, Long feedSeq, Long commentSeq) {
        // 토큰으로 유저 찾기
        User user = userService.getUserByToken(token);

        Comment comment = commentRepository.findByCommentSeq(commentSeq).orElseThrow(() ->
                new CustomException(ErrorCode.DATA_NOT_FOUND));

        boolean isLiked = true;
        CommentLike commentLike = commentLikeRepository.findByCommentAndUser(comment, user).orElseGet(CommentLike::new);

        // 좋아요를 누르지 않았음
        if (commentLike.getCreatedDate() == null) {
            commentLikeRepository.save(CommentLike.builder()
                    .user(user).comment(comment).build());
        } else {
            commentLikeRepository.delete(commentLike);
            isLiked = false;
        }

        return isLiked;
    }
}
