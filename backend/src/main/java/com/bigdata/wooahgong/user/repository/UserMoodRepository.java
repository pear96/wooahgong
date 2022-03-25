package com.bigdata.wooahgong.user.repository;

import com.bigdata.wooahgong.user.entity.UserMood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMoodRepository extends JpaRepository<UserMood, Long> {
}
