package com.example.backend.exception;

import com.example.backend.dto.ErrorResponseDTO;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PaintingAlreadySoldException.class)
    public ResponseEntity<ErrorResponseDTO> handlePaintingAlreadySold(PaintingAlreadySoldException ex) {
        ErrorResponseDTO error = new ErrorResponseDTO(
                409,
                "PAINTING_ALREADY_SOLD",
                "You cannot sell a painting twice",
                "The painting with ID " + ex.getPaintingId() + " has already been sold. " + ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(InvalidDataAccessResourceUsageException.class)
    public ResponseEntity<ErrorResponseDTO> handleDatabaseError(InvalidDataAccessResourceUsageException ex) {
        String message = ex.getMessage();

        if (message != null && message.contains("You cannot buy a painting that is already sold")) {
            ErrorResponseDTO error = new ErrorResponseDTO(
                    409,
                    "PAINTING_ALREADY_SOLD",
                    "You cannot sell a painting twice",
                    "Database error: " + ex.getCause().getMessage()
            );
            return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
        }

        ErrorResponseDTO error = new ErrorResponseDTO(
                500,
                "DATABASE_ERROR",
                "Database error",
                ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGenericException(Exception ex) {
        ErrorResponseDTO error = new ErrorResponseDTO(
                500,
                "INTERNAL_SERVER_ERROR",
                "Internal server error",
                ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
