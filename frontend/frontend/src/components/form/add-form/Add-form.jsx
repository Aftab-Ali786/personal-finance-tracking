import React from "react";
import "./Add-form.css";

const AddForm = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    type: "",
  });
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/transactions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to add transaction");
      }

      const saved = await res.json();

      console.log("Transaction saved:", saved);

      
      setFormData({
        title: "",
        amount: "",
        date: "",
        category: "",
        type: "",
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 shadow-lg rounded-xl bg-white max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

      
      <div className="mb-3">
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="Enter title"
          required
        />
      </div>

      
      <div className="mb-3">
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="e.g. 2000 for income, 500 for expense"
          required
        />
      </div>

      
      <div className="mb-3">
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
      </div>

    
      <div className="mb-3">
        <label className="block text-sm font-medium">Category</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Salary">Salary</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>

      
      <div className="mb-3">
        <label className="block text-sm font-medium">Type</label>
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Add Transaction
      </button>

      {success && (
        <p className="text-green-600 text-sm mt-3">
           Transaction added successfully!
        </p>
      )}
    </form>
  );
};

export default AddForm;
