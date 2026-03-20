import { CryptoData, PriceHistory } from "@/types";

const api = {
  top: (limit = 10) => `/api/coins?limit=${limit}`,
  coin: (id: string) => `/api/coins/${encodeURIComponent(id)}`,
  history: (id: string, days = 30) => `/api/coins/${encodeURIComponent(id)}/history?days=${days}`,
  global: () => `/api/global`,
};

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch error ${res.status}`);
  return await res.json();
}

export const cryptoService = {
  async getTopCryptos(limit: number = 10): Promise<CryptoData[]> {
    try {
      const data = await safeFetch<CryptoData[]>(api.top(limit));
      return data;
    } catch (error) {
      console.error("Error fetching top cryptos:", error);
      throw new Error("No se pudo obtener datos de criptomonedas");
    }
  },

  async getCryptoData(id: string): Promise<CryptoData> {
    try {
      const data = await safeFetch<CryptoData>(api.coin(id));
      return data;
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      throw new Error("No se pudo obtener datos de la moneda");
    }
  },

  async getPriceHistory(id: string, days: number = 30): Promise<PriceHistory[]> {
    try {
      const data = await safeFetch<PriceHistory[]>(api.history(id, days));
      return data;
    } catch (error) {
      console.error("Error fetching price history:", error);
      throw new Error("No se pudo obtener el historial de precios");
    }
  },

  async getGlobalData(): Promise<any> {
    try {
      const data = await safeFetch<any>(api.global());
      return data;
    } catch (error) {
      console.error("Error fetching global data:", error);
      throw new Error("No se pudo obtener datos globales");
    }
  },
};
