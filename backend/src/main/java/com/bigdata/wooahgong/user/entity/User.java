package com.bigdata.wooahgong.user.entity;

import com.bigdata.wooahgong.comment.entity.Comment;
import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.bigdata.wooahgong.place.entity.Place;
import com.bigdata.wooahgong.place.entity.PlaceWish;
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

    @Column(unique = true)
    private String userId;

    @Column()
    private String password;

    @Column(nullable = false, unique = true)
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

    @JsonManagedReference // 순환 참조 방어
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @JsonManagedReference // 순환 참조 방어
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CommentLike> commentLikes = new ArrayList<>();

    @JsonManagedReference // 순환 참조 방어
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<FeedLike> feedLikes = new ArrayList<>();

//    @JsonManagedReference // 순환 참조 방어
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    private List<Place> places = new ArrayList<>();

    @JsonManagedReference // 순환 참조 방어
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<PlaceWish> placeWishes = new ArrayList<>();

    @JsonManagedReference // 순환 참조 방어
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<SearchHistory> searchHistories = new ArrayList<>();

    public void resetPwd(String password){
        this.password = password;
    }
    public void setAuthCode(String authCode) { this.authCode = authCode;}
    public void setNickname(String nickname) { this.nickname = nickname;}
    public void setMbti(String mbti){this.mbti = mbti;}
    public void setImageUrl(String url){this.imageUrl = url;}
    public String toString() {
        return userSeq + "번] 아이디 : "+ userId + ", 닉네임 : " + nickname + ", 생년월일 : " + birth + ", MBTI : " + mbti;
    }

}

