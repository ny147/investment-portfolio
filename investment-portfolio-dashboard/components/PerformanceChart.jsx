"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Card from "./Card";
import { SkeletonBox } from "./Skeleton";

export default function PerformanceChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card title="30-Day Performance">
        <div className="flex flex-col items-center justify-center h-[300px] gap-4">
          <SkeletonBox className="w-3/4 h-6" />
          <SkeletonBox className="w-1/2 h-6" />
          <SkeletonBox className="w-full h-40" />
        </div>
      </Card>
    );
  }
  console.log("Rendering PerformanceChart with data:", data);
  return (
    <Card title="30-Day Performance">
  
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
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
