import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DonutChart from "../../component/Charts"; // <-- your DonutChart

function HomePage() {
  const [transactions, setTransactions] = useState([]);

  // Fetch all transactions from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  // Delete a transaction
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/transactions/${id}/delete`, {
      method: "DELETE",
    });
    setTransactions(transactions.filter((t) => t._id !== id));
  };

  // Split into income and expenses
  const income = transactions.filter((t) => t.amount > 0);
  const expenses = transactions.filter((t) => t.amount < 0);

  // Chart Data for Income
  const incomeData = {
    labels: [...new Set(income.map((t) => t.category))],
    datasets: [
      {
        data: income.map((t) => t.amount),
        backgroundColor: ["#4CAF50", "#81C784", "#A5D6A7", "#C8E6C9"],
      },
    ],
  };

  // Chart Data for Expenses
  const expenseData = {
    labels: [...new Set(expenses.map((t) => t.category))],
    datasets: [
      {
        data: expenses.map((t) => Math.abs(t.amount)),
        backgroundColor: ["#E57373", "#EF5350", "#FF8A80", "#FFCDD2"],
      },
    ],
  };

  // Totals
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce(
    (sum, t) => sum + Math.abs(t.amount),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>💰 Personal Finance Tracker</h2>

      {/* Charts */}
      <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
        <DonutChart data={incomeData} total={`$${totalIncome}`} />
        <DonutChart data={expenseData} total={`$${totalExpenses}`} />
      </div>

      {/* Add New */}
      <div style={{ margin: "20px 0" }}>
        <Link to="/add">➕ Add New Transaction</Link>
      </div>

      {/* Transaction List */}
      <h3>📋 Transactions</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t._id}>
            <strong>{t.title}</strong> — ${t.amount} ({t.category}) on{" "}
            {new Date(t.date).toLocaleDateString()}
            <Link to={`/${t._id}/edit`} style={{ marginLeft: "10px" }}>
              ✏️ Edit
            </Link>
            <button
              onClick={() => handleDelete(t._id)}
              style={{ marginLeft: "10px" }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
