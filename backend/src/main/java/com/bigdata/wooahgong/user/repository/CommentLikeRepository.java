package com.bigdata.wooahgong.user.repository;

import com.bigdata.wooahgong.comment.entity.Comment;
import com.bigdata.wooahgong.user.entity.CommentLike;
import com.bigdata.wooahgong.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    Optional<CommentLike> findByCommentAndUser(Comment comment, User user);
}
