// src/types/painting.types.ts

export interface Artist {
  artistId: number;
  name: string;
  address: string;
  information: string;
  paintings: string[];
}

export interface Gallery {
  galleryId: number;
  name: string;
  location: string;
  info: string;
  paintings: string[];
}

export interface Sale {
  saleId: number;
  invoiceNumber: number;
  saleDate: string; // ISO 8601 date format
  salePrice: number;
  painting: string;
}

export interface Painting {
  paintingId: number;
  title: string;
  price: number;
  yearCreated: number;
  style: string;
  description: string;
  artist: Artist;
  gallery: Gallery;
  sales: Sale[];
}

export interface PaintingResponse extends Painting {}

export interface PaintingStatistic {
  paintingId: number;
  title: string;
  price: number;
  artistName: string;
}

export interface PaintingsStatisticsResponse {
  paintings: PaintingStatistic[];
  totalCount: number;
  maxPrice: number;
}

export interface Sale {
  saleId: number;
  invoiceNumber: number;
  saleDate: string;
  salePrice: number;
  painting: string;
}

export interface SalesResponse {
  saleId: number;
  invoiceNumber: number;
  saleDate: string;
  salePrice: number;
  painting: string;
}

export interface StatisticsCountResponse {
  count: number;
  message: string;
}

export interface StatisticsRegionResponse {
  count: number;
  message: string;
}

// Request types
export interface RegisterSaleRequest {
  paintingId: number;
  invoiceNumber: number;
  salePrice: number;
}

export interface MarkExpensiveRequest {
  galleryId: number;
}

export interface AddGalleryRequest {
  name: string;
  location: string;
  info: string;
}
