package com.bigdata.wooahgong.feed.repository;

import com.bigdata.wooahgong.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedRepository extends JpaRepository<Feed, Long> {
    Optional<Feed> findByFeedSeq(Long feedSeq);
}
