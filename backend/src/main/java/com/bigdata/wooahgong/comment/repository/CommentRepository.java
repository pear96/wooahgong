package com.bigdata.wooahgong.comment.repository;

import com.bigdata.wooahgong.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<Comment> findByCommentSeq(Long commentSeq);
}
