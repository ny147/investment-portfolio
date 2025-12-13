"use client";

import { useState } from "react";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";

export default function HoldingsList({ holdings, setHoldings }) {
  const safeHoldings = Array.isArray(holdings) ? holdings : [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    name: "",
    type: "Stocks",
    quantity: "",
    value: "",
    account: "Main Account",
  });

  // ✅ Open Add Modal
  const handleAddClick = () => {
    setEditingIndex(null);
    setForm({
      name: "",
      type: "Stocks",
      quantity: "",
      value: "",
      account: "Main Account",
    });
    setModalOpen(true);
  };

  // ✅ Open Edit Modal
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setForm({ ...safeHoldings[index] });
    setModalOpen(true);
  };

  // ✅ Save Add/Edit
  const handleSave = () => {
    if (!form.name || !form.quantity || !form.value) return;

    const updated = [...safeHoldings];
    const newItem = {
      name: form.name,
      type: form.type,
      quantity: parseFloat(form.quantity),
      value: parseFloat(form.value),
      account: form.account,
    };

    if (editingIndex !== null) {
      updated[editingIndex] = newItem;
    } else {
      updated.push(newItem);
    }

    setHoldings(updated);
    setModalOpen(false);
  };

  // ✅ Delete
  const handleDelete = (index) => {
    const updated = safeHoldings.filter((_, i) => i !== index);
    setHoldings(updated);
  };

  return (
    <Card title="Holdings">
      {/* ✅ Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2">Asset Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Value ($)</th>
              <th className="p-2">Account</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeHoldings.length > 0 ? (
              safeHoldings.map((h, i) => (
                <tr
                  key={i}
                  className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-2">{h.name}</td>
                  <td className="p-2">{h.type}</td>
                  <td className="p-2">{h.quantity}</td>
                  <td className="p-2">${h.value?.toLocaleString()}</td>
                  <td className="p-2">
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                      {h.account}
                    </span>
                  </td>
                  <td className="p-2 text-right space-x-3">
                    <button
                      onClick={() => handleEditClick(i)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 dark:text-gray-400 p-4"
                >
                  No holdings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Add Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Asset
        </button>
      </div>

      {/* ✅ Slide-Up Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h2 className="text-lg font-semibold mb-4">
                {editingIndex !== null ? "Edit Asset" : "Add New Asset"}
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Asset Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border rounded p-2 w-full dark:bg-gray-700"
                />
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="border rounded p-2 w-full dark:bg-gray-700"
                >
                  <option>Stocks</option>
                  <option>Cryptocurrency</option>
                  <option>ETF</option>
                  <option>Cash</option>
                </select>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  className="border rounded p-2 w-full dark:bg-gray-700"
                />
                <input
                  type="number"
                  placeholder="Value ($)"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className="border rounded p-2 w-full dark:bg-gray-700"
                />
                <select
                  value={form.account}
                  onChange={(e) => setForm({ ...form, account: e.target.value })}
                  className="border rounded p-2 w-full dark:bg-gray-700"
                >
                  <option>Main Account</option>
                  <option>Binance</option>
                  <option>Robinhood</option>
                  <option>SCB</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Card>
  );
}


// next step ให้ chat gpt เด้ง pop up แทนขึ้น asset ตรง ๆ 