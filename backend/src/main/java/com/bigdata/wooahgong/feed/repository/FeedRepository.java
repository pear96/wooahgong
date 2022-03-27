package com.bigdata.wooahgong.feed.repository;

import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.place.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FeedRepository extends JpaRepository<Feed, Long> {
    List<Feed> findByPlace(Place place);
    Optional<Feed> findByFeedSeq(Long feedSeq);
}
