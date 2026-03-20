"use client";

import { CryptoData } from "@/types";
import { formatCurrency, formatPercent, getPercentageColor } from "@/lib/utils";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import Image from "next/image";

interface CryptoCardProps {
  crypto: CryptoData;
  isSelected?: boolean;
  onClick?: () => void;
}

export function CryptoCard({
  crypto,
  isSelected = false,
  onClick,
}: CryptoCardProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0;
  const percentColor = getPercentageColor(crypto.price_change_percentage_24h);

  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-5 cursor-pointer transition-all duration-300 border ${
        isSelected
          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 shadow-lg shadow-blue-200 dark:shadow-blue-900"
          : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 hover:shadow-lg hover:shadow-gray-300 dark:hover:shadow-slate-900"
      }`}
    >
      {/* Header con nombre e icono */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Image
            src={crypto.image}
            alt={crypto.name}
            width={40}
            height={40}
            className="rounded-full shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {crypto.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {crypto.symbol.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
            #{crypto.market_cap_rank}
          </span>
        </div>
      </div>

      {/* Precio principal */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(crypto.current_price)}
        </p>
      </div>

      {/* Cambio 24h con mejor visualización */}
      <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp size={18} className="text-green-500" />
          ) : (
            <TrendingDown size={18} className="text-red-500" />
          )}
          <span className={`text-sm font-semibold ${percentColor}`}>
            {formatPercent(crypto.price_change_percentage_24h)}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">24h Change</span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="p-2 rounded bg-gray-50 dark:bg-slate-700">
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Market Cap</p>
          <p className="text-gray-900 dark:text-white font-semibold">
            {crypto.market_cap 
              ? `$${(crypto.market_cap / 1e9).toFixed(1)}B`
              : "N/A"
            }
          </p>
        </div>
        <div className="p-2 rounded bg-gray-50 dark:bg-slate-700">
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">24h Volume</p>
          <p className="text-gray-900 dark:text-white font-semibold">
            ${(crypto.total_volume / 1e9).toFixed(1)}B
          </p>
        </div>
      </div>

      {/* Range info */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 rounded bg-gray-50 dark:bg-slate-700">
          <p className="text-gray-500 dark:text-gray-400 mb-1">24h Low</p>
          <p className="text-gray-900 dark:text-white font-semibold">
            {formatCurrency(crypto.low_24h)}
          </p>
        </div>
        <div className="p-2 rounded bg-gray-50 dark:bg-slate-700">
          <p className="text-gray-500 dark:text-gray-400 mb-1">24h High</p>
          <p className="text-gray-900 dark:text-white font-semibold">
            {formatCurrency(crypto.high_24h)}
          </p>
        </div>
      </div>

      {/* Footer - Hover indicator */}
      {!isSelected && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 flex items-center justify-center gap-1 text-xs text-blue-600 dark:text-blue-400">
          <BarChart3 size={14} />
          <span>Click para ver gráfico</span>
        </div>
      )}
    </div>
  );
}
