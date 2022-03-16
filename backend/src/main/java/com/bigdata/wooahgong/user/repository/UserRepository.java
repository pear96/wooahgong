package com.bigdata.wooahgong.user.repository;

import com.bigdata.wooahgong.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
