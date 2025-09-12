import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    type: "",
  });
  const [success, setSuccess] = useState(false);

  // to acess the existing data by id
 useEffect(() => {
  const fetchTransaction = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/transactions/${id}`);
      const data = await res.json();
      setFormData({
        title: data.title,
        amount: data.amount,
        date: data.date ? data.date.split("T")[0] : "",
        category: data.category,
        type: data.type,
      });
    } catch (err) {
      console.error("Error fetching transaction:", err);
    }
  };

  fetchTransaction();
}, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await fetch(`http://localhost:5000/api/transactions/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("/");
    }, 2000);
  } catch (err) {
    console.error("Error updating transaction:", err);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 shadow-lg rounded-xl bg-white max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>


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
        />
      </div>


      <div className="mb-3">
        <label className="block text-sm font-medium">Amount (+/-)</label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="e.g. -500 for expense, +2000 for income"
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
        Update Transaction
      </button>

      {success && (
        <p className="text-green-600 text-sm mt-3">
          Transaction updated successfully!
        </p>
      )}
    </form>
  );
};

export default EditForm;
