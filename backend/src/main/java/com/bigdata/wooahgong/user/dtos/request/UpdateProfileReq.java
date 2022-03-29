package com.bigdata.wooahgong.user.dtos.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class UpdateProfileReq {
    private String nickname;
    private String mbti;
    private List<String> moods;

    @Builder
    public UpdateProfileReq(String nickname, String mbti, List<String> moods) {
        this.nickname = nickname;
        this.mbti = mbti;
        this.moods = moods;
    }
}
