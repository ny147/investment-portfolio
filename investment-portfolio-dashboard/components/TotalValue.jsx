"use client";

import { portfolio } from "@/lib/mockData";

export default function TotalValue() {
  return (
    <div className="text-center mb-8 bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        ${portfolio.totalValue.toLocaleString()}
      </h1>
      <p className="text-gray-500 mt-2 text-lg">Total Portfolio Value</p>
    </div>
  );
}
