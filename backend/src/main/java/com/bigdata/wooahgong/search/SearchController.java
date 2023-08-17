package com.bigdata.wooahgong.search;

import com.bigdata.wooahgong.search.dtos.response.SearchHistoriesRes;
import com.bigdata.wooahgong.search.dtos.response.SearchPlaceDto;
import com.bigdata.wooahgong.search.dtos.response.SearchUserDto;
import io.swagger.v3.oas.annotations.Operation;
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

    @GetMapping("")
    @Operation(summary = "검색창 진입 -> 최근 검색어 전달",
            description = "1. token으로 사용자 조회\n" +
                    "2. 사용자의 검색 기록 조회\n" +
                    "2-1. 검색 기록이 5개가 넘으면 오래된 것 부터 지움\n" +
                    "3. 사용자의 검색 기록 재조회")
    public ResponseEntity<SearchHistoriesRes> searchHistory(@RequestHeader("Authorization") String token) {
        return searchService.getRecentSearchHistory(token);
    }

    @GetMapping(value = "/place", params = {"searchWord"})
    @Operation(summary = "검색 결과 - 장소",
            description = "1. 이름 또는 주소에 특정 단어를 포함하는 모든 장소를 조회한다")
    public ResponseEntity<HashMap<String, List<SearchPlaceDto>>> searchPlaces(@RequestHeader("Authorization") String token, @RequestParam String searchWord) {
        return searchService.searchPlaces(token, searchWord);
    }

    @GetMapping(value = "/users", params = {"searchWord"})
    @Operation(summary = "검색 결과 - 사용자",
            description = "1. 닉네임에 특정 단어를 포함하는 모든 사용자를 조회한다")
    public ResponseEntity<HashMap<String, List<SearchUserDto>>> searchUsers(@RequestHeader("Authorization") String token, @RequestParam String searchWord) {
        return searchService.searchUsers(token, searchWord);
    }

    @PostMapping(value = "/place")
    @Operation(summary = "검색 선택 - 장소",
            description = "1. token으로 사용자 조회\n" +
                    "2. 장소PK로 장소 조회\n" +
                    "3. 사용자와 장소로 검색 기록을 찾는다\n" +
                    "4. 검색한 적 없는 곳이라면 검색 기록 저장함")
    public ResponseEntity<String> selectPlaceSearch(@RequestHeader("Authorization") String token, @RequestBody HashMap<String, Long> place) {
        return searchService.selectPlaceSearch(token, place.get("placeSeq"));
    }

    @PostMapping(value = "/users")
    @Operation(summary = "검색 선택 - 사용자",
            description = "1. token으로 사용자 조회\n" +
                    "2. 닉네임으로 사용자 조회\n" +
                    "3. 사용자와 장소로 검색 기록을 찾는다\n" +
                    "4. 검색한 적 없는 곳이라면 검색 기록 저장함")
    public ResponseEntity<String> selectUserSearch(@RequestHeader("Authorization") String token, @RequestBody HashMap<String, String> user) {
        return searchService.selectUserSearch(token, user.get("nickname"));
    }

    // 최근 검색어 전체 삭제
    @DeleteMapping("")
    @Operation(summary = "검색 기록 전부 삭제",
            description = "1. token으로 사용자 조회\n" +
                    "2. 사용자로 검색 기록 삭제")
    public ResponseEntity<String> deleteAllSearchHistory(@RequestHeader("Authorization") String token) {
        return searchService.deleteAllSearchHistory(token);
    }

    // 특정 최근 검색어 삭제
    @DeleteMapping("/{history_seq}")
    @Operation(summary = "검색 기록 하나 삭제",
            description = "1. token으로 사용자 조회\n" +
                    "2. 사용자로 검색 기록 전부 조회\n" +
                    "3. 하나씩 보면서 목표한 검색 기록의 PK를 찾았을 때, 사용자의 검색기록이 맞는지 확인함\n" +
                    "4. 맞으면 삭제")
    public ResponseEntity<SearchHistoriesRes> deleteOneSearchHistory(@RequestHeader("Authorization") String token, @PathVariable Long history_seq) {
        return searchService.deleteOneSearchHistory(token, history_seq);
    }
}
