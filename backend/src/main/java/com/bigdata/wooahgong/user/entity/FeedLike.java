package com.bigdata.wooahgong.user.entity;

import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FeedLike extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedLikeSeq;
    // 외래키 설정
    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name = "fk_feed_like_user_user_seq"), name = "user_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private User user;
    @ManyToOne
    @JoinColumn(name = "feed_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private Feed feed;
}
