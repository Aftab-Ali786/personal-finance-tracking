import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  const chartData = prepareChartData(transactions);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Income vs Expenses" },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <Line data={chartData} options={options} />
    </div>
  );
};

// helper function
const prepareChartData = (transactions) => {
  const monthlyIncome = Array(12).fill(0);
  const monthlyExpense = Array(12).fill(0);

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const monthIndex = date.getMonth();

    if (t.type === "income") {
      monthlyIncome[monthIndex] += Number(t.amount);
    } else if (t.type === "expense") {
      monthlyExpense[monthIndex] += Number(t.amount);
    }
  });

  return {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Income",
        data: monthlyIncome,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Expenses",
        data: monthlyExpense,
        borderColor: "#EF5350",
        backgroundColor: "rgba(239, 83, 80, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };
};

export default LineChart;
