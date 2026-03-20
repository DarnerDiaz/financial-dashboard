"use client";

import { PriceHistory } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";
import { formatDate, formatCurrency } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ChartProps {
  data: PriceHistory[];
  loading?: boolean;
}

export function PriceChart({ data, loading }: ChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  const strokeColor = isDark ? "#3b82f6" : "#2563eb";
  const gridColor = isDark ? "#475569" : "#e2e8f0";
  const textColor = isDark ? "#cbd5e1" : "#475569";

  if (loading) {
    return (
      <div className="h-80 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Cargando datos...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-80 bg-gray-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    ...item,
    date: formatDate(item.date),
  }));

  return (
    <div className="w-full h-80 bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
            opacity={0.5}
          />
          <XAxis
            dataKey="date"
            stroke={textColor}
            style={{ fontSize: "12px" }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke={textColor}
            style={{ fontSize: "12px" }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1e293b" : "#ffffff",
              border: `1px solid ${isDark ? "#475569" : "#e2e8f0"}`,
              borderRadius: "8px",
              color: textColor,
            }}
            formatter={(value: any) => formatCurrency(Number(value))}
            labelStyle={{ color: textColor }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={strokeColor}
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
