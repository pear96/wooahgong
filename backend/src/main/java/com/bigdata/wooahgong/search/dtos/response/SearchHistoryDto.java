package com.bigdata.wooahgong.search.dtos.response;


import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchHistoryDto {
    private final Long historySeq;
    private final String type;
    private final String searchWord;
    private final String imageUrl;

    @Builder
    public SearchHistoryDto(Long historySeq, String type, String searchWord, String imageUrl) {
        this.historySeq = historySeq;
        this.type = type;
        this.searchWord = searchWord;
        this.imageUrl = imageUrl;
    }
}
