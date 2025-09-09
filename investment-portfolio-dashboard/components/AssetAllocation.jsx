"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Card from "./Card";

const COLORS = ["#6366F1", "#EC4899", "#10B981", "#F59E0B", "#3B82F6", "#EF4444"];

export default function AssetAllocation({ holdings }) {
  if (!holdings || holdings.length === 0) {
    return (
      <Card title="Asset Allocation">
        <p className="text-center text-gray-500 dark:text-gray-400">No holdings yet</p>
      </Card>
    );
  }

  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);

  const data = holdings.map((h) => ({
    name: h.name,
    value: h.value,
    percentage: ((h.value / totalValue) * 100).toFixed(2),
  }));

  return (
    <Card title="Asset Allocation">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percentage }) => `${name}: ${percentage}%`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
