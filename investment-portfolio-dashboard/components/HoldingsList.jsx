"use client";

import { useMemo, useState } from "react";
import Card from "./Card";
export default function HoldingsList({ holdings, setHoldings }) {
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [newAsset, setNewAsset] = useState({ name: "", quantity: "", value: "" });
  const [editingIndex, setEditingIndex] = useState(null);

     if (!holdings || holdings.length === 0) {
    return (
      <Card title="Holdings">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <SkeletonBox key={i} className="w-full h-6" />
          ))}
        </div>
      </Card>
    );
  }
  const sortedHoldings = [...holdings].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.quantity || !newAsset.value) return;
    setHoldings([
      ...holdings,
      {
        name: newAsset.name,
        quantity: Number(newAsset.quantity),
        value: Number(newAsset.value),
        changePct: 0,
      },
    ]);
    setNewAsset({ name: "", quantity: "", value: "" });
  };

  const handleDeleteAsset = (index) => {
    setHoldings(holdings.filter((_, i) => i !== index));
  };

  const handleEditAsset = (index) => {
    setEditingIndex(index);
    setNewAsset(holdings[index]);
  };

  const handleSaveEdit = () => {
    if (!newAsset.name || !newAsset.quantity || !newAsset.value) return;
    const updated = [...holdings];
    updated[editingIndex] = {
      ...updated[editingIndex],
      name: newAsset.name,
      quantity: Number(newAsset.quantity),
      value: Number(newAsset.value),
    };
    setHoldings(updated);
    setEditingIndex(null);
    setNewAsset({ name: "", quantity: "", value: "" });
  };

  const bestPerformer = useMemo(
    () => holdings.reduce((max, h) => (h.changePct > max.changePct ? h : max), holdings[0]),
    [holdings]
  );
  const worstPerformer = useMemo(
    () => holdings.reduce((min, h) => (h.changePct < min.changePct ? h : min), holdings[0]),
    [holdings]
  );

  return (
    <Card title="Holdings">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("name")}>
                Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("quantity")}>
                Quantity {sortConfig.key === "quantity" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("value")}>
                Value {sortConfig.key === "value" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-4 py-2">Actions</th>
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
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEditAsset(idx)}
                    className="px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAsset(idx)}
                    className="px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Asset Name"
          className="flex-1 px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          value={newAsset.name}
          onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="w-28 px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          value={newAsset.quantity}
          onChange={(e) => setNewAsset({ ...newAsset, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Value"
          className="w-32 px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          value={newAsset.value}
          onChange={(e) => setNewAsset({ ...newAsset, value: e.target.value })}
        />
        {editingIndex !== null ? (
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleAddAsset}
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
          >
            Add
          </button>
        )}
      </div>

      {/* Best/Worst Performer */}
      {holdings.length > 0 && (
        <div className="mt-6 flex justify-around text-sm">
          <div className="text-green-600 dark:text-green-400">
            Best Performer: <span className="font-semibold">{bestPerformer.name}</span> ({bestPerformer.changePct}%)
          </div>
          <div className="text-red-600 dark:text-red-400">
            Worst Performer: <span className="font-semibold">{worstPerformer.name}</span> ({worstPerformer.changePct}%)
          </div>
        </div>
      )}
    
    </Card>
  );
}
