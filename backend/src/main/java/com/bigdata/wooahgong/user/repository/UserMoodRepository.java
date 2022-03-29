package com.bigdata.wooahgong.user.repository;

import com.bigdata.wooahgong.user.entity.User;
import com.bigdata.wooahgong.user.entity.UserMood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserMoodRepository extends JpaRepository<UserMood, Long> {
    List<UserMood> findByUser(User user);
    Optional<UserMood> deleteAllByUser(User user);
}
