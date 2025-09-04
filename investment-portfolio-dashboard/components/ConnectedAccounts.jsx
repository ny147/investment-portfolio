"use client";

import { portfolio } from "@/lib/mockData";
import Card from "./Card";

export default function ConnectedAccounts() {
  const accounts = portfolio.accounts;

  return (
    <Card title="Connected Accounts">
      <ul className="space-y-3">
        {accounts.map((account, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          >
            <span className="font-medium">{account.name}</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                account.status === "Connected"
                  ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                  : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
              }`}
            >
              {account.status}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
