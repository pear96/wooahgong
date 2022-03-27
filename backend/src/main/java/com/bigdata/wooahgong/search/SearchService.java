package com.bigdata.wooahgong.search;

import com.bigdata.wooahgong.search.dtos.response.SearchHistoriesRes;
import com.bigdata.wooahgong.search.dtos.response.SearchHistoryDto;
import com.bigdata.wooahgong.user.UserService;
import com.bigdata.wooahgong.user.entity.SearchHistory;
import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.repository.SearchHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final UserService userService;
    private final SearchHistoryRepository searchHistoryRepository;

    public ResponseEntity<SearchHistoriesRes> getRecentSearchHistory(String token) {
        // token이 유효한지 검사한다.
        User user = userService.getUserByToken(token);
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
}
