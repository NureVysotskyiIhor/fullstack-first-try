// src/store/painting.store.ts
import { create } from 'zustand';
import { apiRequest, ApiError } from '@/api/client';
import type {
  Painting,
  Artist,
  Gallery,
  Sale,
  PaintingResponse,
  PaintingStatistic,
  PaintingsStatisticsResponse,
  SalesResponse,
  StatisticsCountResponse,
  StatisticsRegionResponse,
} from '@/types/painting.types';

interface PaintingState {
  paintings: Painting[];
  currentPainting: Painting | null;
  paintingsByPrice: PaintingStatistic[];
  sales: Sale[];
  galleries: Gallery[];
  artists: Artist[];

  isLoading: boolean;
  isFetching: boolean;
  error: string | null;

  maxPrice: number | null;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  region: string | null;

  fetchPaintingById: (id: number) => Promise<void>; //+1
  clearCurrentPainting: () => void;

  getPaintingsCheaperThan: (maxPrice: number) => Promise<number | null>; //+3
  getPaintingsByPrice: (maxPrice: number) => Promise<void>; //+3
  getArtistsByRegion: (region: string) => Promise<number | null>; //+3

  registerSale: (paintingId: number, invoiceNumber: number, salePrice: number) => Promise<boolean>; //+4
  fetchSales: () => Promise<void>;

  markExpensive: (galleryId: number) => Promise<boolean>; //+2
  addGallery: (name: string, location: string, info: string) => Promise<boolean>; //+2

  clearError: () => void;
  reset: () => void;
  setPaintingFilter: (maxPrice: number) => void;
  setRegionFilter: (region: string) => void;

  deletePainting: (id: number) => Promise<boolean>;
}

export const usePaintingStore = create<PaintingState>((set) => ({
  paintings: [],
  currentPainting: null,
  paintingsByPrice: [],
  sales: [],
  galleries: [],
  artists: [],
  isLoading: false,
  isFetching: false,
  error: null,
  maxPrice: null,
  currentPage: 1,
  pageSize: 20,
  totalCount: 0,
  region: null,

  fetchPaintingById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiRequest<PaintingResponse>(`/api/paintings/${id}`);
      set({
        isLoading: false,
        currentPainting: response,
      });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to fetch painting';
      set({ isLoading: false, error: message });
      throw error;
    }
  },

  clearCurrentPainting: () => {
    set({ currentPainting: null });
  },

  getPaintingsCheaperThan: async (maxPrice: number) => {
    set({ isFetching: true, error: null });
    try {
      const response = await apiRequest<StatisticsCountResponse>(
        `/api/statistics/paintings-cheaper-than?maxPrice=${maxPrice}`
      );
      set({ isFetching: false });
      return response.count;
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Failed to fetch paintings count';
      set({ isFetching: false, error: message });
      return null;
    }
  },

  getPaintingsByPrice: async (maxPrice: number) => {
    set({ isLoading: true, error: null, maxPrice });
    try {
      const response = await apiRequest<PaintingsStatisticsResponse>(
        `/api/statistics/paintings-by-price?maxPrice=${maxPrice}`
      );
      set({
        isLoading: false,
        paintingsByPrice: response.paintings,
        totalCount: response.totalCount,
      });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Failed to fetch paintings by price';
      set({ isLoading: false, error: message });
      throw error;
    }
  },

  getArtistsByRegion: async (region: string) => {
    set({ isFetching: true, error: null, region });
    try {
      const response = await apiRequest<StatisticsRegionResponse>(
        `/api/statistics/artists-by-region?region=${encodeURIComponent(region)}`
      );
      set({ isFetching: false });
      return response.count;
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Failed to fetch artists count';
      set({ isFetching: false, error: message });
      return null;
    }
  },

  registerSale: async (paintingId: number, invoiceNumber: number, salePrice: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiRequest<SalesResponse>('/api/sales', {
        method: 'POST',
        body: JSON.stringify({
          paintingId,
          invoiceNumber,
          salePrice,
        }),
      });

      set(state => ({
        isLoading: false,
        sales: [...state.sales, response],
      }));
      return true;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to register sale';
      set({ isLoading: false, error: message });
      return false;
    }
  },

  fetchSales: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiRequest<SalesResponse[]>('/api/sales');
      set({
        isLoading: false,
        sales: response,
      });
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to fetch sales';
      set({ isLoading: false, error: message });
      throw error;
    }
  },

  markExpensive: async (galleryId: number) => {
    set({ isLoading: true, error: null });
    try {
      await apiRequest('/api/procedures/mark-expensive', {
        method: 'POST',
        body: JSON.stringify({ galleryId }),
      });
      set({ isLoading: false });
      return true;
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Failed to mark paintings';
      set({ isLoading: false, error: message });
      return false;
    }
  },

  addGallery: async (name: string, location: string, info: string) => {
    set({ isLoading: true, error: null });
    try {
      await apiRequest('/api/procedures/add-gallery', {
        method: 'POST',
        body: JSON.stringify({ name, location, info }),
      });
      set({ isLoading: false });
      return true;
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Failed to add gallery';
      set({ isLoading: false, error: message });
      return false;
    }
  },

  clearError: () => set({ error: null }),

  reset: () =>
    set({
      paintings: [],
      currentPainting: null,
      paintingsByPrice: [],
      sales: [],
      galleries: [],
      artists: [],
      isLoading: false,
      isFetching: false,
      error: null,
      maxPrice: null,
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      region: null,
    }),

  setPaintingFilter: (maxPrice: number) => {
    set({ maxPrice });
  },

  setRegionFilter: (region: string) => {
    set({ region });
  },

  deletePainting: async (id: number) => {
  set({ isLoading: true, error: null });
  try {
    await apiRequest(`/api/paintings/${id}`, {
      method: 'DELETE',
    });
    set({ isLoading: false, currentPainting: null });
    return true;
  } catch (error) {
    const message =
      error instanceof ApiError ? error.message : 'Failed to delete painting';
    set({ isLoading: false, error: message });
    return false;
  }
},
}));