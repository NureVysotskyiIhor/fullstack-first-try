package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.backend.entity.Painting;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;


@Repository
public interface StatisticsRepository extends JpaRepository<Painting, Integer> {
    @Query(value = "SELECT dbo.fn_CountCheaperThan(:maxPrice)", nativeQuery = true)
    Integer countPaintingsCheaperThan(@Param("maxPrice") BigDecimal maxPrice);

    @Query(value = "SELECT dbo.fn_CountArtistsByRegion(:region)", nativeQuery = true)
    Integer countArtistsByRegion(@Param("region") String region);

    @Query(value = "SELECT * FROM dbo.fn_GetPaintingsByPrice(:maxPrice)", nativeQuery = true)
    List<Map<String, Object>> getPaintingsByPrice(@Param("maxPrice") BigDecimal maxPrice);
}