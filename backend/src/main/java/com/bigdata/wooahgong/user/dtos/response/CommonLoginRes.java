package com.bigdata.wooahgong.user.dtos.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommonLoginRes {
    private String nickname;
    private String profileImg;
    private String accessToken;

    @Builder
    public CommonLoginRes(String accessToken, String nickname, String profileImg){
        this.accessToken = accessToken;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }
}
