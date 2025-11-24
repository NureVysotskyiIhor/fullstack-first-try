package com.example.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public class CountResultDTO {
    private Integer count;
    private String message;

    public CountResultDTO(Integer count, String message) {
        this.count = count;
        this.message = message;
    }

    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}