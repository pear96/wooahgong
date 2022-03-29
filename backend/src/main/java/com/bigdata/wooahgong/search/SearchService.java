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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final UserService userService;
    private final SearchHistoryRepository searchHistoryRepository;
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    // 검색창 진입 -> 최근 검색어 전달
    @Transactional
    public ResponseEntity<SearchHistoriesRes> getRecentSearchHistory(String token) {
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);

        // 해당 사용자의 최근 검색 결과를 불러온다.
        List<SearchHistory> allRecentSearchHistories = searchHistoryRepository.findSearchHistoriesByUser(user);

        // 5개가 넘는다면 이전 검색 기록 지우기
        int listSize = allRecentSearchHistories.size();
        if (listSize > 5) {
            for(int i=0; i < listSize-5; i++) {
                Long delHistorySeq = allRecentSearchHistories.get(i).getHistorySeq();
                searchHistoryRepository.deleteByHistorySeq(delHistorySeq);
            }
        }

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
                    .placeSeq(searchHistory.getPlaceSeq())
                    .build();
            recentSearchHistoriesExceptUser.add(customSearchHistory);
        }
        SearchHistoriesRes searchHistoriesRes = SearchHistoriesRes.builder()
                .recentSearches(recentSearchHistoriesExceptUser)
                .build();

        return ResponseEntity.status(200).body(searchHistoriesRes);
    }

    // 검색 결과 - 장소
    public ResponseEntity<HashMap<String, List<SearchPlaceDto>>> searchPlaces(String token, String searchWord) {
        // token이 유효한지 검사한다.
        userService.getUserByToken(token);

        // 검색어가 유효한지 검사한다.
        if("".equals(searchWord)) {
            throw new CustomException(ErrorCode.WRONG_DATA);
        }

        // 검색어가 이름 또는 주소에 포함된 모든 장소를 찾아낸다.
        List<Place> searchedPlaces = placeRepository.findPlacesByAddressContainingOrNameContaining(searchWord, searchWord);

        // 장소의 시퀀스, 이름, 썸네일만 가져오도록 한다.
        List<SearchPlaceDto> results = new ArrayList<>();

        for (Place place : searchedPlaces) {
            SearchPlaceDto searchedPlace = SearchPlaceDto.builder()
                    .placeSeq(place.getPlaceSeq())
                    .address(place.getAddress())
                    .name(place.getName())
                    .imageUrl(place.getFeeds().get(0).getThumbnail())
                    .build();
            results.add(searchedPlace);
        }
        HashMap<String, List<SearchPlaceDto>> data = new HashMap<>();
        data.put("results", results);

        return ResponseEntity.status(200).body(data);
    }

    // 검색 결과 - 사용자
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
                    .nickname(user.getNickname())
                    .imageUrl(user.getImageUrl())
                    .build();
            results.add(searchedUser);
        }
        HashMap<String, List<SearchUserDto>> data = new HashMap<>();
        data.put("results", results);

        return ResponseEntity.status(200).body(data);
    }

    // 검색 선택 - 장소
    public ResponseEntity<String> selectPlaceSearch(String token, Long placeSeq) {
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);
        Optional<Place> foundPlace = placeRepository.findByPlaceSeq(placeSeq);
        if (foundPlace.isEmpty()){
            throw new CustomException(ErrorCode.PLACE_NOT_FOUND);
        }
        Place searchPlace = foundPlace.get();

        // 이미 검색한 적 있다면 pass
        if (searchHistoryRepository.findSearchHistoriesByUserAndPlaceSeq(user, placeSeq).isPresent()) {
            return ResponseEntity.status(200).body("이미 검색 했던 장소");
        }

        SearchHistory searchHistory = SearchHistory.builder()
                .user(user)
                .type("place")
                .searchWord(searchPlace.getName())
                .imageUrl(searchPlace.getFeeds().get(0).getThumbnail())
                .placeSeq(placeSeq)
                .build();

        searchHistoryRepository.save(searchHistory);
        return ResponseEntity.status(200).body("장소 검색");
    }

    // 검색 선택 - 사용자
    public ResponseEntity<String> selectUserSearch(String token, String nickname) {
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);
        Optional<User> foundUser = userRepository.findByNickname(nickname);
        if (foundUser.isEmpty()){
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        User searchUser = foundUser.get();

        // 이미 검색한 적 있다면 pass
        if (searchHistoryRepository.findSearchHistoriesByUserAndSearchWord(user, nickname).isPresent()) {
            return ResponseEntity.status(200).body("이미 검색 했던 유저");
        }

        SearchHistory searchHistory = SearchHistory.builder()
                .user(user)
                .type("users")
                .searchWord(searchUser.getNickname())
                .imageUrl(searchUser.getImageUrl())
                .build();

        searchHistoryRepository.save(searchHistory);
        return ResponseEntity.status(200).body("유저 검색");
    }

    // 검색 결과 전부 지우기
    @Transactional
    public ResponseEntity<String> deleteAllSearchHistory(String token){
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);

        searchHistoryRepository.deleteSearchHistoriesByUser(user);

        return ResponseEntity.status(204).body("검색 기록 전부 제거");
    }

    // 검색 결과 하나만 지우기
    @Transactional
    public ResponseEntity<String> deleteOneSearchHistory(String token, Long historySeq) {
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);

        // 자기 검색결과가 아니라면 지울 수 없어요!
        boolean isMine = false;

        List<SearchHistory> searchHistories = searchHistoryRepository.findSearchHistoriesByUser(user);

        for (SearchHistory searchHistory : searchHistories) {
            if (searchHistory.getHistorySeq().equals(historySeq)) {
                isMine = true;
                break;
            }
        }
        if (!isMine) {
            throw new CustomException(ErrorCode.INVALID_DATA);
        }

        searchHistoryRepository.deleteByHistorySeq(historySeq);

        return ResponseEntity.status(204).body("특정 검색 기록 제거");
    }
}
