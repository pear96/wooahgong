package com.bigdata.wooahgong.search;

import com.bigdata.wooahgong.common.exception.CustomException;
import com.bigdata.wooahgong.common.exception.ErrorCode;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.repository.PlaceRepository;
import com.bigdata.wooahgong.search.dtos.response.SearchHistoriesRes;
import com.bigdata.wooahgong.search.dtos.response.SearchHistoryDto;
import com.bigdata.wooahgong.search.dtos.response.SearchPlaceDto;
import com.bigdata.wooahgong.search.dtos.response.SearchUserDto;
import com.bigdata.wooahgong.user.UserService;
import com.bigdata.wooahgong.user.entity.SearchHistory;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.repository.SearchHistoryRepository;
import com.bigdata.wooahgong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final UserService userService;
    private final SearchHistoryRepository searchHistoryRepository;
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    public ResponseEntity<SearchHistoriesRes> getRecentSearchHistory(String token) {
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);

        // 해당 사용자의 최근 검색 결과를 불러온다.
        List<SearchHistory> recentSearchHistories = searchHistoryRepository.findSearchHistoriesByUser(user);
        List<SearchHistoryDto> recentSearchHistoriesExceptUser = new ArrayList<>();

        // 사용자 정보를 제외하고 최신순 정렬
        for (int i = recentSearchHistories.size() - 1; i >= 0; i--) {
            SearchHistory searchHistory = recentSearchHistories.get(i);
            SearchHistoryDto customSearchHistory = SearchHistoryDto.builder()
                    .historySeq(searchHistory.getHistorySeq())
                    .type(searchHistory.getType())
                    .searchWord(searchHistory.getSearchWord())
                    .imageUrl(searchHistory.getImageUrl())
                    .build();
            recentSearchHistoriesExceptUser.add(customSearchHistory);
        }
        SearchHistoriesRes searchHistoriesRes = SearchHistoriesRes.builder()
                .recentSearches(recentSearchHistoriesExceptUser)
                .build();

        return ResponseEntity.status(200).body(searchHistoriesRes);
    }

    public ResponseEntity<HashMap<String, List<SearchPlaceDto>>> searchPlaces(String token, String searchWord) {
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);

        // 검색어가 유효한지 검사한다.
        if("".equals(searchWord)) {
            throw new CustomException(ErrorCode.WRONG_DATA);
        }

        // 검색어가 이름 또는 주소에 포함된 모든 장소를 찾아낸다.
        List<Place> searchedPlaces = placeRepository.findPlacesByAddressOrNameContaining(searchWord);

        // 장소의 시퀀스, 이름, 썸네일만 가져오도록 한다.
        List<SearchPlaceDto> results = new ArrayList<>();

        for (Place place : searchedPlaces) {
            SearchPlaceDto searchedPlace = SearchPlaceDto.builder()
                    .placeSeq(place.getPlaceSeq())
                    .name(place.getName())
                    .imageUrl(place.getFeeds().get(0).getThumbnail())
                    .build();
            results.add(searchedPlace);
        }
        HashMap<String, List<SearchPlaceDto>> data = new HashMap<>();
        data.put("results", results);

        return ResponseEntity.status(200).body(data);
    }

    public ResponseEntity<HashMap<String, List<SearchUserDto>>> searchUsers(String token, String searchWord) {
        // token이 유효한지 검사한다.
        userService.getUserByToken(token);

        // 검색어가 유효한지 검사한다.
        if("".equals(searchWord)) {
            throw new CustomException(ErrorCode.WRONG_DATA);
        }

        // 검색어가 이름 또는 주소에 포함된 모든 장소를 찾아낸다.
        List<User> searchedUsers = userRepository.findUsersByNicknameContaining(searchWord);

        // 장소의 시퀀스, 이름, 썸네일만 가져오도록 한다.
        List<SearchUserDto> results = new ArrayList<>();

        for (User user : searchedUsers) {
            SearchUserDto searchedUser = SearchUserDto.builder()
                    .userSeq(user.getUserSeq())
                    .nickname(user.getNickname())
                    .imageUrl(user.getImageUrl())
                    .build();
            results.add(searchedUser);
        }
        HashMap<String, List<SearchUserDto>> data = new HashMap<>();
        data.put("results", results);

        return ResponseEntity.status(200).body(data);
    }
}
