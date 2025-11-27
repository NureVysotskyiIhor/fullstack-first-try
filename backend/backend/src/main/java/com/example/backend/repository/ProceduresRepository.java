package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.entity.Gallery;
import java.math.BigDecimal;

@Repository
public interface ProceduresRepository extends JpaRepository<Gallery, Integer> {
    @Modifying
    @Transactional
    @Query(value = "EXEC usp_AddGallery @Name = :name, @Location = :location, @Info = :info", nativeQuery = true)
    void addGallery(
            @Param("name") String name,
            @Param("location") String location,
            @Param("info") String info
    );

    @Modifying
    @Transactional
    @Query(value = "EXEC usp_RegisterSale @PaintingID = :paintingId, @InvoiceNumber = :invoiceNumber, @SalePrice = :salePrice", nativeQuery = true)
    void registerSale(
            @Param("paintingId") Integer paintingId,
            @Param("invoiceNumber") Integer invoiceNumber,
            @Param("salePrice") BigDecimal salePrice
    );

    @Modifying
    @Transactional
    @Query(value = "EXEC usp_MarkPaintingsByPrice @GalleryID = :galleryId", nativeQuery = true)
    void markPaintingsByPrice(
            @Param("galleryId") Integer galleryId
    );
}