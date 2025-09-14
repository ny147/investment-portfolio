"use client";

import { useState } from "react";
import { portfolio } from "@/lib/mockData";

import TotalValue from "@/components/TotalValue";
import PerformanceChart from "@/components/PerformanceChart";
import AssetAllocation from "@/components/AssetAllocation";
import HoldingsList from "@/components/HoldingsList";
import ConnectedAccounts from "@/components/ConnectedAccounts";

export default function DashboardPage() {
  const [holdings, setHoldings] = useState(portfolio.holdings);

  return (
    <div className="grid gap-8">
      <TotalValue holdings={holdings} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* ✅ pass holdings */}
          <PerformanceChart holdings={holdings} />
        </div>
        <div>
          <AssetAllocation holdings={holdings} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <HoldingsList holdings={holdings} setHoldings={setHoldings} />
        </div>
        <div>
          <ConnectedAccounts />
        </div>
      </div>
    </div>
  );
}
