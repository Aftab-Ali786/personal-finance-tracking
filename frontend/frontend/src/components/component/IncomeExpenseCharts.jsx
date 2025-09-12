import React, { useEffect, useState } from "react";
import DonutChart from "./Charts";

const IncomeExpenseCharts = () => {
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

  // split into income & expense
  const incomes = transactions.filter((t) => t.type === "income");
  const expenses = transactions.filter((t) => t.type === "expense");

  // group by category
  const groupByCategory = (arr) =>
    arr.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const incomeByCategory = groupByCategory(incomes);
  const expenseByCategory = groupByCategory(expenses);

  const incomeData = {
    labels: Object.keys(incomeByCategory),
    datasets: [
      {
        data: Object.values(incomeByCategory),
        backgroundColor: ["#4CAF50", "#81C784", "#A5D6A7", "#66BB6A"],
      },
    ],
  };

  const expenseData = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        data: Object.values(expenseByCategory),
        backgroundColor: ["#E57373", "#FF8A80", "#EF5350", "#FFCDD2"],
      },
    ],
  };

  const totalIncome = Object.values(incomeByCategory).reduce(
    (a, b) => a + b,
    0
  );
  const totalExpense = Object.values(expenseByCategory).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
      <DonutChart data={incomeData} total={`$${totalIncome}`} />
      <DonutChart data={expenseData} total={`$${totalExpense}`} />
    </div>
  );
};

export default IncomeExpenseCharts;
