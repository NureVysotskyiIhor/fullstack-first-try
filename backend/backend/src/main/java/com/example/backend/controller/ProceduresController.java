package com.example.backend.controller;

import com.example.backend.service.ProceduresService;
import com.example.backend.dto.AddGalleryDTO;
import com.example.backend.dto.RegisterSaleDTO;
import com.example.backend.dto.MarkPaintingsByPriceDTO;
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
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/procedures")
@Tag(name = "Procedures", description = "API for calling database stored procedures")
public class ProceduresController {

    @Autowired
    private ProceduresService proceduresService;

    @Operation(summary = "Procedure: Add new gallery")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Gallery successfully added"),
            @ApiResponse(responseCode = "400", description = "Error in parameters")
    })
    @PostMapping("/add-gallery")
    public ResponseEntity<Map<String, String>> addGallery(@RequestBody AddGalleryDTO dto) {
        try {
            proceduresService.addGallery(dto.getName(), dto.getLocation(), dto.getInfo());

            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Gallery '" + dto.getName() + "' successfully added");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @Operation(summary = "Procedure: Register painting sale")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Sale successfully registered"),
            @ApiResponse(responseCode = "400", description = "Error in parameters")
    })
    @PostMapping("/register-sale")
    public ResponseEntity<Map<String, String>> registerSale(@RequestBody RegisterSaleDTO dto) {
        try {
            proceduresService.registerSale(dto.getPaintingId(), dto.getInvoiceNumber(), dto.getSalePrice());

            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Sale of painting #" + dto.getPaintingId() + " (invoice #" + dto.getInvoiceNumber() + ") successfully registered");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @Operation(summary = "Procedure: Mark expensive and cheap paintings in gallery")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paintings successfully marked"),
            @ApiResponse(responseCode = "400", description = "Error in parameters")
    })
    @PostMapping("/mark-expensive")
    public ResponseEntity<Map<String, String>> markPaintingsByPrice(@RequestBody MarkPaintingsByPriceDTO dto) {
        try {
            proceduresService.markPaintingsByPrice(dto.getGalleryId());

            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Paintings in gallery #" + dto.getGalleryId() + " successfully marked (expensive and cheap added to Description)");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}