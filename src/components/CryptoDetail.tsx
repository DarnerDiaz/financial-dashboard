"use client";

import { CryptoData } from "@/types";
import { formatCurrency, formatPercent, getPercentageColor, formatShortCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp, Target, Activity } from "lucide-react";
import Image from "next/image";

interface CryptoDetailProps {
  crypto: CryptoData | null;
  loading?: boolean;
}

export function CryptoDetail({ crypto, loading }: CryptoDetailProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 dark:bg-slate-700 rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (!crypto) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        Selecciona una criptomoneda para ver detalles
      </div>
    );
  }

  const isPositive = crypto.price_change_percentage_24h >= 0;
  const percentColor = getPercentageColor(crypto.price_change_percentage_24h);

  const stats = [
    {
      label: "Precio Actual",
      value: formatCurrency(crypto.current_price),
      icon: Activity,
    },
    {
      label: "Cambio 24h",
      value: formatPercent(crypto.price_change_percentage_24h),
      color: percentColor,
      icon: isPositive ? TrendingUp : TrendingDown,
    },
    {
      label: "Máximo 24h",
      value: formatCurrency(crypto.high_24h),
      icon: TrendingUp,
    },
    {
      label: "Mínimo 24h",
      value: formatCurrency(crypto.low_24h),
      icon: TrendingDown,
    },
    {
      label: "Capitalización",
      value: formatShortCurrency(crypto.market_cap || 0),
      icon: Target,
    },
    {
      label: "Vol. 24h",
      value: formatShortCurrency(crypto.total_volume || 0),
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-slate-700">
        <Image
          src={crypto.image}
          alt={crypto.name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {crypto.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {crypto.symbol} • Ranking #{crypto.market_cap_rank}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const color = stat.color || "text-gray-600 dark:text-gray-300";

          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className={`text-xl font-bold ${color}`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <h3 className="text-sm font-semibold mb-3">Estadísticas Extremas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-80">Máximo Histórico (ATH)</p>
            <p className="text-lg font-bold">{formatCurrency(crypto.ath)}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Mínimo Histórico (ATL)</p>
            <p className="text-lg font-bold">{formatCurrency(crypto.atl)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
