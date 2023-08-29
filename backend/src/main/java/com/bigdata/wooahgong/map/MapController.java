package com.bigdata.wooahgong.map;

import com.bigdata.wooahgong.search.dtos.response.SearchPlaceDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main")
public class MapController {
    private final MapService mapService;

    @GetMapping("/map")
    @Operation(summary = "사용자 위치 반경 ~km 장소 조회",
            description = "1. token으로 사용자 조회\n" +
                    "2. 장소 전체 조회\n" +
                    "3. 장소의 평균 평점 계산")
    public ResponseEntity<List<SearchPlaceDto>> getMap(@RequestParam double lng, double lat, int rad) {
        return new ResponseEntity<>(mapService.getMap(lng, lat, rad), HttpStatus.OK);
    }

    @GetMapping("/map_old")
    @Operation(summary = "사용자 위치 반경 ~km 장소 조회",
            description = "1. token으로 사용자 조회\n" +
                    "2. 장소 전체 조회\n" +
                    "3. 장소의 평균 평점 계산")
    public ResponseEntity<List<SearchPlaceDto>> getOldMap(@RequestParam double lng, double lat, int rad) {
        return new ResponseEntity<>(mapService.getOldMap(lng, lat, rad), HttpStatus.OK);
    }
}
