"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { CryptoCard } from "@/components/CryptoCard";
import { AlertCircle, RefreshCw } from "lucide-react";

export function CryptoList() {
  const { cryptoList, selectedCrypto, loading, error, fetchTopCryptos, selectCrypto } =
    useDashboardStore();

  useEffect(() => {
    fetchTopCryptos();
  }, [fetchTopCryptos]);

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 flex gap-3">
        <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" />
        <div>
          <p className="font-semibold text-red-900 dark:text-red-200">
            Error al cargar
          </p>
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={fetchTopCryptos}
            className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="h-28 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cryptoList.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          crypto={crypto}
          isSelected={selectedCrypto?.id === crypto.id}
          onClick={() => selectCrypto(crypto)}
        />
      ))}
    </div>
  );
}
