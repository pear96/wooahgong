package com.bigdata.wooahgong.mood.entity;

import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import com.bigdata.wooahgong.feed.entity.FeedMood;
import com.bigdata.wooahgong.user.entity.UserMood;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Mood extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long moodSeq;
    @Column(nullable = false, length = 30)
    private String mood;

    // 중간 테이블 설정
    @OneToMany(mappedBy = "mood", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<UserMood> userMoods = new ArrayList<>();
    @OneToMany(mappedBy = "mood", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FeedMood> feedMoods = new ArrayList<>();
}
