"use client";
import { useState, useEffect, useMemo } from "react";
import TotalValue from "@/components/TotalValue";
import PerformanceChart from "@/components/PerformanceChart";
import AssetAllocation from "@/components/AssetAllocation";
import HoldingsList from "@/components/HoldingsList";
import ConnectedAccounts from "@/components/ConnectedAccounts";
import InvestmentJournal from "@/components/InvestmentJournal";
import { portfolio } from "@/lib/mockData";



export default function DashboardPage() {
  
  const today = new Date().toISOString().slice(0, 10);
  const [journals, setJournals] = useState({
    [today]: { note: "", holdings: portfolio.holdings },
  });
  const [selectedDate, setSelectedDate] = useState(today);

  const currentHoldings = journals[selectedDate]?.holdings || [];

  // Recalculate performanceData based on current holdings
  const [performanceData, setPerformanceData] = useState([]);
  useEffect(() => {
    const totalValue = currentHoldings.reduce((s, h) => s + h.value, 0);
    let history = [];
    let current = totalValue * 0.9;
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dailyReturn = 1 + (Math.random() * 0.04 - 0.02);
      current *= dailyReturn;
      history.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: Math.round(current),
      });
    }
    setPerformanceData(history);
  }, [currentHoldings]);

  const portfolioReturn = useMemo(() => {
    if (performanceData.length === 0) return 0;
    return (
      ((performanceData[performanceData.length - 1].value -
        performanceData[0].value) /
        performanceData[0].value) *
      100
    );
  }, [performanceData]);

  const updatedHoldings = useMemo(
    () =>
      currentHoldings.map((h) => {
        const randomFactor = 0.8 + Math.random() * 0.4;
        const changePct = (portfolioReturn * randomFactor).toFixed(2);
        return { ...h, changePct: Number(changePct) };
      }),
    [currentHoldings, portfolioReturn]
  );

  const updateHoldingsForDate = (newHoldings) => {
    setJournals((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        holdings: newHoldings,
      },
    }));
  };

  const updateNoteForDate = (newNote) => {
    setJournals((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        note: newNote,
        holdings: prev[selectedDate]?.holdings || [],
      },
    }));
  };

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
          <HoldingsList holdings={updatedHoldings} setHoldings={updateHoldingsForDate} />
        </div>
        <div>
          <ConnectedAccounts />
        </div>
      </div>

    </div>
  );
}


