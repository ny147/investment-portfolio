"use client";

import { useState } from "react";
import Card from "./Card";
import { motion, AnimatePresence } from "framer-motion";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export default function HoldingsList({ holdings, setHoldings }) {
  const safeHoldings = Array.isArray(holdings) ? holdings : [];

  const [form, setForm] = useState({
    name: "",
    type: "Stocks",
    value: "",
    quantity: "",
    account: "Main Account",
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState(null);

  // ✅ Handle Import CSV / Excel
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop().toLowerCase();

    if (fileExt === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data.map((row) => ({
            name: row.name,
            type: row.type || "Stocks",
            quantity: parseFloat(row.quantity || 0),
            value: parseFloat(row.value || 0),
            account: row.account || "Main Account",
          }));
          setHoldings([...safeHoldings, ...data]);
        },
      });
    } else if (["xls", "xlsx"].includes(fileExt)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        const parsed = jsonData.map((row) => ({
          name: row.name,
          type: row.type || "Stocks",
          quantity: parseFloat(row.quantity || 0),
          value: parseFloat(row.value || 0),
          account: row.account || "Main Account",
        }));
        setHoldings([...safeHoldings, ...parsed]);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a CSV or Excel file.");
    }
  };

  // ✅ Add manually
  const handleAdd = () => {
    const { name, type, value, quantity, account } = form;
    if (!name || !value || !quantity) return;

    const newHolding = {
      name,
      type,
      value: parseFloat(value),
      quantity: parseFloat(quantity),
      account,
    };

    const updated = [...safeHoldings, newHolding];
    setHoldings(updated);

    setForm({
      name: "",
      type: "Stocks",
      value: "",
      quantity: "",
      account: "Main Account",
    });
  };

  const handleDelete = (index) => {
    const updated = safeHoldings.filter((_, i) => i !== index);
    setHoldings(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm({ ...safeHoldings[index] });
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    const updated = safeHoldings.map((h, i) =>
      i === editingIndex ? editForm : h
    );
    setHoldings(updated);
    setEditingIndex(null);
    setEditForm(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  return (
    <Card title="Holdings">
      {/* ✅ Import CSV/Excel Button */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <label className="cursor-pointer bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition">
          Import CSV/Excel
          <input
            type="file"
            accept=".csv, .xls, .xlsx"
            onChange={handleFileImport}
            className="hidden"
          />
        </label>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          * File format: name, type, quantity, value, account
        </span>
      </div>

      {/* ✅ Holdings Table */}
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
                      onClick={() => handleEdit(i)}
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

      {/* ✅ Manual Add Form (back again) */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Asset Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded p-2 dark:bg-gray-800"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border rounded p-2 dark:bg-gray-800"
        >
          <option>Stocks</option>
          <option>Cryptocurrency</option>
          <option>ETF</option>
          <option>Cash</option>
        </select>
        <input
          type="number"
          step="0.01"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border rounded p-2 dark:bg-gray-800"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Value ($)"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: e.target.value })}
          className="border rounded p-2 dark:bg-gray-800"
        />
        <select
          value={form.account}
          onChange={(e) => setForm({ ...form, account: e.target.value })}
          className="border rounded p-2 dark:bg-gray-800"
        >
          <option>Main Account</option>
          <option>Binance</option>
          <option>Robinhood</option>
          <option>SCB</option>
          <option>Other</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition sm:col-span-2 md:col-span-1"
        >
          Add Asset
        </button>
      </div>

      {/* ✅ Slide-up Edit Modal */}
      <AnimatePresence>
        {editingIndex !== null && editForm && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancelEdit}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h2 className="text-lg font-semibold mb-4">Edit Holding</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="border rounded p-2 w-full dark:bg-gray-700"
                  placeholder="Asset Name"
                />
                <input
                  type="number"
                  value={editForm.quantity}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      quantity: parseFloat(e.target.value),
                    })
                  }
                  className="border rounded p-2 w-full dark:bg-gray-700"
                  placeholder="Quantity"
                />
                <input
                  type="number"
                  value={editForm.value}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      value: parseFloat(e.target.value),
                    })
                  }
                  className="border rounded p-2 w-full dark:bg-gray-700"
                  placeholder="Value ($)"
                />
                <select
                  value={editForm.account}
                  onChange={(e) =>
                    setEditForm({ ...editForm, account: e.target.value })
                  }
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
                  onClick={handleCancelEdit}
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
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