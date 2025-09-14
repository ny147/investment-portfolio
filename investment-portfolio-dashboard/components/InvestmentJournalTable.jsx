"use client";
import { useState } from "react";
import Card from "./Card";

export default function InvestmentJournalTable({ entries, setEntries }) {
  const [form, setForm] = useState({
    investmentName: "",
    type: "Stocks",
    action: "BUY",
    date: "",
    price: "",
    quantity: "",
  });

  const handleAdd = () => {
    const { investmentName, type, action, date, price, quantity } = form;
    const qty = parseFloat(quantity);
    const p = parseFloat(price);

    if (!investmentName || !date || !price || !quantity) return;

    const newEntry = {
      investmentName,
      type,
      action,
      date,
      price: p,
      quantity: qty,
      value: p * qty,
    };

    // Calculate returns for SELL
    if (action === "SELL") {
      const buys = entries.filter(
        (e) => e.investmentName === investmentName && e.action === "BUY"
      );
      const avgBuy =
        buys.reduce((sum, b) => sum + b.price * b.quantity, 0) /
        (buys.reduce((sum, b) => sum + b.quantity, 0) || 1);

      const returns = (p - avgBuy) * qty;
      newEntry.returns = returns;
      newEntry.returnPct = ((returns / (avgBuy * qty)) * 100).toFixed(2);
    }

    setEntries((prev) => [...prev, newEntry]);

    setForm({
      investmentName: "",
      type: "Stocks",
      action: "BUY",
      date: "",
      price: "",
      quantity: "",
    });
  };

  const handleDelete = (i) => {
    setEntries((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <Card title="Investment Journal">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Action</th>
              <th className="p-2">Date</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Value</th>
              <th className="p-2">Returns</th>
              <th className="p-2">Returns %</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((e, i) => (
                <tr
                  key={i}
                  className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-2">{e.investmentName}</td>
                  <td className="p-2">{e.type}</td>
                  <td
                    className={`p-2 font-semibold ${
                      e.action === "BUY" ? "text-blue-600" : "text-pink-500"
                    }`}
                  >
                    {e.action}
                  </td>
                  <td className="p-2">{e.date}</td>
                  <td className="p-2">${e.price.toFixed(2)}</td>
                  <td className="p-2">{e.quantity}</td>
                  <td className="p-2">${e.value.toFixed(2)}</td>
                  <td
                    className={`p-2 ${
                      e.returns >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {e.action === "SELL"
                      ? `$${e.returns.toFixed(2)}`
                      : "-"}
                  </td>
                  <td
                    className={`p-2 ${
                      e.returns >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {e.action === "SELL" ? `${e.returnPct}%` : "-"}
                  </td>
                  <td className="p-2">
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
                  colSpan="10"
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No transactions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Form */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={form.investmentName}
          onChange={(e) =>
            setForm({ ...form, investmentName: e.target.value })
          }
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
        </select>
        <select
          value={form.action}
          onChange={(e) => setForm({ ...form, action: e.target.value })}
          className="border rounded p-2 dark:bg-gray-800"
        >
          <option>BUY</option>
          <option>SELL</option>
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border rounded p-2 dark:bg-gray-800"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border rounded p-2 dark:bg-gray-800"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border rounded p-2 dark:bg-gray-800"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
    </Card>
  );
}
