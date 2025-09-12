import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/home-page/Home-page";
import AddEdit from "./components/pages/add-page/Add-page";
import Delete from "./components/pages/Delete";
import AddPage from "./components/pages/add-page/Add-page";
export default function App() {
  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
        <h1>Personal Finance Tracker</h1>
        <nav>
          <Link to="/" style={{ marginRight: 12 }}>Home</Link>
          <Link to="/add">Add</Link>
        </nav>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/:id/edit" element={<AddEdit />} />
          <Route path="/:id/delete" element={<Delete />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
