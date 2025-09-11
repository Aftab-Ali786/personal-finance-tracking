// src/Charts.jsx
import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Charts({ transactions }) {
  // Split income and expenses
  const { incomeData, expenseData, incomeTotal, expenseTotal } = useMemo(() => {
    const incomeItems = transactions.filter(t => t.amount > 0);
    const expenseItems = transactions.filter(t => t.amount < 0);

    const incomeLabels = incomeItems.map(t => t.title);
    const expenseLabels = expenseItems.map(t => t.title);

    const incomeValues = incomeItems.map(t => t.amount);
    const expenseValues = expenseItems.map(t => Math.abs(t.amount));

    const incomeTotal = incomeValues.reduce((a, b) => a + b, 0);
    const expenseTotal = expenseValues.reduce((a, b) => a + b, 0);

    return {
      incomeData: {
        labels: incomeLabels,
        datasets: [
          {
            data: incomeValues,
            backgroundColor: ["#4caf50", "#a5d6a7", "#81c784"],
          },
        ],
      },
      expenseData: {
        labels: expenseLabels,
        datasets: [
          {
            data: expenseValues,
            backgroundColor: ["#e57373", "#f8bbd0", "#ffc107", "#ff9800"],
          },
        ],
      },
      incomeTotal,
      expenseTotal,
    };
  }, [transactions]);

  // Chart options
  const incomeOptions = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.parsed.toLocaleString()}`,
        },
      },
    },
  };

  const expenseOptions = {
    cutout: "70%",
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.parsed.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", gap: 40, justifyContent: "center", padding: 20 }}>
      <div style={{ width: 300, textAlign: "center" }}>
        <Doughnut data={incomeData} options={incomeOptions} />
        <h3>${incomeTotal.toLocaleString()}</h3>
        <p>Total Income</p>
      </div>

      <div style={{ width: 300, textAlign: "center" }}>
        <Doughnut data={expenseData} options={expenseOptions} />
        <h3>${expenseTotal.toLocaleString()}</h3>
        <p>Total Expenses</p>
      </div>
    </div>
  );
}
