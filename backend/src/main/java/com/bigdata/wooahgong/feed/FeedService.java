package com.bigdata.wooahgong.feed;

import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.feed.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;

    // 일단 모든 피드들 리턴
    // 추후에 어떤 정렬 방식을 이용할지 결정.
    public List<Feed> getFeedsTrend(String token) {
        List<Feed> feedList = feedRepository.findAll();
        return feedList;
    }
}
