package com.example.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public class PaintingsByPriceResultDTO {
    private List<PaintingByPriceDTO> paintings;
    private Integer totalCount;
    private BigDecimal maxPrice;

    public PaintingsByPriceResultDTO(List<PaintingByPriceDTO> paintings, BigDecimal maxPrice) {
        this.paintings = paintings;
        this.totalCount = paintings.size();
        this.maxPrice = maxPrice;
    }

    public List<PaintingByPriceDTO> getPaintings() { return paintings; }
    public void setPaintings(List<PaintingByPriceDTO> paintings) { this.paintings = paintings; }

    public Integer getTotalCount() { return totalCount; }
    public void setTotalCount(Integer totalCount) { this.totalCount = totalCount; }

    public BigDecimal getMaxPrice() { return maxPrice; }
    public void setMaxPrice(BigDecimal maxPrice) { this.maxPrice = maxPrice; }
}