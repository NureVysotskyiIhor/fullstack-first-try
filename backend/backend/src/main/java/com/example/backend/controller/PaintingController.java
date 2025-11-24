package com.example.backend.controller;

import com.example.backend.entity.Painting;
import com.example.backend.repository.PaintingRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.dto.PaintingDetailDTO;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/paintings")
@Tag(name = "Paintings", description = "API for managing paintings")
public class PaintingController {

    @Autowired
    private PaintingRepository paintingRepository;

    @Operation(summary = "Get full painting information with artist, gallery and sales details")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Painting found with complete information",
                    content = {@Content(mediaType = "application/json", schema = @Schema(implementation = PaintingDetailDTO.class))}),
            @ApiResponse(responseCode = "404", description = "Painting not found")
    })
    @GetMapping("/{id}/details")
    public ResponseEntity<PaintingDetailDTO> getPaintingDetails(
            @Parameter(description = "Painting ID", example = "1")
            @PathVariable Integer id) {

        Optional<Painting> painting = paintingRepository.findById(id);

        if (painting.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        PaintingDetailDTO dto = new PaintingDetailDTO(painting.get());
        return ResponseEntity.ok(dto);
    }

    @Operation(summary = "Get all paintings")
    @ApiResponse(responseCode = "200", description = "List of all paintings")
    @GetMapping
    public ResponseEntity<List<Painting>> getAllPaintings() {
        List<Painting> paintings = paintingRepository.findAll();
        return ResponseEntity.ok(paintings);
    }

    @Operation(summary = "Get painting by ID with artist, gallery and sales information")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Painting found"),
            @ApiResponse(responseCode = "404", description = "Painting not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Painting> getPaintingById(@PathVariable Integer id) {
        Optional<Painting> painting = paintingRepository.findById(id);

        if (painting.isPresent()) {
            return ResponseEntity.ok(painting.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Get all paintings by specific artist")
    @GetMapping("/by-artist/{artistId}")
    public ResponseEntity<List<Painting>> getPaintingsByArtist(@PathVariable Integer artistId) {
        List<Painting> paintings = paintingRepository.findAll().stream()
                .filter(p -> p.getArtist() != null && p.getArtist().getArtistId().equals(artistId))
                .toList();
        return ResponseEntity.ok(paintings);
    }

    @Operation(summary = "Get all paintings by specific gallery")
    @GetMapping("/by-gallery/{galleryId}")
    public ResponseEntity<List<Painting>> getPaintingsByGallery(@PathVariable Integer galleryId) {
        List<Painting> paintings = paintingRepository.findAll().stream()
                .filter(p -> p.getGallery() != null && p.getGallery().getGalleryId().equals(galleryId))
                .toList();
        return ResponseEntity.ok(paintings);
    }

    @Operation(summary = "Create new painting")
    @ApiResponse(responseCode = "200", description = "Painting created")
    @PostMapping
    public ResponseEntity<Painting> createPainting(@RequestBody Painting painting) {
        Painting savedPainting = paintingRepository.save(painting);
        return ResponseEntity.ok(savedPainting);
    }

    @Operation(summary = "Update painting information")
    @PutMapping("/{id}")
    public ResponseEntity<Painting> updatePainting(@PathVariable Integer id, @RequestBody Painting paintingDetails) {
        Optional<Painting> painting = paintingRepository.findById(id);

        if (painting.isPresent()) {
            Painting p = painting.get();
            p.setTitle(paintingDetails.getTitle());
            p.setPrice(paintingDetails.getPrice());
            p.setYearCreated(paintingDetails.getYearCreated());
            p.setStyle(paintingDetails.getStyle());
            p.setDescription(paintingDetails.getDescription());
            p.setArtist(paintingDetails.getArtist());
            p.setGallery(paintingDetails.getGallery());

            Painting updatedPainting = paintingRepository.save(p);
            return ResponseEntity.ok(updatedPainting);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Delete painting")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePainting(@PathVariable Integer id) {
        Optional<Painting> painting = paintingRepository.findById(id);

        if (painting.isPresent()) {
            paintingRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}