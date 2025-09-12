import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DonutChart from "../../component/Charts";
import MonthlySummary from "../../month-card/MonthlySummary";
import LineChart from "../../component/LineChart";
import { Plus, Edit, Trash2 } from "lucide-react";

function HomePage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/transactions/${id}/delete`, {
      method: "DELETE",
    });
    setTransactions(transactions.filter((t) => t._id !== id));
  };

  const income = transactions.filter((t) => t.amount > 0);
  const expenses = transactions.filter((t) => t.amount < 0);

  const incomeData = {
    labels: [...new Set(income.map((t) => t.category))],
    datasets: [
      {
        data: income.map((t) => t.amount),
        backgroundColor: ["#4CAF50", "#81C784", "#A5D6A7", "#C8E6C9"],
      },
    ],
  };

  const expenseData = {
    labels: [...new Set(expenses.map((t) => t.category))],
    datasets: [
      {
        data: expenses.map((t) => Math.abs(t.amount)),
        backgroundColor: ["#E57373", "#EF5350", "#FF8A80", "#FFCDD2"],
      },
    ],
  };

  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce(
    (sum, t) => sum + Math.abs(t.amount),
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-24 px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Personal Finance Tracker
      </h1>

      <div className="flex flex-col md:flex-row justify-center gap-10 mb-10">
        <DonutChart data={incomeData} total={`$${totalIncome}`} />
        <DonutChart data={expenseData} total={`$${totalExpenses}`} />
      </div>

      <div className="flex justify-center mb-8">
        <Link
          to="/add"
          className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5 mr-2" /> Add New Transaction
        </Link>
      </div>

      <h3 className="text-xl font-semibold mb-4">Transactions</h3>
      <ul className="space-y-3">
        {transactions
          .filter((t) => {
            const date = new Date(t.date);
            const now = new Date();
            return (
              date.getMonth() === now.getMonth() &&
              date.getFullYear() === now.getFullYear()
            );
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date)) 
          .map((t) => (
            <li
              key={t._id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <div>
                <p className="font-medium text-gray-800">{t.title}</p>
                <p className="text-sm text-gray-500">
                  {t.category} — {new Date(t.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`font-semibold ${
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${t.amount}
                </span>

                <Link
                  to={`/${t._id}/edit`}
                  className="inline-flex items-center px-3 py-1.5 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Link>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="inline-flex items-center px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </li>
          ))}
      </ul>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">Monthly Summary</h2>
        <MonthlySummary />
      </div>

      <div className="mt-12">
        <LineChart />
      </div>
    </div>
  );
}

export default HomePage;
