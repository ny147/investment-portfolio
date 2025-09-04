import TotalValue from "@/components/TotalValue";
import PerformanceChart from "@/components/PerformanceChart";
import AssetAllocation from "@/components/AssetAllocation";
import HoldingsList from "@/components/HoldingsList";
import ConnectedAccounts from "@/components/ConnectedAccounts";

export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <TotalValue />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <AssetAllocation />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <HoldingsList />
        </div>
        <div>
          <ConnectedAccounts />
        </div>
      </div>
    </div>
  );
}
