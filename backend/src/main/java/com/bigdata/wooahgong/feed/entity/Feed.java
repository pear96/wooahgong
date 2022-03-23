package com.bigdata.wooahgong.feed.entity;

import com.bigdata.wooahgong.comment.entity.Comment;
import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import com.bigdata.wooahgong.user.entity.FeedLike;
import com.bigdata.wooahgong.user.entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Feed extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedSeq;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private Double ratings;
    @Column(nullable = false)
    private String thumbnail;
    // 외래키 설정
    @ManyToOne
    @JoinColumn(name = "user_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private User user;
    // 중간 테이블 설정
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FeedLike> feedLikes = new ArrayList<>();
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FeedImage> feedImages = new ArrayList<>();
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Comment> comments = new ArrayList<>();
}
