package com.bigdata.wooahgong.user.repository;

import com.bigdata.wooahgong.user.entity.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
}
