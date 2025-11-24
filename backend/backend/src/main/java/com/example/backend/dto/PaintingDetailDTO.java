package com.example.backend.dto;

import com.example.backend.entity.Painting;
import com.example.backend.entity.Sale;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class PaintingDetailDTO {

    private Integer paintingId;
    private String title;
    private BigDecimal price;
    private Integer yearCreated;
    private String style;
    private String description;

    private ArtistInfo artist;

    private GalleryInfo gallery;

    private List<SaleInfo> sales;

    public PaintingDetailDTO(Painting painting) {
        this.paintingId = painting.getPaintingId();
        this.title = painting.getTitle();
        this.price = painting.getPrice();
        this.yearCreated = painting.getYearCreated();
        this.style = painting.getStyle();
        this.description = painting.getDescription();

        if (painting.getArtist() != null) {
            this.artist = new ArtistInfo(painting.getArtist());
        }

        if (painting.getGallery() != null) {
            this.gallery = new GalleryInfo(painting.getGallery());
        }

        if (painting.getSales() != null && !painting.getSales().isEmpty()) {
            this.sales = painting.getSales().stream()
                    .map(SaleInfo::new)
                    .collect(Collectors.toList());
        }
    }

    public Integer getPaintingId() { return paintingId; }
    public void setPaintingId(Integer paintingId) { this.paintingId = paintingId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getYearCreated() { return yearCreated; }
    public void setYearCreated(Integer yearCreated) { this.yearCreated = yearCreated; }

    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public ArtistInfo getArtist() { return artist; }
    public void setArtist(ArtistInfo artist) { this.artist = artist; }

    public GalleryInfo getGallery() { return gallery; }
    public void setGallery(GalleryInfo gallery) { this.gallery = gallery; }

    public List<SaleInfo> getSales() { return sales; }
    public void setSales(List<SaleInfo> sales) { this.sales = sales; }

    public static class ArtistInfo {
        private Integer artistId;
        private String name;
        private String address;
        private String information;

        public ArtistInfo(com.example.backend.entity.Artist artist) {
            this.artistId = artist.getArtistId();
            this.name = artist.getName();
            this.address = artist.getAddress();
            this.information = artist.getInformation();
        }

        public Integer getArtistId() { return artistId; }
        public String getName() { return name; }
        public String getAddress() { return address; }
        public String getInformation() { return information; }
    }

    public static class GalleryInfo {
        private Integer galleryId;
        private String name;
        private String location;
        private String info;

        public GalleryInfo(com.example.backend.entity.Gallery gallery) {
            this.galleryId = gallery.getGalleryId();
            this.name = gallery.getName();
            this.location = gallery.getLocation();
            this.info = gallery.getInfo();
        }

        public Integer getGalleryId() { return galleryId; }
        public String getName() { return name; }
        public String getLocation() { return location; }
        public String getInfo() { return info; }
    }

    public static class SaleInfo {
        private Integer saleId;
        private Integer invoiceNumber;
        private LocalDate saleDate;
        private BigDecimal salePrice;

        public SaleInfo(Sale sale) {
            this.saleId = sale.getSaleId();
            this.invoiceNumber = sale.getInvoiceNumber();
            this.saleDate = sale.getSaleDate();
            this.salePrice = sale.getSalePrice();
        }

        public Integer getSaleId() { return saleId; }
        public Integer getInvoiceNumber() { return invoiceNumber; }
        public LocalDate getSaleDate() { return saleDate; }
        public BigDecimal getSalePrice() { return salePrice; }
    }
}