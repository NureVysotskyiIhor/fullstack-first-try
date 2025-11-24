package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.backend.entity.Gallery;
import java.math.BigDecimal;


@Repository
public interface ProceduresRepository extends JpaRepository<Gallery, Integer> {

    @Procedure(name = "usp_AddGallery")
    void addGallery(
            @Param("Name") String name,
            @Param("Location") String location,
            @Param("Info") String info
    );

    @Procedure(name = "usp_RegisterSale")
    void registerSale(
            @Param("PaintingID") Integer paintingId,
            @Param("InvoiceNumber") Integer invoiceNumber,
            @Param("SalePrice") BigDecimal salePrice
    );

    @Procedure(name = "usp_MarkPaintingsByPrice")
    void markPaintingsByPrice(
            @Param("GalleryID") Integer galleryId
    );
}