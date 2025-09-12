import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const MonthlySummary = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  
  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);


  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/transactions/${id}/delete`, {
        method: "DELETE",
      });
      
      fetchTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  const filtered =
    selectedMonth !== null
      ? transactions.filter((t) => {
          const date = new Date(t.date);
          return date.getMonth() === selectedMonth;
        })
      : [];

  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-6">
  
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {months.map((month, index) => (
          <button
            key={index}
            onClick={() => setSelectedMonth(index)}
            className={`p-4 rounded-xl shadow-md transition ${
              selectedMonth === index
                ? "bg-blue-600 text-white"
                : "bg-blue-100 hover:bg-blue-200"
            }`}
          >
            <h2 className="text-lg font-bold">{month}</h2>
          </button>
        ))}
      </div>

    
      {selectedMonth !== null && (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            {months[selectedMonth]} Summary
          </h1>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-100 rounded-lg shadow">
              <h3 className="font-bold text-green-700">Income</h3>
              <p className="text-xl">${totalIncome}</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg shadow">
              <h3 className="font-bold text-red-700">Expenses</h3>
              <p className="text-xl">${totalExpense}</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg shadow">
              <h3 className="font-bold text-blue-700">Balance</h3>
              <p className="text-xl">${totalIncome - totalExpense}</p>
            </div>
          </div>

          
          <ul className="space-y-3">
            {filtered.map((t) => (
              <li
                key={t._id}
                className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
              >
                <div>
                  <strong>{t.title}</strong> <br />
                  <span className="text-sm text-gray-500">
                    {t.category} — {new Date(t.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-bold ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}${t.amount}
                  </span>
                  
                  <Link
                    to={`/${t._id}/edit`}
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MonthlySummary;
