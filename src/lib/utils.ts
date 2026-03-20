export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatShortCurrency = (value: number): string => {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  return formatCurrency(value);
};

export const formatPercent = (value: number): string => {
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString("es-ES", {
    month: "short",
    day: "numeric",
  });
};

export const getPercentageColor = (
  value: number
): "text-green-500" | "text-red-500" => {
  return value >= 0 ? "text-green-500" : "text-red-500";
};

export const calculatePortfolioValue = (
  portfolio: any[],
  cryptoList: any[]
): number => {
  return portfolio.reduce((total, asset) => {
    const crypto = cryptoList.find((c) => c.id === asset.id);
    return total + (crypto?.current_price || 0) * asset.amount;
  }, 0);
};

export const calculatePnL = (
  currentPrice: number,
  averagePrice: number,
  amount: number
) => {
  const profit = (currentPrice - averagePrice) * amount;
  const percentage = ((currentPrice - averagePrice) / averagePrice) * 100;
  return { profit, percentage };
};
