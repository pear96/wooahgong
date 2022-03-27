package com.bigdata.wooahgong.user.repository;

import com.bigdata.wooahgong.user.entity.SearchHistory;
import com.bigdata.wooahgong.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
    List<SearchHistory> findSearchHistoriesByUser(User user);
}
