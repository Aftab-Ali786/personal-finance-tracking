import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";


export default function Delete() {

const fetchTransaction = async (id) => {
  const res = await fetch(`http://localhost:5000/${id}`);
  return await res.json();
}
const deleteTransaction = async (id) => {
  await fetch(`http://localhost:5000/${id}/delete`, {
    method: "DELETE",
  });
}

  const { id } = useParams();
  const navigate = useNavigate();
  const [tx, setTx] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchTransaction(id);
      setTx(data);
    })();
  }, [id]);

  const handleDelete = async () => {
    await deleteTransaction(id);
    navigate("/");
  };

  if (!tx) return <p>Loading...</p>;

  return (
    <div>
      <h2>Delete Transaction</h2>
      <p>Are you sure you want to delete <strong>{tx.title}</strong> ({new Date(tx.date).toLocaleDateString()})?</p>
      <button onClick={handleDelete} style={{marginRight:8}}>Yes, delete</button>
      <Link to="/">Cancel</Link>
    </div>
  );
}
