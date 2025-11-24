package com.example.backend.dto;

import java.math.BigDecimal;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data for registering a sale through the procedure")
public class RegisterSaleDTO {

    @Schema(description = "Painting ID", example = "3")
    private Integer paintingId;

    @Schema(description = "Invoice number", example = "2001")
    private Integer invoiceNumber;

    @Schema(description = "Selling price (optional, if NULL then the price from the Paintings table)", example = "35000.00")
    private BigDecimal salePrice;

    public RegisterSaleDTO() {}

    public Integer getPaintingId() { return paintingId; }
    public void setPaintingId(Integer paintingId) { this.paintingId = paintingId; }

    public Integer getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(Integer invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public BigDecimal getSalePrice() { return salePrice; }
    public void setSalePrice(BigDecimal salePrice) { this.salePrice = salePrice; }
}