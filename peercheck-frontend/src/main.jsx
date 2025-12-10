// index.js (with PeeruLayout integration confirmed)

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";      
import FeaturesPage from "./pages/FeaturesPage";
// Import PeeruLayout to use for pages that share the design shell (like Pricing)
import PeeruLayout from "./components/PeeruLayout"; 
import UploadPage from "./pages/UploadPage";
import ProfilePage from "./pages/ProfilePage";
import PricingPage from "./pages/PricingPage";
import ExchangePoin from "./pages/ExchangePoin";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 1. Redirect root to the marketing landing page */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* 2. Authentication Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* 3. Marketing/Shared Pages */}
        <Route path="/home" element={<LandingPage />} /> 
        <Route path="/about" element={<AboutPage />} />     
        <Route path="/features" element={<FeaturesPage />} />

        {/* 4. Pricing Page (Now using the dedicated component) */}
        <Route path="/pricing" element={<PricingPage />} /> 

        {/* 5. Application Pages (Protected) */}
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/exchangepoin" element={<ExchangePoin />} />

        {/* 6. Fallback */}
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);