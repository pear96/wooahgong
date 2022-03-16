package com.bigdata.wooahgong.user.entity;

import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq;
    @Column(nullable = false)
    private String userId;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private LocalDate birth;
    @Column(nullable = false)
    private boolean provider;
    @Column
    private String authCode;
    @Column(nullable = false)
    private String imageUrl;
    @Column(nullable = false)
    private boolean gender;
    @Column(nullable = false)
    private String mbti;

    //    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private List<History> histories = new ArrayList<>();
}

