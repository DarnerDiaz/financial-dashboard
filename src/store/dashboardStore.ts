"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DashboardState, CryptoData, PriceHistory, PortfolioAsset } from "@/types";
import { cryptoService } from "@/services/crypto";

interface DashboardStore extends DashboardState {
  // Acciones de criptodatos
  fetchTopCryptos: () => Promise<void>;
  selectCrypto: (crypto: CryptoData) => void;
  fetchPriceHistory: (id: string, days: number) => Promise<void>;
  setTimeframe: (timeframe: "1d" | "7d" | "30d" | "1y") => void;

  // Acciones de portafolio
  addToPortfolio: (asset: PortfolioAsset) => void;
  removeFromPortfolio: (id: string) => void;
  updatePortfolioAsset: (id: string, amount: number, price: number) => void;

  // Utilidades
  clearError: () => void;
  reset: () => void;
}

const initialState: DashboardState = {
  cryptoList: [],
  selectedCrypto: null,
  priceHistory: [],
  portfolio: [],
  loading: false,
  error: null,
  timeframe: "30d",
};

export const useDashboardStore = create<DashboardStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchTopCryptos: async () => {
        set({ loading: true, error: null });
        try {
          const cryptos = await cryptoService.getTopCryptos(15);
          set({ cryptoList: cryptos, loading: false });

          // Auto-select primera crypto
          if (cryptos.length > 0 && !get().selectedCrypto) {
            set({ selectedCrypto: cryptos[0] });
            const priceHistory = await cryptoService.getPriceHistory(
              cryptos[0].id,
              30
            );
            set({ priceHistory });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Error al obtener criptodatos",
            loading: false,
          });
        }
      },

      selectCrypto: (crypto: CryptoData) => {
        set({ selectedCrypto: crypto });
      },

      fetchPriceHistory: async (id: string, days: number) => {
        set({ loading: true });
        try {
          const priceHistory = await cryptoService.getPriceHistory(id, days);
          set({ priceHistory, loading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Error al obtener historial de precios",
            loading: false,
          });
        }
      },

      setTimeframe: async (timeframe: "1d" | "7d" | "30d" | "1y") => {
        set({ timeframe });
        const crypto = get().selectedCrypto;
        if (crypto) {
          const daysMap = { "1d": 1, "7d": 7, "30d": 30, "1y": 365 };
          await get().fetchPriceHistory(crypto.id, daysMap[timeframe]);
        }
      },

      addToPortfolio: (asset: PortfolioAsset) => {
        const portfolio = get().portfolio;
        const existing = portfolio.find((p) => p.id === asset.id);

        if (existing) {
          const newAmount =
            existing.amount + asset.amount;
          const newAvgPrice =
            (existing.average_price * existing.amount +
              asset.average_price * asset.amount) /
            newAmount;

          set({
            portfolio: portfolio.map((p) =>
              p.id === asset.id
                ? { ...p, amount: newAmount, average_price: newAvgPrice }
                : p
            ),
          });
        } else {
          set({ portfolio: [...portfolio, asset] });
        }
      },

      removeFromPortfolio: (id: string) => {
        set({
          portfolio: get().portfolio.filter((asset) => asset.id !== id),
        });
      },

      updatePortfolioAsset: (id: string, amount: number, price: number) => {
        set({
          portfolio: get().portfolio.map((asset) =>
            asset.id === id
              ? { ...asset, amount, average_price: price }
              : asset
          ),
        });
      },

      clearError: () => {
        set({ error: null });
      },

      reset: () => {
        set(initialState);
      },
    })
  )
);
