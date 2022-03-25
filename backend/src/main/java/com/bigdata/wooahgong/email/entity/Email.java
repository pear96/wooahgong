package com.bigdata.wooahgong.email.entity;

import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Email  extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long authSeq;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String authCode;

    @Column(nullable = false)
    private LocalDateTime timeLimit;

    @Builder
    public Email(String email, String authCode, LocalDateTime timeLimit){
        this.email = email;
        this.authCode = authCode;
        this.timeLimit = timeLimit;
    }
}
