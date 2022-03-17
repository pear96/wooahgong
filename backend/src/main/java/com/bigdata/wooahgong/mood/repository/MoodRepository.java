package com.bigdata.wooahgong.mood.repository;

import com.bigdata.wooahgong.mood.entity.Mood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MoodRepository extends JpaRepository<Mood, Long> {
}
