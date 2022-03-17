package com.bigdata.wooahgong.email.repository;

import com.bigdata.wooahgong.email.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email, Long> {
}
