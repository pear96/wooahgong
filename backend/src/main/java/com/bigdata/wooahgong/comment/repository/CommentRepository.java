package com.bigdata.wooahgong.comment.repository;

import com.bigdata.wooahgong.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
