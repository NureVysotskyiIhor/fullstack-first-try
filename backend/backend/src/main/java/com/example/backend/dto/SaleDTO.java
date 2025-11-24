package com.example.backend.dto;

import java.math.BigDecimal;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data for creating a new sale")
public class SaleDTO {

    @Schema(description = "Invoice number", example = "5001")
    private Integer invoiceNumber;

    @Schema(description = "ID of the painting being sold", example = "2")
    private Integer paintingId;

    @Schema(description = "Selling price", example = "35000.00")
    private BigDecimal salePrice;

    public SaleDTO() {}

    public Integer getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(Integer invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public Integer getPaintingId() { return paintingId; }
    public void setPaintingId(Integer paintingId) { this.paintingId = paintingId; }

    public BigDecimal getSalePrice() { return salePrice; }
    public void setSalePrice(BigDecimal salePrice) { this.salePrice = salePrice; }
}