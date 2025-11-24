package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Data for adding a new gallery")
public class AddGalleryDTO {

    @Schema(description = "Gallery name", example = "Digital Art Gallery")
    private String name;

    @Schema(description = "Gallery location/address", example = "Kyiv, Podil district")
    private String location;

    @Schema(description = "Gallery Information", example = "Современное цифровое искусство")
    private String info;

    public AddGalleryDTO() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getInfo() { return info; }
    public void setInfo(String info) { this.info = info; }
}