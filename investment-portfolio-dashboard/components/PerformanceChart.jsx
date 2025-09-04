"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { portfolio } from "@/lib/mockData";
import Card from "./Card";

export default function PerformanceChart() {
  const [period, setPeriod] = useState("1M");
  const data = portfolio.performance[period];

  return (
    <Card title="Performance">
      {/* Toggle buttons */}
      <div className="flex gap-4 mb-4">
        {["1M", "6M", "1Y"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              period === p
                ? "bg-cyan-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366F1"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
