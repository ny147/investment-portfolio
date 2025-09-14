"use client";

import { useState, useMemo } from "react";
import { portfolio } from "@/lib/mockData";

import TotalValue from "@/components/TotalValue";
import PerformanceChart from "@/components/PerformanceChart";
import AssetAllocation from "@/components/AssetAllocation";
import HoldingsList from "@/components/HoldingsList";
import ConnectedAccounts from "@/components/ConnectedAccounts";

export default function DashboardPage() {
  const [holdings, setHoldings] = useState(portfolio.holdings);

  // ✅ Total portfolio value
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);

  // ✅ Generate 30-day history
  const performanceData = useMemo(() => {
    const history = [];
    let current = totalValue * 0.9; // assume 10% lower 30 days ago
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const dailyReturn = 1 + (Math.random() * 0.04 - 0.02); // -2% to +2%
      current = current * dailyReturn;

      history.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: Math.round(current),
      });
    }
    return history;
  }, [totalValue]);

  // ✅ Portfolio return % over last 30 days
  const portfolioReturn =
    ((performanceData[performanceData.length - 1].value - performanceData[0].value) /
      performanceData[0].value) *
    100;

  // ✅ Distribute portfolio return across holdings
  const updatedHoldings = useMemo(() => {
    return holdings.map((h) => {
      const randomFactor = 0.8 + Math.random() * 0.4; // 0.8x–1.2x of portfolio return
      const changePct = (portfolioReturn * randomFactor).toFixed(2);
      return { ...h, changePct: Number(changePct) };
    });
  }, [holdings, portfolioReturn]);

  return (
    <div className="grid gap-8">
      <TotalValue holdings={updatedHoldings} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* ✅ pass dynamic history */}
          <PerformanceChart data={performanceData} />
        </div>
        <div>
          <AssetAllocation holdings={updatedHoldings} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <HoldingsList holdings={updatedHoldings} setHoldings={setHoldings} />
        </div>
        <div>
          <ConnectedAccounts />
        </div>
      </div>
    </div>
  );
}
