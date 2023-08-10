package com.bigdata.wooahgong.feed.repository;

import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.feed.entity.FeedImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FeedImageRepository extends JpaRepository<FeedImage, Long> {
    @Query("select i.imageUrl from FeedImage i where i.feed.feedSeq = :feedSeq")
    Optional<List<String>> findImageUrlAllByFeed(Long feedSeq);
}
