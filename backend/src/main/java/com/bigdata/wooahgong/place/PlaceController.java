package com.bigdata.wooahgong.place;


import com.bigdata.wooahgong.place.dtos.request.CreatePlaceReq;
import com.bigdata.wooahgong.place.dtos.response.DetailPlaceRes;
import com.bigdata.wooahgong.place.dtos.response.PlaceFeedsRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/place")
public class PlaceController {
    private final PlaceService placeService;

    @PostMapping("")
    public ResponseEntity<HashMap<String, Long>> createPlace(@RequestHeader("Authorization") String token, @RequestBody CreatePlaceReq createPlaceReq){
        return placeService.createPlace(token, createPlaceReq);
    }

    @GetMapping("/{place_seq}")
    public ResponseEntity<DetailPlaceRes> getPlace(@RequestHeader("Authorization") String token, @PathVariable("place_seq") Long placeSeq) {
        return placeService.getPlace(token, placeSeq);
    }

    @GetMapping(value = "/{place_seq}", params = {"sort"})
    public ResponseEntity<PlaceFeedsRes> getPlaceFeedsBySorting(@RequestHeader("Authorization") String token, @PathVariable("place_seq") Long placeSeq,
                                                                @RequestParam("sort") String sort) {
        return placeService.getPlaceFeedsBySorting(token, placeSeq, sort);
    }

    @PostMapping(value = "/{place_seq}/wish")
    public ResponseEntity<HashMap<String, Boolean>> getPlaceFeedsBySorting(@RequestHeader("Authorization") String token, @PathVariable("place_seq") Long placeSeq) {
        return placeService.wishPlace(token, placeSeq);
    }
}
