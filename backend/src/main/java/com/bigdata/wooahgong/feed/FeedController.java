// package com.bigdata.wooahgong.feed;
//
// import com.bigdata.wooahgong.feed.dtos.request.CreateFeedReq;
// import com.bigdata.wooahgong.feed.dtos.response.DetailFeedRes;
// import com.bigdata.wooahgong.feed.dtos.response.GetCommentsRes;
// import io.swagger.v3.oas.annotations.Operation;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;
//
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
//
// @CrossOrigin("*")
// @RestController
// @RequiredArgsConstructor
// @RequestMapping("/api/feed")
// public class FeedController {
//     private final FeedService feedService;
//
//     @PostMapping(consumes = {"multipart/form-data", "application/json"})
//     @Operation(summary = "피드 생성",
//             description = "1. token으로 사용자 조회\n" +
//                     "2. 장소PK로 장소 조회\n" +
//                     "3. 피드PK로 피드의 이미지들 조회\n")
//     public ResponseEntity<Map<String, Long>> createFeed(@RequestHeader("Authorization") String token,
//                                           @RequestPart(value = "images", required = false) List<MultipartFile> images,
//                                           @RequestPart(value = "data") CreateFeedReq createFeedReq) {
//         return new ResponseEntity<>(feedService.createFeed(token, images, createFeedReq), HttpStatus.OK);
//     }
//
//     @GetMapping("/{feed_seq}")
//     @Operation(summary = "피드 상세보기",
//             description = "1. token으로 사용자 조회\n" +
//                     "2. 피드PK로 피드 조회\n" +
//                     "3. 피드 저장\n" +
//                     "4. 피드 분위기 저장\n" +
//                     "5. 피드 이미지 저장")
//     public ResponseEntity<DetailFeedRes> detailFeed(@RequestHeader("Authorization") String token, @PathVariable("feed_seq") Long feedSeq) {
//         return new ResponseEntity<>(feedService.detailFeed(token,feedSeq), HttpStatus.OK);
//     }
//
//     @PatchMapping("/{feed_seq}")
//     @Operation(summary = "피드 내용 수정",
//             description = "1. check함수로 들어감" +
//                     "1-1. token으로 사용자 조회\n" +
//                     "1-2. 피드PK로 피드 조회\n" +
//                     "2. 피드 내용 수정하고 저장")
//     public ResponseEntity<String> updateFeed(@RequestHeader("Authorization") String token, @PathVariable("feed_seq") Long feedSeq,
//                                                     @RequestBody HashMap<String,String> content) {
//         return new ResponseEntity<>(feedService.updateFeed(token, feedSeq,content.get("content")),HttpStatus.OK);
//     }
//
//     @DeleteMapping("/{feed_seq}")
//     @Operation(summary = "피드 삭제",
//             description = "1. check함수로 들어감" +
//                     "1-1. token으로 사용자 조회\n" +
//                     "1-2. 피드PK로 피드 조회\n" +
//                     "+) 피드가 마지막이라면 장소도 삭제")
//     public ResponseEntity<String> deleteFeed(@RequestHeader("Authorization") String token, @PathVariable("feed_seq") Long feedSeq) {
//         return new ResponseEntity<>(feedService.deleteFeed(token, feedSeq),HttpStatus.OK);
//     }
//
//     @PostMapping("/{feed_seq}")
//     @Operation(summary = "피드 좋아요/ 취소",
//             description = "1. token으로 사용자 조회" +
//                     "2. 피드PK로 피드 조회\n" +
//                     "3. 피드와 사용자로 피드 좋아요 조회\n" +
//                     "4. 좋아요 저장 or 삭제")
//     public ResponseEntity<Boolean> likedFeed(@RequestHeader("Authorization") String token, @PathVariable("feed_seq") Long feedSeq) {
//         return new ResponseEntity<>(feedService.likedFeed(token, feedSeq),HttpStatus.OK);
//     }
//
//     @GetMapping("/{feed_seq}/comments")
//     @Operation(summary = "피드 댓글 조회",
//             description = "1. token으로 사용자 조회" +
//                     "2. 피드PK로 피드 조회\n" +
//                     "3. 피드의 댓글마다 댓글 좋아요 조회")
//     public ResponseEntity<List<GetCommentsRes>> getComments(@RequestHeader("Authorization") String token, @PathVariable("feed_seq") Long feedSeq) {
//         return new ResponseEntity<>(feedService.getComments(token,feedSeq), HttpStatus.OK);
//     }
//
//     @PostMapping("/{feed_seq}/comments")
//     @Operation(summary = "댓글 작성",
//             description = "1. token으로 사용자 조회" +
//                     "2. 피드PK로 피드 조회\n" +
//                     "3. 댓글 저장")
//     public ResponseEntity<String> createComment(@RequestHeader("Authorization") String token,@PathVariable("feed_seq") Long feedSeq,
//                                                 @RequestBody Map<String,String> content) {
//         return new ResponseEntity<>(feedService.createComment(token,feedSeq,content.get("content")), HttpStatus.OK);
//     }
//
//     @DeleteMapping("/{feed_seq}/comments/{comment_seq}")
//     @Operation(summary = "댓글 삭제",
//             description = "1. token으로 사용자 조회" +
//                     "2. 피드PK로 피드 조회\n" +
//                     "3. 댓글PK로 댓글 조회\n" +
//                     "4. 댓글 삭제")
//     public ResponseEntity<String> deleteComment(@RequestHeader("Authorization") String token,@PathVariable("feed_seq") Long feedSeq,
//                                                 @PathVariable("comment_seq") Long commentSeq) {
//         return new ResponseEntity<>(feedService.deleteComment(token,feedSeq,commentSeq), HttpStatus.OK);
//     }
//     // 댓글 좋아요
//     @PostMapping("/{feed_seq}/comments/{comment_seq}")
//     @Operation(summary = "댓글 좋아요",
//             description = "1. token으로 사용자 조회" +
//                     "2. 댓글PK로 댓글 조회\n" +
//                     "3. 댓글과 사용자로 댓글 좋아요 조회\n" +
//                     "4. 댓글 좋아요 저장/삭제")
//     public ResponseEntity<Boolean> likeComment(@RequestHeader("Authorization") String token,@PathVariable("feed_seq") Long feedSeq,
//                                                 @PathVariable("comment_seq") Long commentSeq) {
//         return new ResponseEntity<>(feedService.likeComment(token,feedSeq,commentSeq), HttpStatus.OK);
//     }
//
// }
