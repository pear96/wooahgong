package com.bigdata.wooahgong.user.entity;

import com.bigdata.wooahgong.comment.entity.Comment;
import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentLike extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentLikeSeq;
    // 외래키 설정
    @ManyToOne
    @JoinColumn(name = "user_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private User user;
    @ManyToOne
    @JoinColumn(name = "comment_seq") // 외래키 매핑
    @JsonBackReference // 순환 참조 방어
    private Comment comment;
}
