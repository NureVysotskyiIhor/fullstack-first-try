package com.example.backend.controller;

import com.example.backend.dto.CountResultDTO;
import com.example.backend.dto.PaintingByPriceDTO;
import com.example.backend.dto.PaintingsByPriceResultDTO;
import com.example.backend.repository.StatisticsRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/statistics")
@Tag(name = "Statistics", description = "API for getting statistics on paintings and artists")
public class StatisticsController {

    @Autowired
    private StatisticsRepository statisticsRepository;

    @Operation(summary = "Scalar function: Count paintings cheaper than specified price")
    @ApiResponse(responseCode = "200", description = "Number of paintings")
    @GetMapping("/paintings-cheaper-than")
    public ResponseEntity<CountResultDTO> countPaintingsCheaperThan(
            @Parameter(description = "Maximum price", example = "20000")
            @RequestParam BigDecimal maxPrice) {

        Integer count = statisticsRepository.countPaintingsCheaperThan(maxPrice);

        CountResultDTO result = new CountResultDTO(
                count,
                "Found " + count + " paintings cheaper than " + maxPrice
        );

        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Scalar function: Count artists in region")
    @ApiResponse(responseCode = "200", description = "Number of artists")
    @GetMapping("/artists-by-region")
    public ResponseEntity<CountResultDTO> countArtistsByRegion(
            @Parameter(description = "Region name", example = "Kyiv")
            @RequestParam String region) {

        Integer count = statisticsRepository.countArtistsByRegion(region);

        CountResultDTO result = new CountResultDTO(
                count,
                "Found " + count + " artists in region '" + region + "'"
        );

        return ResponseEntity.ok(result);
    }

    @Operation(summary = "Table function: Get list of paintings cheaper than specified price")
    @ApiResponse(responseCode = "200", description = "List of paintings with artist information")
    @GetMapping("/paintings-by-price")
    public ResponseEntity<PaintingsByPriceResultDTO> getPaintingsByPrice(
            @Parameter(description = "Maximum price", example = "20000")
            @RequestParam BigDecimal maxPrice) {

        List<Map<String, Object>> rows = statisticsRepository.getPaintingsByPrice(maxPrice);

        List<PaintingByPriceDTO> paintings = rows.stream()
                .map(PaintingByPriceDTO::new)
                .collect(Collectors.toList());

        PaintingsByPriceResultDTO result = new PaintingsByPriceResultDTO(paintings, maxPrice);

        return ResponseEntity.ok(result);
    }
}