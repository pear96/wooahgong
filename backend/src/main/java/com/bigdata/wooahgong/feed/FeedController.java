package com.bigdata.wooahgong.feed;

import com.bigdata.wooahgong.feed.dtos.request.CreateFeedReq;
import com.bigdata.wooahgong.feed.dtos.response.DetailFeedRes;
import com.bigdata.wooahgong.feed.dtos.response.GetCommentsRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
    private final FeedService feedService;

    // 피드 쓰기
    @PostMapping(consumes = {"multipart/form-data", "application/json"})
    public ResponseEntity<Map<String, Long>> createFeed(@RequestHeader("Authorization") String token,
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
                                                    @RequestBody HashMap<String,String> content) {
        return new ResponseEntity<>(feedService.updateFeed(token, feedSeq,content.get("content")),HttpStatus.OK);
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
                                                @RequestBody Map<String,String> content) {
        return new ResponseEntity<String>(feedService.createComment(token,feedSeq,content.get("content")), HttpStatus.OK);
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
