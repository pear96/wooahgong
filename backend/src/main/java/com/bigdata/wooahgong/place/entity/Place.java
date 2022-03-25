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
public class Place extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeSeq;

    @ManyToOne
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @Builder
    public Place(User user, String name, String address, Double latitude, Double longitude) {
        this.user = user;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
