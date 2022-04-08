package com.bigdata.wooahgong.feed.entity;

import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import com.bigdata.wooahgong.mood.entity.Mood;
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
public class FeedMood extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedMoodSeq;
    // 외래키 설정
    @ManyToOne
    @JoinColumn(name = "mood_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private Mood mood;
    @ManyToOne
    @JoinColumn(name = "feed_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private Feed feed;
}
