import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ReportsPage from "./pages/ReportsPage";
import AdminPage from "./pages/AdminPage";

import "./styles/index.css";
import LandingPage from "./pages/LandingPage";

const user = JSON.parse(localStorage.getItem("user") || "null");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route  path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reports" element={user ? <ReportsPage /> : <Navigate to="/login" replace />} />
          <Route path="/admin" element={user && user.admin ? <AdminPage /> : <Navigate to="/reports" replace />} />
          {/* <Route path="*" element={user ? <Navigate to="/reports" /> : <Navigate to="/login" />} /> */}
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
