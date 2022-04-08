package com.bigdata.wooahgong.place.entity;

import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import com.bigdata.wooahgong.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PlaceWish extends BaseTimeEntity {
    // 사용자가 찜한 장소 관계 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeWishSeq;

    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne
    @JoinColumn(name = "place_seq")
    private Place place;

    @Builder
    public PlaceWish(User user, Place place) {
        this.user = user;
        this.place = place;
    }
}
