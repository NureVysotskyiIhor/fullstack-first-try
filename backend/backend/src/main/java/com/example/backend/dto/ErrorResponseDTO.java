package com.example.backend.dto;

import java.time.LocalDateTime;

public class ErrorResponseDTO {
    private Integer status;
    private String code;
    private String message;
    private String details;
    private LocalDateTime timestamp;

    public ErrorResponseDTO(Integer status, String code, String message, String details) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.details = details;
        this.timestamp = LocalDateTime.now();
    }

    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}