import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import HomePage from "./components/pages/home-page/Home-page";
import AddForm from "./components/form/add-form/Add-form";
import Delete from "./components/pages/Delete";
import EditForm from "./components/form/edit-form/Edit-Form";
import Navbar from "./components/component/navbar";

export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <div className="container">
       

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
