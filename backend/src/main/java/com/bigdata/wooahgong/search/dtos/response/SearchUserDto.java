package com.bigdata.wooahgong.search.dtos.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchUserDto {
    private final String nickname;
    private final String imageUrl;

    @Builder
    public SearchUserDto(String nickname, String imageUrl) {
        this.nickname = nickname;
        this.imageUrl = imageUrl;
    }
}
