package com.example.backend.controller;

import com.example.backend.entity.Sale;
import com.example.backend.entity.Painting;
import com.example.backend.service.SaleService;
import com.example.backend.repository.SaleRepository;
import com.example.backend.repository.PaintingRepository;
import com.example.backend.dto.SaleDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/sales")
@Tag(name = "Sales", description = "API for managing sales (with exception handling)")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private PaintingRepository paintingRepository;

    @Operation(summary = "Get all sales")
    @ApiResponse(responseCode = "200", description = "List of all sales")
    @GetMapping
    public ResponseEntity<List<Sale>> getAllSales() {
        List<Sale> sales = saleRepository.findAll();
        return ResponseEntity.ok(sales);
    }

    @Operation(summary = "Add new painting sale")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Sale successfully registered"),
            @ApiResponse(responseCode = "409", description = "Painting already sold (conflict)")
    })
    @PostMapping
    public ResponseEntity<Sale> createSale(@RequestBody SaleDTO saleDTO) {
        Sale sale = new Sale();
        sale.setInvoiceNumber(saleDTO.getInvoiceNumber());
        sale.setSalePrice(saleDTO.getSalePrice());
        sale.setSaleDate(LocalDate.now());

        Painting painting = paintingRepository.findById(saleDTO.getPaintingId())
                .orElseThrow(() -> new RuntimeException("Картина не найдена"));
        sale.setPainting(painting);

        Sale createdSale = saleService.createSale(sale);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSale);
    }
}