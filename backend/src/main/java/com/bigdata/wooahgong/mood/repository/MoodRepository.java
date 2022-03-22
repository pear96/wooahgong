package com.bigdata.wooahgong.mood.repository;

import com.bigdata.wooahgong.mood.entity.Mood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MoodRepository extends JpaRepository<Mood, Long> {
    Optional<Mood> findByMoodContaining(String mood);
}
