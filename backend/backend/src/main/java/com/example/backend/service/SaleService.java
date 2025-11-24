package com.example.backend.service;

import com.example.backend.entity.Sale;
import com.example.backend.entity.Painting;
import com.example.backend.repository.SaleRepository;
import com.example.backend.repository.PaintingRepository;
import com.example.backend.exception.PaintingAlreadySoldException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.Optional;

/**
 * Сервис для управления продажами
 * Содержит бизнес-логику и обработку ошибок
 */
@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private PaintingRepository paintingRepository;

    /**
     * Добавить новую продажу с проверкой ошибок от триггера БД
     */
    @Transactional
    public Sale createSale(Sale sale) {
        // Проверяем что картина существует
        Optional<Painting> painting = paintingRepository.findById(sale.getPainting().getPaintingId());

        if (painting.isEmpty()) {
            throw new PaintingAlreadySoldException(
                    "Картина с ID " + sale.getPainting().getPaintingId() + " не найдена",
                    "PAINTING_NOT_FOUND",
                    sale.getPainting().getPaintingId()
            );
        }

        try {
            // Устанавливаем дату продажи если не указана
            if (sale.getSaleDate() == null) {
                sale.setSaleDate(LocalDate.now());
            }

            // Устанавливаем цену продажи если не указана
            if (sale.getSalePrice() == null) {
                sale.setSalePrice(painting.get().getPrice());
            }

            // Пытаемся сохранить продажу
            // Триггер БД будет проверять что картина не продана
            return saleRepository.save(sale);

        } catch (InvalidDataAccessResourceUsageException ex) {
            // Ловим ошибку от триггера
            String errorMessage = ex.getMessage();

            if (errorMessage != null && errorMessage.contains("You cannot buy a painting that is already sold")) {
                throw new PaintingAlreadySoldException(
                        "Эта картина уже была продана ранее",
                        "PAINTING_ALREADY_SOLD",
                        sale.getPainting().getPaintingId()
                );
            }

            // Если это другая ошибка — пробрасываем дальше
            throw ex;
        }
    }
}