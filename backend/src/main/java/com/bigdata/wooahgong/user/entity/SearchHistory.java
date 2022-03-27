package com.bigdata.wooahgong.user.entity;


import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SearchHistory extends BaseTimeEntity {
    // 사용자가 검색한 기록 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historySeq;

    // 검색한 사람이 누구인가
    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    // 장소 or 사용자
    @Column(nullable = false)
    private String type;

    // 검색 기록이 뜰 이름
    @Column(nullable = false)
    private String searchWord;

    // 썸네일 이미지
    @Column(nullable = false)
    private String imageUrl;

    // 장소 정보 (못 찾으면 404지 뭐)
    @Column
    private Long placeSeq;


    @Builder
    public SearchHistory(User user, String type, String searchWord, String imageUrl, Long placeSeq) {
        this.user = user;
        this.type = type;
        this.searchWord = searchWord;
        this.imageUrl = imageUrl;
        this.placeSeq = placeSeq;
    }
}
