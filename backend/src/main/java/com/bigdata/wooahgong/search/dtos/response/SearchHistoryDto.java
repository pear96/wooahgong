package com.bigdata.wooahgong.search.dtos.response;


import lombok.Builder;


public class SearchHistoryDto {
    private Long historySeq;
    private String type;
    private String searchWord;
    private String imageUrl;

    @Builder
    public SearchHistoryDto(Long historySeq, String type, String searchWord, String imageUrl) {
        this.historySeq = historySeq;
        this.type = type;
        this.searchWord = searchWord;
        this.imageUrl = imageUrl;
    }
}
