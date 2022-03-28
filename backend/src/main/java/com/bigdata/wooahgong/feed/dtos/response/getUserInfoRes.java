package com.bigdata.wooahgong.feed.dtos.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class getUserInfoRes {
    private boolean isOwner;
    private int feedsCnt;
    private int likedCnt;
    private int bookmarkedCnt;
    List<String> moods;

    @Builder
    public getUserInfoRes(boolean isOwner, int feedsCnt, int likedCnt, int bookmarkedCnt, List<String> moods) {
        this.isOwner = isOwner;
        this.feedsCnt = feedsCnt;
        this.likedCnt = likedCnt;
        this.bookmarkedCnt = bookmarkedCnt;
        this.moods = moods;
    }
}
