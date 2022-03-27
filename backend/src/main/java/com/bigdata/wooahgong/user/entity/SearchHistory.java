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

    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String searchWord;

    @Column(nullable = false)
    private String imageUrl;

    @Builder
    public SearchHistory(User user, String type, String searchWord, String imageUrl) {
        this.user = user;
        this.type = type;
        this.searchWord = searchWord;
        this.imageUrl = imageUrl;
    }
}
