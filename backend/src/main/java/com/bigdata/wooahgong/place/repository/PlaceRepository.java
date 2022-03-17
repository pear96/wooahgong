package com.bigdata.wooahgong.place.repository;

import com.bigdata.wooahgong.place.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long> {
}
