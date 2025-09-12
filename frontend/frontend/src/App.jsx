import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/home-page/Home-page";
import AddForm from "./components/form/add-form/Add-form";
import Delete from "./components/pages/Delete";
import EditForm from "./components/form/edit-form/Edit-Form";

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 0",
          }}
        >
          <h1>Personal Finance Tracker</h1>
          <nav>
            <Link to="/" style={{ marginRight: 12 }}>
              Home
            </Link>
            <Link to="/add">Add</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddForm />} />
          <Route path="/:id/edit" element={<EditForm/>} />
          <Route path="/:id/delete" element={<Delete />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
