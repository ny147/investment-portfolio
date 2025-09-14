"use client";

import { useState } from "react";
import Card from "./Card";

export default function JourneyLog({ holdings, setHoldings, journey, setJourney }) {
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSave = () => {
    // Save snapshot
    const newEntry = {
      date,
      note,
      holdingsSnapshot: JSON.parse(JSON.stringify(holdings)),
    };
    setJourney((prev) => [...prev, newEntry]);
    setNote("");
  };

  return (
    <Card title="Investment Journey">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="border rounded p-2 w-full dark:bg-gray-800"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Today's Note</label>
          <textarea
            className="border rounded p-2 w-full dark:bg-gray-800"
            rows={3}
            placeholder="Write your investment thoughts or actions..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          Save Journey Entry
        </button>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Recent Entries</h4>
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {journey.slice(-5).reverse().map((entry, i) => (
              <li
                key={i}
                className="border rounded p-2 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <p className="text-sm font-medium">{entry.date}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {entry.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
