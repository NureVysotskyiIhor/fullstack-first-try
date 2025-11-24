package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data for labeling expensive/cheap paintings")
public class MarkPaintingsByPriceDTO {

    @Schema(description = "Gallery ID for processing", example = "1")
    private Integer galleryId;

    public MarkPaintingsByPriceDTO() {}

    public Integer getGalleryId() { return galleryId; }
    public void setGalleryId(Integer galleryId) { this.galleryId = galleryId; }
}