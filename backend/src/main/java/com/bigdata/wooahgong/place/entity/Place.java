package com.bigdata.wooahgong.place.entity;

import com.bigdata.wooahgong.common.util.BaseTimeEntity;
import com.bigdata.wooahgong.feed.entity.Feed;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Place extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long placeSeq;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    private int feedCnt;

    private long totalScore;

    private double avgScore;


    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @Column(columnDefinition = "POINT SRID 4326", nullable = false)
    private Point location;

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @Builder.Default
    private List<Feed> feeds = new ArrayList<>();

    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    @JsonManagedReference
    @Builder.Default
    private List<PlaceWish> placeWishes = new ArrayList<>();

    @Builder
    public Place(String name, String address, double latitude, double longitude) {
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
