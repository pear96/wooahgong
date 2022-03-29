package com.bigdata.wooahgong.user.dtos.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class GetMyInfoRes {
    private String userId;
    private String nickname;
    private String profileImg;
    private String mbti;
    private List<String> moods;
    private boolean provider;

    @Builder
    public GetMyInfoRes(String userId, String nickname, String profileImg, String mbti, List<String> moods, boolean provider) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.mbti = mbti;
        this.moods = moods;
        this.provider = provider;
    }
}
