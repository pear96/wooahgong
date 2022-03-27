package com.bigdata.wooahgong.search.dtos.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchUserDto {
    private final Long userSeq;
    private final String nickname;
    private final String imageUrl;

    @Builder
    public SearchUserDto(Long userSeq, String nickname, String imageUrl) {
        this.userSeq = userSeq;
        this.nickname = nickname;
        this.imageUrl = imageUrl;
    }
}
