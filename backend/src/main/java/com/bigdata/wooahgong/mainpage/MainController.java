package com.bigdata.wooahgong.mainpage;

import com.bigdata.wooahgong.mainpage.dtos.request.GetMapReq;
import com.bigdata.wooahgong.search.dtos.response.SearchPlaceDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main")
public class MainController {
    private final MainService mainService;

    @PostMapping("/map")
    @Operation(summary = "사용자 위치 반경 ~km 장소 조회",
            description = "1. token으로 사용자 조회\n" +
                    "2. 장소 전체 조회\n" +
                    "3. 장소의 평균 평점 계산")
    public ResponseEntity<List<SearchPlaceDto>> getMap(@RequestBody GetMapReq getMapReq) {
        return new ResponseEntity<>(mainService.getMap(getMapReq), HttpStatus.OK);
    }
}
