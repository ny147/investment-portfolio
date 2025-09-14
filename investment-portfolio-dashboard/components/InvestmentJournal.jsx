"use client";
import { useState } from "react";
import Card from "./Card";

export default function InvestmentJournal({
  selectedDate,
  setSelectedDate,
  journals,
  updateNoteForDate,
}) {
  const currentNote = journals[selectedDate]?.note || "";

  return (
    <Card title="Investment Journal">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded p-2 w-full dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Journal Entry for {selectedDate}
          </label>
          <textarea
            value={currentNote}
            onChange={(e) => updateNoteForDate(e.target.value)}
            rows={4}
            placeholder="Write your investment decisions or thoughts for this day..."
            className="border rounded p-2 w-full dark:bg-gray-800"
          />
        </div>
        {Object.keys(journals)
          .sort((a, b) => new Date(b) - new Date(a))
          .slice(0, 5)
          .map((date) => (
            <div
              key={date}
              className={`p-2 rounded border hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                date === selectedDate ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <p className="text-sm font-semibold">{date}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                {journals[date].note || "No note"}
              </p>
            </div>
          ))}
      </div>
    </Card>
  );
}
