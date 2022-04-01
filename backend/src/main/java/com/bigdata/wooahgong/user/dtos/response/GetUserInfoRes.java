package com.bigdata.wooahgong.user.dtos.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class GetUserInfoRes {
    private boolean isOwner;
    private int feedsCnt;
    private int likedCnt;
    private int bookmarkedCnt;
    List<String> moods;
    private String mbti;
    private String image;

    @Builder
    public GetUserInfoRes(boolean isOwner, int feedsCnt, int likedCnt, int bookmarkedCnt, List<String> moods, String mbti, String image) {
        this.isOwner = isOwner;
        this.feedsCnt = feedsCnt;
        this.likedCnt = likedCnt;
        this.bookmarkedCnt = bookmarkedCnt;
        this.moods = moods;
        this.mbti = mbti;
        this.image = image;
    }

}
