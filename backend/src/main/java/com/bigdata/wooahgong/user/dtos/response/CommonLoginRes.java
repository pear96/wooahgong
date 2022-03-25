package com.bigdata.wooahgong.user.dtos.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommonLoginRes {
    private String nickname;
    private String profileImg;
    private String token;
    private boolean provider;

    @Builder
    public CommonLoginRes(String token, String nickname, String profileImg, boolean provider) {
        this.token = token;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.provider = provider;
    }
}
