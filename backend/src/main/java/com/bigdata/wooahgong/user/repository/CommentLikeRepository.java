package com.bigdata.wooahgong.user.repository;

import com.bigdata.wooahgong.user.entity.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
}
