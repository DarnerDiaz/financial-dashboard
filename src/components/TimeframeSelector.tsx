"use client";

import { Button } from "@/components/ui/Button";
import { useDashboardStore } from "@/store/dashboardStore";

const timeframes = [
  { label: "1D", value: "1d" as const },
  { label: "7D", value: "7d" as const },
  { label: "30D", value: "30d" as const },
  { label: "1Y", value: "1y" as const },
];

export function TimeframeSelector() {
  const { timeframe, setTimeframe } = useDashboardStore();

  return (
    <div className="flex gap-2">
      {timeframes.map(({ label, value }) => (
        <Button
          key={value}
          onClick={() => setTimeframe(value)}
          variant={timeframe === value ? "primary" : "outline"}
          size="sm"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
