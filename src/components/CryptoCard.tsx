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
      className={`rounded-2xl p-4 cursor-pointer transition-all duration-300 backdrop-blur-md border group overflow-hidden relative ${
        isSelected
          ? "border-cyan-400/60 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 dark:from-blue-500/30 dark:via-purple-500/20 dark:to-cyan-500/30 shadow-2xl shadow-cyan-500/30 dark:shadow-cyan-600/20"
          : "border-white/20 dark:border-slate-700/50 bg-white/5 dark:bg-slate-800/20 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-600/10 hover:bg-white/10 dark:hover:bg-slate-800/30"
      }`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300 bg-gradient-to-br from-cyan-500 to-blue-500 blur-3xl -z-10"></div>
      <div className="relative z-10">
      {/* Header con nombre e icono */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Image
            src={crypto.image}
            alt={crypto.name}
            width={32}
            height={32}
            className="rounded-full shadow-lg shadow-cyan-500/20"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-bold text-white truncate">
              {crypto.name}
            </h3>
            <p className="text-xs text-gray-300 font-medium">
              {crypto.symbol.toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Precio principal */}
      <div className="mb-2">
        <p className="text-lg font-bold bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
          {formatCurrency(crypto.current_price)}
        </p>
      </div>

      {/* Cambio 24h con mejor visualización */}
      <div className="flex items-center justify-between mb-3 p-2 rounded-lg bg-white/5 dark:bg-white/10 backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp size={14} className="text-emerald-400" />
          ) : (
            <TrendingDown size={14} className="text-red-400" />
          )}
          <span className={`text-xs font-semibold ${percentColor}`}>
            {formatPercent(crypto.price_change_percentage_24h)}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-1 mb-2 text-xs">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
          <p className="text-gray-400 text-xs mb-0.5">Cap</p>
          <p className="text-white font-semibold text-xs">
            {crypto.market_cap 
              ? `$${(crypto.market_cap / 1e9).toFixed(0)}B`
              : "N/A"
            }
          </p>
        </div>
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
          <p className="text-gray-400 text-xs mb-0.5">Vol</p>
          <p className="text-white font-semibold text-xs">
            ${(crypto.total_volume / 1e9).toFixed(1)}B
          </p>
        </div>
      </div>

      {/* Range info */}
      <div className="grid grid-cols-2 gap-1 text-xs mb-2">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
          <p className="text-gray-400 text-xs mb-0.5">Low</p>
          <p className="text-white font-semibold text-xs">
            {formatCurrency(crypto.low_24h)}
          </p>
        </div>
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
          <p className="text-gray-400 text-xs mb-0.5">High</p>
          <p className="text-white font-semibold text-xs">
            {formatCurrency(crypto.high_24h)}
          </p>
        </div>
      </div>

      {/* Footer - Hover indicator */}
      {!isSelected && (
        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-center gap-1 text-xs text-cyan-300/80 group-hover:text-cyan-300 transition-colors">
          <BarChart3 size={12} />
          <span>Chart</span>
        </div>
      )}
      </div>
    </div>
  );
}
