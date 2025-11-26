package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.entity.Gallery;
import java.math.BigDecimal;

/**
 * Repository для вызова хранимых процедур
 * Используем @Modifying для процедур которые не возвращают result set
 */
@Repository
public interface ProceduresRepository extends JpaRepository<Gallery, Integer> {

    /**
     * Вызывает процедуру usp_AddGallery
     * Добавляет новую галерею в таблицу
     */
    @Modifying
    @Transactional
    @Query(value = "EXEC usp_AddGallery @Name = :name, @Location = :location, @Info = :info", nativeQuery = true)
    void addGallery(
            @Param("name") String name,
            @Param("location") String location,
            @Param("info") String info
    );

    /**
     * Вызывает процедуру usp_RegisterSale
     * Регистрирует продажу картины
     */
    @Modifying
    @Transactional
    @Query(value = "EXEC usp_RegisterSale @PaintingID = :paintingId, @InvoiceNumber = :invoiceNumber, @SalePrice = :salePrice", nativeQuery = true)
    void registerSale(
            @Param("paintingId") Integer paintingId,
            @Param("invoiceNumber") Integer invoiceNumber,
            @Param("salePrice") BigDecimal salePrice
    );

    /**
     * Вызывает процедуру usp_MarkPaintingsByPrice
     * Отмечает дорогие и дешёвые картины в галерее
     */
    @Modifying
    @Transactional
    @Query(value = "EXEC usp_MarkPaintingsByPrice @GalleryID = :galleryId", nativeQuery = true)
    void markPaintingsByPrice(
            @Param("galleryId") Integer galleryId
    );
}