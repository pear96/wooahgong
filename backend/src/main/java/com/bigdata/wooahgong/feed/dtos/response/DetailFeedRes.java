package com.bigdata.wooahgong.feed.dtos.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class DetailFeedRes {
    private Long feedSeq;
    private Long userSeq;
    private String userImageUrl;
    private String nickname;
    private Long placeSeq;
    private String placeName;
    private String address;
    private List<String> images;
    private String content;
    private boolean amIOwner;
    private Double ratings;
    private String createDate;
    private List<String> moods;
    private boolean amILike;
    private int likesCnt;
    private int commentsCnt;

    @Builder

    public DetailFeedRes(Long feedSeq, Long userSeq, String userImageUrl, String nickname, Long placeSeq, String placeName, String address, List<String> images, String content, boolean amIOwner, Double ratings, String createDate, List<String> moods, boolean amILike, int likesCnt, int commentsCnt) {
        this.feedSeq = feedSeq;
        this.userSeq = userSeq;
        this.userImageUrl = userImageUrl;
        this.nickname = nickname;
        this.placeSeq = placeSeq;
        this.placeName = placeName;
        this.address = address;
        this.images = images;
        this.content = content;
        this.amIOwner = amIOwner;
        this.ratings = ratings;
        this.createDate = createDate;
        this.moods = moods;
        this.amILike = amILike;
        this.likesCnt = likesCnt;
        this.commentsCnt = commentsCnt;
    }
}
