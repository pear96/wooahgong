package com.bigdata.wooahgong.mainpage;

import com.bigdata.wooahgong.mainpage.dtos.request.GetMapReq;
import com.bigdata.wooahgong.search.dtos.response.SearchPlaceDto;
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
    public ResponseEntity<List<SearchPlaceDto>> getMap(@RequestBody GetMapReq getMapReq) {
        return new ResponseEntity<>(mainService.getMap(getMapReq), HttpStatus.OK);
    }
}
