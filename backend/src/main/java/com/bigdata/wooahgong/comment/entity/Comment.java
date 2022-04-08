package com.bigdata.wooahgong.comment.entity;

import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.user.entity.CommentLike;
import com.bigdata.wooahgong.user.entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentSeq;
    @Column(nullable = false)
    private String content;

    // 외래키 설정
    @ManyToOne
    @JoinColumn(name = "user_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private User user;
    @ManyToOne
    @JoinColumn(name = "feed_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private Feed feed;

    // 중간 테이블 설정
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<CommentLike> commentLikes = new ArrayList<>();
}
