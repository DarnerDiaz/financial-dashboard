// Tipos para criptomonedas
export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
  market_cap_change_percentage_24h: number;
  ath: number;
  atl: number;
}

export interface PriceHistory {
  date: number;
  price: number;
}

export interface PortfolioAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  average_price: number;
}

export interface DashboardState {
  cryptoList: CryptoData[];
  selectedCrypto: CryptoData | null;
  priceHistory: PriceHistory[];
  portfolio: PortfolioAsset[];
  loading: boolean;
  error: string | null;
  timeframe: "1d" | "7d" | "30d" | "1y";
}
