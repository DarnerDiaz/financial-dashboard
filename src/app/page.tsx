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
    <div className="min-h-screen bg-black">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Hero Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group relative rounded-2xl overflow-hidden p-8 text-white shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-white blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 size={24} />
                <span className="text-sm font-semibold">Live Data</span>
              </div>
              <p className="text-sm opacity-90">Real-time market information</p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden p-8 text-white shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-white blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Zap size={24} />
                <span className="text-sm font-semibold">Fast</span>
              </div>
              <p className="text-sm opacity-90">Instant price updates</p>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden p-8 text-white shadow-2xl hover:shadow-violet-500/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-500 group-hover:from-violet-500 group-hover:to-indigo-400 transition-all duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-white blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={24} />
                <span className="text-sm font-semibold">Reliable</span>
              </div>
              <p className="text-sm opacity-90">Powered by CoinGecko API</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8">
          {/* Top 15 Cryptocurrencies - Full Width */}
          <div>
            <div className="backdrop-blur-xl bg-white/10 dark:bg-slate-800/30 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl overflow-hidden">
              <div className="px-8 py-8 border-b border-white/10 dark:border-slate-700/30 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 dark:from-blue-200 dark:via-cyan-200 dark:to-white bg-clip-text text-transparent">
                      Top 15 Cryptocurrencies
                    </h2>
                    <p className="text-sm text-gray-400 dark:text-gray-300 mt-2 font-medium">
                      Market leaders ranked by market cap
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <CryptoList />
              </div>
            </div>
          </div>

          {/* Lado derecho: Detalles y Información */}
          <div>
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
