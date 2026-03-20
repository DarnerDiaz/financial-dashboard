"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { CryptoList } from "@/components/CryptoList";
import { CryptoDetail } from "@/components/CryptoDetail";
import { PriceChart } from "@/components/PriceChart";
import { TimeframeSelector } from "@/components/TimeframeSelector";
import { useDashboardStore } from "@/store/dashboardStore";
import { BarChart3, Zap, Shield } from "lucide-react";

export default function Home() {
  const {
    selectedCrypto,
    priceHistory,
    loading,
    fetchTopCryptos,
    fetchPriceHistory,
  } = useDashboardStore();

  useEffect(() => {
    fetchTopCryptos();
  }, [fetchTopCryptos]);

  useEffect(() => {
    if (selectedCrypto) {
      fetchPriceHistory(selectedCrypto.id, 30);
    }
  }, [selectedCrypto, fetchPriceHistory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Hero Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 size={24} />
              <span className="text-sm font-semibold opacity-90">Live Data</span>
            </div>
            <p className="text-sm opacity-80">Real-time market information</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={24} />
              <span className="text-sm font-semibold opacity-90">Fast</span>
            </div>
            <p className="text-sm opacity-80">Instant price updates</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={24} />
              <span className="text-sm font-semibold opacity-90">Reliable</span>
            </div>
            <p className="text-sm opacity-80">Powered by CoinGecko API</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lado izquierdo: Lista de Criptomonedas */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
              <div className="px-6 py-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Top 15 Cryptocurrencies
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Market leaders ranked by market cap
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <CryptoList />
              </div>
            </div>
          </div>

          {/* Lado derecho: Detalles y Información */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {selectedCrypto ? "Selected Asset" : "Choose a Crypto"}
              </h3>
              <CryptoDetail crypto={selectedCrypto} loading={loading} />
            </section>
          </div>
        </div>

        {/* Sección de Gráfico Grande */}
        {selectedCrypto && (
          <section className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="px-6 py-6 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Price Chart - {selectedCrypto.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Historical price data with multiple timeframes
                </p>
              </div>
              <TimeframeSelector />
            </div>
            <div className="p-6">
              <PriceChart data={priceHistory} loading={loading} />
            </div>
          </section>
        )}

        {/* Enhanced Footer */}
        <footer className="border-t border-gray-200 dark:border-slate-700 pt-12 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <BarChart3 size={18} />
                Analytics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time cryptocurrency dashboard with interactive price charts
                and market analysis tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Zap size={18} />
                Performance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built with Next.js 16 and optimized for speed. Instant data
                updates powered by CoinGecko API.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Shield size={18} />
                Technologies
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                React 19, TypeScript, Tailwind CSS, Recharts, Zustand state
                management, and responsive design.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Data Source
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All cryptocurrency data is sourced from CoinGecko's free API.
                No API key required. Updated every few seconds.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              <span className="font-semibold">Disclaimer:</span> This dashboard
              is for informational purposes only. Always do your own research
              before making investment decisions.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
              © 2026 Financial Dashboard. Built with ❤️ using modern web
              technologies.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
