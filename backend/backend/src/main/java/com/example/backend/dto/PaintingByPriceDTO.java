package com.example.backend.dto;

import java.math.BigDecimal;

public class PaintingByPriceDTO {
    private Integer paintingId;
    private String title;
    private BigDecimal price;
    private String artistName;

    public PaintingByPriceDTO(Integer paintingId, String title, BigDecimal price, String artistName) {
        this.paintingId = paintingId;
        this.title = title;
        this.price = price;
        this.artistName = artistName;
    }

    public PaintingByPriceDTO(java.util.Map<String, Object> row) {
        this.paintingId = ((Number) row.get("PaintingID")).intValue();
        this.title = (String) row.get("Title");
        this.price = (BigDecimal) row.get("Price");
        this.artistName = (String) row.get("ArtistName");
    }

    public Integer getPaintingId() { return paintingId; }
    public void setPaintingId(Integer paintingId) { this.paintingId = paintingId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getArtistName() { return artistName; }
    public void setArtistName(String artistName) { this.artistName = artistName; }
}