package com.bigdata.wooahgong.place.repository;

import com.bigdata.wooahgong.place.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByPlaceSeq(long placeSeq);
    List<Place> findPlacesByAddressContainingOrNameContaining(String address, String name);
    List<Place> findByAddress(String address);
    Optional<Place> findByLatitudeAndLongitude(double lat, double lng);
    @Query(
            value = "SELECT * FROM place WHERE ST_Distance_Sphere(POINT(:userLongitude, :userLatitude), POINT(longitude, latitude)) < :radius",
            nativeQuery = true
    )
    List<Place> ifUserAndPlaceIn(double userLongitude, double userLatitude, int radius);

    @Query(
            value = "SELECT * FROM Place WHERE MBRContains(ST_GeomFromText('POLYGON((:minLng :minLat, :minLng :maxLat, :maxLng :maxLat, :maxLng :minLat, :minLng :minLat))'), location);",
            nativeQuery = true
    )
    List<Place> findPlaceinMBR(double minLat, double maxLat, double minLng, double maxLng);

    @Query("SELECT f.thumbnail FROM Feed f WHERE f.placeSeq = :placeSeq")
    List<String> findThumbnailByPlaceSeq(Long placeSeq, Pageable pageable);
}
