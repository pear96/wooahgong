package com.bigdata.wooahgong.user.repository;

import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.user.entity.FeedLike;
import com.bigdata.wooahgong.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedLikeRepository extends JpaRepository<FeedLike, Long> {
    Optional<FeedLike> findByFeedAndUser(Feed feed, User user);
}
