package com.bigdata.wooahgong.user.entity;

import com.bigdata.wooahgong.feed.entity.Feed;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedLikeSeq;
    // 외래키 설정
    @ManyToOne
    @JoinColumn(name = "user_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private User user;
    @ManyToOne
    @JoinColumn(name = "feed_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private Feed feed;
}
