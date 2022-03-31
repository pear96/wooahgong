package com.bigdata.wooahgong.feed.entity;

import java.util.Comparator;

public class FeedLikesComparator implements Comparator<Feed> {
    @Override
    public int compare(Feed feed1, Feed feed2) {
        int feed1Likes = feed1.getFeedLikes().size();
        int feed2Likes = feed2.getFeedLikes().size();
        if (feed1Likes > feed2Likes) {
            return 1;
        } else if (feed1Likes == feed2Likes) {
            return 0;
        } else {
            return -1;
        }
    }
}
