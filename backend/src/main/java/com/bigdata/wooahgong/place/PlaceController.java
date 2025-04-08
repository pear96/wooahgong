// package com.bigdata.wooahgong.place;
//
//
// import com.bigdata.wooahgong.place.dtos.request.CreatePlaceReq;
// import com.bigdata.wooahgong.place.dtos.response.DetailPlaceRes;
// import com.bigdata.wooahgong.place.dtos.response.PlaceFeedsRes;
// import io.swagger.v3.oas.annotations.Operation;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
//
// import java.util.HashMap;
//
// @RestController
// @RequiredArgsConstructor
// @RequestMapping("api/place")
// public class PlaceController {
//     private final PlaceService placeService;
//
//     @PostMapping("")
//     @Operation(summary = "장소 만들기",
//             description = "1. token으로 사용자 조회 \n" +
//                     "2. 위도, 경도 중복 조회\n" +
//                     "3. 장소 생성")
//     public ResponseEntity<HashMap<String, Long>> createPlace(@RequestHeader("Authorization") String token, @RequestBody CreatePlaceReq createPlaceReq){
//         return placeService.createPlace(token, createPlaceReq);
//     }
//
//     @GetMapping("/{place_seq}")
//     @Operation(summary = "장소 조회",
//             description = "1. token으로 사용자 조회 \n" +
//                     "2. 장소pk로 장소 조회\n" +
//                     "3. 사용자와 장소로 장소 찜 조회\n" +
//                     "4. 장소로 피드들 조회\n" +
//                     "+) 해당 장소 평균 평점 계산")
//     public ResponseEntity<DetailPlaceRes> getPlace(@RequestHeader("Authorization") String token, @PathVariable("place_seq") Long placeSeq) {
//         return placeService.getPlace(token, placeSeq);
//     }
//
//     @GetMapping(value = "/{place_seq}", params = {"sort"})
//     @Operation(summary = "장소 피드 정렬 조회",
//             description = "1. token으로 사용자 조회 \n" +
//                     "2. 장소pk로 장소 조회\n" +
//                     "3. 장소로 피드들 조회\n" +
//                     "3-1.인기순일 경우 정렬")
//     public ResponseEntity<PlaceFeedsRes> getPlaceFeedsBySorting(@RequestHeader("Authorization") String token, @PathVariable("place_seq") Long placeSeq,
//                                                                 @RequestParam("sort") String sort) {
//         return placeService.getPlaceFeedsBySorting(token, placeSeq, sort);
//     }
//
//     @PostMapping(value = "/{place_seq}/wish")
//     @Operation(summary = "장소 찜하기",
//             description = "1. token으로 사용자 조회 \n" +
//                     "2. 장소pk로 장소 조회\n" +
//                     "3. 사용자와 장소로 장소 찜 조회\n" +
//                     "4. 찜한 상태 반전시켜서 DB에 저장 or 삭제")
//     public ResponseEntity<HashMap<String, Boolean>> wishPlace(@RequestHeader("Authorization") String token, @PathVariable("place_seq") Long placeSeq) {
//         return placeService.wishPlace(token, placeSeq);
//     }
// }
