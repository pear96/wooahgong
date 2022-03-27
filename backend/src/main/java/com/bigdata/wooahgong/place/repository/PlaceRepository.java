package com.bigdata.wooahgong.place.repository;

import com.bigdata.wooahgong.place.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByPlaceSeq(Long placeSeq);
    Optional<Place> findByName(String name);
}
