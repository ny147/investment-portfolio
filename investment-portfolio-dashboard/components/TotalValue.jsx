"use client";

import CountUp from "react-countup";

function calcChange(period, portfolio) {
  const data = portfolio.performance[period];
  const first = data[0].value;
  const last = data[data.length - 1].value;
  const changeAbs = last - first;
  const changePct = ((last - first) / first) * 100;
  return { abs: changeAbs, pct: changePct.toFixed(2) };
}

export default function TotalValue({ holdings }) {
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);

  // Mock previous value → for daily change
  const previousValue = totalValue * 0.98;
  const dailyChange = totalValue - previousValue;
  const dailyPct = ((dailyChange / previousValue) * 100).toFixed(2);

  // Mock performance data
  const portfolio = {
    performance: {
      "1M": [
        { date: "2025-08-01", value: totalValue * 0.8 },
        { date: "2025-09-01", value: totalValue },
      ],
      "6M": [
        { date: "2025-04-01", value: totalValue * 0.6 },
        { date: "2025-09-01", value: totalValue },
      ],
      "1Y": [
        { date: "2024-09-01", value: totalValue * 0.4 },
        { date: "2025-09-01", value: totalValue },
      ],
    },
  };

  const metrics = [
    { label: "1M", ...calcChange("1M", portfolio) },
    { label: "6M", ...calcChange("6M", portfolio) },
    { label: "1Y", ...calcChange("1Y", portfolio) },
  ];

  return (
    <div className="text-center mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
      {/* ✅ CountUp for total value */}
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        $
        <CountUp end={totalValue} duration={1.2} separator="," decimals={0} />
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
        Total Portfolio Value
      </p>

      {/* ✅ CountUp for daily change */}
      <p
        className={`mt-4 text-lg font-semibold ${
          dailyChange >= 0
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {dailyChange >= 0 ? "▲" : "▼"} $
        <CountUp end={Math.abs(dailyChange)} duration={1.2} separator="," />
        {" "}
        (
        <CountUp end={Math.abs(dailyPct)} duration={1.2} decimals={2} />
        %)
      </p>

      {/* ✅ Performance Metrics with CountUp */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg p-4 bg-gray-50 dark:bg-gray-700 transition-colors"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {m.label} Change
            </p>
            <p
              className={`text-xl font-bold ${
                m.abs >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {m.abs >= 0 ? "▲" : "▼"}{" "}
              <CountUp end={Math.abs(m.pct)} duration={1.2} decimals={2} />%
            </p>
            <p
              className={`text-sm font-medium ${
                m.abs >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {m.abs >= 0 ? "+" : "-"}$
              <CountUp end={Math.abs(m.abs)} duration={1.2} separator="," />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
