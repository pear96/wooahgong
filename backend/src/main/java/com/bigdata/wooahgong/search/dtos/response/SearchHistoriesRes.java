package com.bigdata.wooahgong.search.dtos.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class SearchHistoriesRes {
    private List<SearchHistoryDto> recentSearches;

    @Builder
    public SearchHistoriesRes(List<SearchHistoryDto> recentSearches) {
        this.recentSearches = recentSearches;
    }
}
