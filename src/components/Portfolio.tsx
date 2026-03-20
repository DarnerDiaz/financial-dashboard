"use client";

import { useDashboardStore } from "@/store/dashboardStore";
import { formatCurrency, formatPercent, getPercentageColor, calculatePnL } from "@/lib/utils";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import Image from "next/image";

export function Portfolio() {
  const { portfolio, cryptoList, addToPortfolio, removeFromPortfolio } = useDashboardStore();
  const [showForm, setShowForm] = useState(false);

  const portfolioValue = portfolio.reduce((total, asset) => {
    const crypto = cryptoList.find((c) => c.id === asset.id);
    return total + (crypto?.current_price || 0) * asset.amount;
  }, 0);

  const totalInvested = portfolio.reduce((total, asset) => {
    return total + asset.average_price * asset.amount;
  }, 0);

  const totalPnL = portfolioValue - totalInvested;
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Mi Portafolio
        </h3>
        <Button
          size="sm"
          variant="primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={16} className="mr-1" />
          Agregar
        </Button>
      </div>

      {showForm && <PortfolioForm onClose={() => setShowForm(false)} />}

      {portfolio.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No tienes activos en tu portafolio
          </p>
          <Button size="sm" variant="secondary" onClick={() => setShowForm(true)}>
            Agregar primer activo
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Valor Total
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(portfolioValue)}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Invertido
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalInvested)}
              </p>
            </div>

            <div className={`bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700`}>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                P&L
              </p>
              <p className={`text-2xl font-bold ${getPercentageColor(totalPnLPercent)}`}>
                {formatPercent(totalPnLPercent)}
              </p>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {portfolio.map((asset) => {
              const crypto = cryptoList.find((c) => c.id === asset.id);
              if (!crypto) return null;

              const pnl = calculatePnL(
                crypto.current_price,
                asset.average_price,
                asset.amount
              );

              return (
                <div
                  key={asset.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {asset.name} ({asset.symbol})
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {asset.amount.toFixed(4)} {asset.symbol}
                      </p>
                    </div>
                  </div>

                  <div className="text-right mr-3">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(crypto.current_price * asset.amount)}
                    </p>
                    <p className={`text-xs ${getPercentageColor(pnl.percentage)}`}>
                      {pnl.profit > 0 ? "+" : ""}
                      {formatCurrency(pnl.profit)} ({formatPercent(pnl.percentage)})
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromPortfolio(asset.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

interface PortfolioFormProps {
  onClose: () => void;
}

function PortfolioForm({ onClose }: PortfolioFormProps) {
  const { cryptoList, addToPortfolio } = useDashboardStore();
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedId || !amount || !price) {
      alert("Completa todos los campos");
      return;
    }

    const crypto = cryptoList.find((c) => c.id === selectedId);
    if (!crypto) return;

    addToPortfolio({
      id: selectedId,
      name: crypto.name,
      symbol: crypto.symbol,
      amount: parseFloat(amount),
      average_price: parseFloat(price),
    });

    setSelectedId("");
    setAmount("");
    setPrice("");
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-50 dark:bg-slate-750 rounded-lg border border-gray-200 dark:border-slate-700 space-y-3"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Criptomoneda
        </label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
        >
          <option value="">Selecciona una moneda</option>
          {cryptoList.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cantidad
          </label>
          <input
            type="number"
            step="0.00000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            placeholder="0.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Precio Promedio
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            placeholder="31000"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="primary" className="flex-1">
          Agregar
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
