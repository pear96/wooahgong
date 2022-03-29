package com.bigdata.wooahgong.feed.dtos.response;

import lombok.Builder;
import lombok.Data;

@Data
public class GetCommentsRes {
    private Long commentSeq;
    private Long userSeq;
    private String userImage;
    private String nickname;
    private String content;
    private boolean amILike;
    private boolean amIOwner;
    private String createDate;
    private int likeCnt;


    @Builder
    public GetCommentsRes(Long commentSeq, Long userSeq, String userImage, String nickname, String content, boolean amILike, boolean amIOwner, String createDate, int likeCnt) {
        this.commentSeq = commentSeq;
        this.userSeq = userSeq;
        this.userImage = userImage;
        this.nickname = nickname;
        this.content = content;
        this.amILike = amILike;
        this.amIOwner = amIOwner;
        this.createDate = createDate;
        this.likeCnt = likeCnt;
    }
}
