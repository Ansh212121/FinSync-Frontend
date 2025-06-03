import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Logout from "./Pages/Logout";
import Income from "./Pages/Income";
import Expense from "./Pages/Expense";

const App = () => {
  return (
    <Routes>
      {/* Layout wraps all pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route index element={<HomePage />} /> {/* Default to HomePage */}
      <Route path="/" element={<Layout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="income" element={<Income  />} />
        <Route path="expense" element={<Expense />} />
      </Route>
    </Routes>
  );
};

export default App;
