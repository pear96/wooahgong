package com.bigdata.wooahgong.user.dtos.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommonLoginRes {
    private String nickname;
    private String profileImg;
    private String token;

    @Builder
    public CommonLoginRes(String token, String nickname, String profileImg){
        this.token = token;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }
}
