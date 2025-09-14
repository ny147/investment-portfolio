"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "./Card";

const COLORS = ["#60A5FA", "#34D399", "#F472B6", "#FBBF24", "#A78BFA"];

export default function AssetAllocation({ holdings }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ Group holdings by type
  const dataMap = holdings.reduce((acc, h) => {
    acc[h.type] = (acc[h.type] || 0) + h.value;
    return acc;
  }, {});
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);

  const data = holdings.map((h) => ({
    name: h.name,
    value: h.value,
    percentage: ((h.value / totalValue) * 100).toFixed(2),
  }));

  const onSliceEnter = (_, index) => setActiveIndex(index);
  const onSliceLeave = () => setActiveIndex(null);

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
            label
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
            onMouseLeave={onSliceLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                onMouseEnter={(e) => onSliceEnter(e, index)}
                // ✅ Slightly enlarge active slice
                style={{
                  transform:
                    activeIndex === index ? "scale(1.05)" : "scale(1)",
                  transformOrigin: "center",
                  transition: "transform 0.2s ease-out",
                  cursor: "pointer",
                }}
              />
            ))}
          </Pie>
          <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
