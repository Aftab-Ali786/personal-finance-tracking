# 💰 Personal Finance Tracker (React + Vite + MERN)

A simple yet powerful **personal finance tracking** web app built using the **MERN stack** (MongoDB, Express, React, Node.js) with Vite for the frontend.

---

## ✨ Features

- ✅ Track **income** and **expenses**
- ✅ View **total balance, income, and expenses**
- ✅ Interactive **charts and graphs** for insights  
  - Doughnut, Pie, and Line charts  
- ✅ **Month-wise transaction history**  
- ✅ View **current month transactions** below charts  
- ✅ **Add, edit, and delete transactions**

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd finance-tracking


cd backend
npm install
node server.js
⚠️ Make sure you have MongoDB installed and running locally.
Use MongoDB Compass to view and manage your data.



cd frontend
npm install
npm run dev



📝 Usage Guide

Click “Add Transaction” to create a new transaction.

Fill in all required fields:

Title

Amount

Date

Category

Type (Income / Expense)

Editing Transactions:

If changing from Income → Expense, add a - (minus) sign before the amount.

If changing from Expense → Income, remove the - sign.

Other fields (title, category, date) can be updated normally.

📊 Example Features in Action

Dashboard: Shows income vs. expenses in charts

Transactions List: View month-wise and current month’s records

Charts:

Income breakdown by category

Expense breakdown by category

Monthly summary line chart

🛠️ Tech Stack

Frontend: React + Vite, Chart.js

Backend: Node.js, Express

Database: MongoDB

State Management: React Hooks

📌 Notes

Always maintain correct amount format when switching between Income and Expense.

Project is designed for local MongoDB setup.

