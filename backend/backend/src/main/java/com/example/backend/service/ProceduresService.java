package com.example.backend.service;

import com.example.backend.repository.ProceduresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

/**
 * Сервис для вызова хранимых процедур
 */
@Service
public class ProceduresService {

    @Autowired
    private ProceduresRepository proceduresRepository;

    /**
     * Добавить новую галерею через процедуру
     */
    @Transactional
    public void addGallery(String name, String location, String info) {
        try {
            proceduresRepository.addGallery(name, location, info);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка при добавлении галереи: " + e.getMessage(), e);
        }
    }

    /**
     * Зарегистрировать продажу картины через процедуру
     */
    @Transactional
    public void registerSale(Integer paintingId, Integer invoiceNumber, BigDecimal salePrice) {
        try {
            proceduresRepository.registerSale(paintingId, invoiceNumber, salePrice);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка при регистрации продажи: " + e.getMessage(), e);
        }
    }

    /**
     * Отметить дорогие и дешёвые картины в галерее
     */
    @Transactional
    public void markPaintingsByPrice(Integer galleryId) {
        try {
            proceduresRepository.markPaintingsByPrice(galleryId);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка при маркировке картин: " + e.getMessage(), e);
        }
    }
}