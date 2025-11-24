package com.example.backend.exception;

public class PaintingAlreadySoldException extends RuntimeException {
    private String errorCode;
    private Integer paintingId;

    public PaintingAlreadySoldException(String message, String errorCode, Integer paintingId) {
        super(message);
        this.errorCode = errorCode;
        this.paintingId = paintingId;
    }

    public String getErrorCode() { return errorCode; }
    public Integer getPaintingId() { return paintingId; }
}