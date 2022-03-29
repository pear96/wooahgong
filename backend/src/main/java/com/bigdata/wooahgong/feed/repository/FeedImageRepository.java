package com.bigdata.wooahgong.feed.repository;

import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.feed.entity.FeedImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedImageRepository extends JpaRepository<FeedImage, Long> {
    Optional<List<FeedImage>> findAllByFeed(Feed feed);
}
