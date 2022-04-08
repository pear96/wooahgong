package com.bigdata.wooahgong.feed.entity;

import com.bigdata.wooahgong.common.util.BaseTimeEntity;
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
public class FeedImage extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedImageSeq;
    @Column(nullable = false, length = 500)
    private String imageUrl;
    // 외래키 설정
    @ManyToOne
    @JoinColumn(name = "feed_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private Feed feed;

}
