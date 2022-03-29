package com.bigdata.wooahgong.search;

import com.bigdata.wooahgong.search.dtos.response.SearchHistoriesRes;
import com.bigdata.wooahgong.search.dtos.response.SearchPlaceDto;
import com.bigdata.wooahgong.search.dtos.response.SearchUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/search")
public class SearchController {
    private final SearchService searchService;

    // 검색창 진입 -> 최근 검색어 전달
    @GetMapping("")
    public ResponseEntity<SearchHistoriesRes> searchHistory(@RequestHeader("Authorization") String token) {
        return searchService.getRecentSearchHistory(token);
    }
    // 검색 결과 - 장소
    @GetMapping(value = "/place", params = {"searchWord"})
    public ResponseEntity<HashMap<String, List<SearchPlaceDto>>> searchPlaces(@RequestHeader("Authorization") String token, @RequestParam String searchWord) {
        return searchService.searchPlaces(token, searchWord);
    }

    // 검색 결과 - 사용자
    @GetMapping(value = "/users", params = {"searchWord"})
    public ResponseEntity<HashMap<String, List<SearchUserDto>>> searchUsers(@RequestHeader("Authorization") String token, @RequestParam String searchWord) {
        return searchService.searchUsers(token, searchWord);
    }

    // 검색 선택 - 장소
    @PostMapping(value = "/place")
    public ResponseEntity<String> selectPlaceSearch(@RequestHeader("Authorization") String token, @RequestBody HashMap<String, Long> place) {
        return searchService.selectPlaceSearch(token, place.get("placeSeq"));
    }
    // 검색 선택 - 사용자
    @PostMapping(value = "/users")
    public ResponseEntity<String> selectUserSearch(@RequestHeader("Authorization") String token, @RequestBody HashMap<String, String> user) {
        return searchService.selectUserSearch(token, user.get("nickname"));
    }
    // 최근 검색어 전체 삭제
    @DeleteMapping("")
    public ResponseEntity<String> deleteAllSearchHistory(@RequestHeader("Authorization") String token) {
        return searchService.deleteAllSearchHistory(token);
    }

    // 특정 최근 검색어 삭제
    @DeleteMapping("/{history_seq}")
    public ResponseEntity<SearchHistoriesRes> deleteOneSearchHistory(@RequestHeader("Authorization") String token, @PathVariable Long history_seq) {
        return searchService.deleteOneSearchHistory(token, history_seq);
    }
}
