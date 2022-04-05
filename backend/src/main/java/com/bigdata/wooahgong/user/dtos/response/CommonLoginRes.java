package com.bigdata.wooahgong.user.dtos.response;

import lombok.Builder;
import lombok.Data;

@Data
public class CommonLoginRes {
    private String nickname;
    private String profileImg;
    private String token;
    private boolean provider;
    private boolean gender;

    @Builder
    public CommonLoginRes(String nickname, String profileImg, String token, boolean provider, boolean gender) {
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.token = token;
        this.provider = provider;
        this.gender = gender;
    }

}
