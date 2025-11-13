import React from "react";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import './index.css'

function App() {
  return (
    <Routes>
      {/* Default route redirects to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login and Register routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />

      {/* Optional fallback for unknown routes */}
      <Route path="*" element={<h1 style={{ textAlign: 'center' }}>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
