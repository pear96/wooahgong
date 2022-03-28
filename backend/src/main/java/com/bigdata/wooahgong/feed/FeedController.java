package com.bigdata.wooahgong.feed;

import com.bigdata.wooahgong.feed.dtos.request.CreateFeedReq;
import com.bigdata.wooahgong.feed.dtos.response.DetailFeedRes;
import com.bigdata.wooahgong.feed.dtos.response.GetCommentsRes;
import com.bigdata.wooahgong.feed.entity.Feed;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
    private final FeedService feedService;

//    // 메인 - For me 피드 가져오기
//    @GetMapping("/forme")
//    public ResponseEntity<List<Feed>> getFeedsForMe(@RequestHeader("Authorization") String token) {
//        return new ResponseEntity<>(feedService.getFeedsForMe(token.split(" ")[1]), HttpStatus.OK);
//    }

    // 메인 - trend 피드 가져오기
    // 대문을 거치지 않고 둘러보게 하려면 여기랑 WebConfig 수정 ㄱㄱ
//    @GetMapping("/trend")
//    public ResponseEntity<List<Feed>> getFeedsTrend(@RequestHeader("Authorization") String token) {
//        return new ResponseEntity<>(feedService.getFeedsTrend(token.split(" ")[1]), HttpStatus.OK);
//    }
    // 피드 쓰기
    @PostMapping
    public ResponseEntity<String> createFeed(@RequestHeader("Authorization") String token,
                                             @RequestPart(value = "images", required = false) List<MultipartFile> images,
                                             @RequestPart(value = "data") CreateFeedReq createFeedReq) {
        return new ResponseEntity<>(feedService.createFeed(token, images, createFeedReq), HttpStatus.OK);
    }
    // 피드 상세보기
    @GetMapping("/{feed_seq}")
    public ResponseEntity<DetailFeedRes> detailFeed(@RequestHeader("Authorization") String token, @PathVariable("feed_seq") Long feedSeq) {
        return new ResponseEntity<DetailFeedRes>(feedService.detailFeed(token,feedSeq), HttpStatus.OK);
    }
    // 피드 수정
    @PatchMapping("/{feed_seq}")
    public ResponseEntity<String> updateFeed(@RequestHeader("Authorization") String token, @PathVariable("feed_seq") Long feedSeq,
                                                    @RequestParam String content) {
        return new ResponseEntity<>(feedService.updateFeed(token, feedSeq,content),HttpStatus.OK);
    }
    // 피드 삭제
    @DeleteMapping("/{feed_seq}")
    public ResponseEntity<String> deleteFeed(@RequestHeader("Authorization") String token, @PathVariable("feed_seq") Long feedSeq) {
        return new ResponseEntity<>(feedService.deleteFeed(token, feedSeq),HttpStatus.OK);
    }
    // 피드 좋아요
    @PostMapping("/{feed_seq}")
    public ResponseEntity<Boolean> likedFeed(@RequestHeader("Authorization") String token, @PathVariable("feed_seq") Long feedSeq) {
        return new ResponseEntity<Boolean>(feedService.likedFeed(token, feedSeq),HttpStatus.OK);
    }
    // 댓글 불러오기
    @GetMapping("/{feed_seq}/comments")
    public ResponseEntity<List<GetCommentsRes>> getComments(@RequestHeader("Authorization") String token, @PathVariable("feed_seq") Long feedSeq) {
        return new ResponseEntity<List<GetCommentsRes>>(feedService.getComments(token,feedSeq), HttpStatus.OK);
    }
    // 댓글 작성
    @PostMapping("/{feed_seq}/comments")
    public ResponseEntity<String> createComment(@RequestHeader("Authorization") String token,@PathVariable("feed_seq") Long feedSeq,
                                                @RequestParam String content) {
        return new ResponseEntity<String>(feedService.createComment(token,feedSeq,content), HttpStatus.OK);
    }
    // 댓글 삭제
    @DeleteMapping("/{feed_seq}/comments/{comment_seq}")
    public ResponseEntity<String> deleteComment(@RequestHeader("Authorization") String token,@PathVariable("feed_seq") Long feedSeq,
                                                @PathVariable("comment_seq") Long commentSeq) {
        return new ResponseEntity<String>(feedService.deleteComment(token,feedSeq,commentSeq), HttpStatus.OK);
    }
    // 댓글 좋아요
    @PostMapping("/{feed_seq}/comments/{comment_seq}")
    public ResponseEntity<Boolean> likeComment(@RequestHeader("Authorization") String token,@PathVariable("feed_seq") Long feedSeq,
                                                @PathVariable("comment_seq") Long commentSeq) {
        return new ResponseEntity<Boolean>(feedService.likeComment(token,feedSeq,commentSeq), HttpStatus.OK);
    }

}
