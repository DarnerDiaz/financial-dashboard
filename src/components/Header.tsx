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
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                ₿ Crypto Dashboard
              </h1>
              <p className="text-sm text-gray-300 mt-2 font-semibold">
                Real-time cryptocurrency analytics
              </p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
              ₿ Crypto Dashboard
            </h1>
            <p className="text-sm text-gray-300 mt-2 font-semibold">
              Real-time analytics & portfolio management
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Price Display */}
            <div className="hidden md:flex gap-6 px-6 border-l border-white/10 backdrop-blur-sm">
              {btcPrice && (
                <div className="text-right group">
                  <p className="text-xs text-cyan-300 font-bold tracking-wider">BTC</p>
                  <p className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors duration-200">
                    ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
              )}
              {ethPrice && (
                <div className="text-right group">
                  <p className="text-xs text-blue-300 font-bold tracking-wider">ETH</p>
                  <p className="text-lg font-black text-white group-hover:text-blue-300 transition-colors duration-200">
                    ${ethPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-yellow-300 transition-all duration-300 border border-white/10 hover:border-yellow-400/30 backdrop-blur-sm hover:shadow-lg hover:shadow-yellow-500/20"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
