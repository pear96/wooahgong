package com.bigdata.wooahgong.place;


import com.bigdata.wooahgong.place.dtos.request.CreatePlaceReq;
import com.bigdata.wooahgong.place.dtos.response.DetailPlaceRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/place")
public class PlaceController {
    private final PlaceService placeService;

    @PostMapping("")
    public ResponseEntity<String> createPlace(@RequestHeader("Authorization") String token, @RequestBody CreatePlaceReq createPlaceReq){
        return placeService.createPlace(token, createPlaceReq);
    }

    @GetMapping("/{place_name}")
    public ResponseEntity<DetailPlaceRes> getPlace(@RequestHeader("Authorization") String token, @PathVariable("place_name") String placeName) {
        return placeService.getPlace(token, placeName);
    }
}
