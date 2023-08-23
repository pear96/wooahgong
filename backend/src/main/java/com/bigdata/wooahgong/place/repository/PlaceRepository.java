package com.bigdata.wooahgong.place.repository;

import com.bigdata.wooahgong.place.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByPlaceSeq(long placeSeq);
    List<Place> findPlacesByAddressContainingOrNameContaining(String address, String name);
    List<Place> findByAddress(String address);
    Optional<Place> findByLatitudeAndLongitude(double lat, double lng);
    @Query(
            value = "SELECT * FROM place WHERE ST_Distance_Sphere(POINT(?1, ?2), POINT(longitude, latitude)) < ?3",
            nativeQuery = true
    )
    List<Place> ifUserAndPlaceIn(double userLongitude, double userLatitude, int radius);
}
