"use client";

import { useState } from "react";
import { portfolio } from "@/lib/mockData";
import Card from "./Card";

export default function HoldingsList() {
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [holdings, setHoldings] = useState(portfolio.holdings);

  const sortedHoldings = [...holdings].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Card title="Holdings">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => requestSort("quantity")}
              >
                Quantity {sortConfig.key === "quantity" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => requestSort("value")}
              >
                Value {sortConfig.key === "value" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((holding, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2">{holding.name}</td>
                <td className="px-4 py-2">{holding.quantity}</td>
                <td className="px-4 py-2">${holding.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
