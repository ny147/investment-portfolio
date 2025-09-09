// lib/mockData.js

export const portfolio = {
  totalValue: 125000,
  previousValue: 121500,
  performance: {
    "1M": [
      { date: "2025-08-01", value: 100000 },
      { date: "2025-09-01", value: 125000 },
    ],
    "6M": [
      { date: "2025-04-01", value: 85000 },
      { date: "2025-09-01", value: 125000 },
    ],
    "1Y": [
      { date: "2024-09-01", value: 70000 },
      { date: "2025-09-01", value: 125000 },
    ],
  },
  allocation: [
    { type: "Stocks", value: 60000 },
    { type: "ETFs", value: 40000 },
    { type: "Crypto", value: 25000 },
  ],
  holdings: [
    { name: "AAPL", quantity: 10, value: 1900, changePct: +2.3 },
    { name: "VOO ETF", quantity: 15, value: 6000, changePct: -0.5 },
    { name: "BTC", quantity: 0.5, value: 15000, changePct: +5.2 },
  ],
  accounts: [
    { name: "Fidelity", status: "Connected" },
    { name: "Coinbase", status: "Connected" },
    { name: "Robinhood", status: "Disconnected" },
  ],
  
};
