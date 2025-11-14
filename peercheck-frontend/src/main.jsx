import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UploadPage from "./pages/UploadPage";
import ProfilePage from "./pages/ProfilePage";
import ExchangePoin from "./pages/ExchangePoin";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default route -> Redirect to login */}
        <Route path="/" element={<Navigate to="/profile" />} />

        {/* Main Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/exchangepoin" element={<ExchangePoin />} />

        {/* Optional catch-all for 404 */}
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
