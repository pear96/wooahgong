package com.bigdata.wooahgong.search.dtos.response;


import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchHistoryDto {
    private final String type;
    private final String searchWord;
    private final String imageUrl;
    private final Long placeSeq;

    @Builder
    public SearchHistoryDto(String type, String searchWord, String imageUrl, Long placeSeq) {
        this.type = type;
        this.searchWord = searchWord;
        this.imageUrl = imageUrl;
        this.placeSeq = placeSeq;
    }
}
