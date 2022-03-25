package com.bigdata.wooahgong.user.entity;

import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
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

    @JsonManagedReference // 순환 참조 방어
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Feed> feeds = new ArrayList<>();
    @JsonManagedReference // 순환 참조 방어
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserMood> userMoods = new ArrayList<>();

    public void resetPwd(String password){
        this.password = password;
    }
    public void setAuthCode(String authCode) { this.authCode = authCode;}

//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private List<History> histories = new ArrayList<>();
}

