"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    // Fetch BTC and ETH prices for header
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        );
        const data = await res.json();
        setBtcPrice(data.bitcoin.usd);
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      }
    };
    fetchPrices();
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                ₿ Crypto Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Real-time cryptocurrency analytics
              </p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              ₿ Crypto Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Real-time cryptocurrency analytics & portfolio management
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Price Display */}
            <div className="hidden md:flex gap-4 px-4 border-l border-gray-200 dark:border-slate-700">
              {btcPrice && (
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">BTC</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
              )}
              {ethPrice && (
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">ETH</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    ${ethPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
