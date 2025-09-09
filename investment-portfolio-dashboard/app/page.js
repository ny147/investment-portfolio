"use client";

import { useState, useEffect, useMemo } from "react";
import { portfolio } from "@/lib/mockData";

import TotalValue from "@/components/TotalValue";
import PerformanceChart from "@/components/PerformanceChart";
import AssetAllocation from "@/components/AssetAllocation";
import HoldingsList from "@/components/HoldingsList";
import ConnectedAccounts from "@/components/ConnectedAccounts";

export default function DashboardPage() {
  const [holdings, setHoldings] = useState(portfolio.holdings);
  const [performanceData, setPerformanceData] = useState([]);

  // ✅ Generate chart data only on client
  useEffect(() => {
    const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);

    const history = [];
    let current = totalValue * 0.9;
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const dailyReturn = 1 + (Math.random() * 0.04 - 0.02);
      current = current * dailyReturn;

      history.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: Math.round(current),
      });
    }
    setPerformanceData(history);
  }, [holdings]);

  // ✅ Portfolio return % over last 30 days
  const portfolioReturn = useMemo(() => {
    if (performanceData.length === 0) return 0;
    return (
      ((performanceData[performanceData.length - 1].value - performanceData[0].value) /
        performanceData[0].value) *
      100
    );
  }, [performanceData]);

  // ✅ Distribute return across holdings
  const updatedHoldings = useMemo(() => {
    return holdings.map((h) => {
      const randomFactor = 0.8 + Math.random() * 0.4;
      const changePct = (portfolioReturn * randomFactor).toFixed(2);
      return { ...h, changePct: Number(changePct) };
    });
  }, [holdings, portfolioReturn]);

  return (
    <div className="grid gap-8">
      <TotalValue holdings={updatedHoldings} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
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
