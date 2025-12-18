// LoginPage.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import loginPageIMG from "../assets/loginPageIMG.jpg";
// ⭐ CRITICAL FIX: Import useAuth hook
import useAuth from "../hooks/useAuth"; 

// --- 1. CONSTANTS (Unchanged) ---
const ACCENT_COLOR = "#4DF3C8";
const CARD_BG = "#ffffff";
const INPUT_BG = "#e8e8e8";
const OVERLAY_COLOR = "rgba(29, 29, 29, 0.7)";

// Use the public asset `public/Google.png` so browsers render the icon reliably
const GoogleIcon = ({ style }) => (
  <img src="/Google.png" alt="Google" style={{ width: 20, height: 20, marginRight: 10, ...style }} />
);

// --- 3. STYLES (Unchanged) ---
const styles = {
  container: {
    display: "flex",
    fontFamily: "Inter, sans-serif",
    width: "100vw",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "black",
    backgroundImage: `url(${loginPageIMG})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  leftSide: {
    flex: 1,
    position: "relative",
    height: "100vh",
    backgroundColor: OVERLAY_COLOR,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
    boxSizing: "border-box",
  },
  logo: {
    position: "absolute",
    top: "30px",
    left: "30px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  contentBlock: {
    color: "white",
    maxWidth: "80%",
    marginTop: "150px",
    marginBottom: "0",
  },
  subtitle: {
    color: ACCENT_COLOR,
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    lineHeight: "1.2",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#ccc",
  },
  rightSide: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    height: "100vh",
    backgroundColor: OVERLAY_COLOR,
  },
  loginCard: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: CARD_BG,
    borderRadius: "25px",
    padding: "50px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    boxSizing: "border-box",
  },
  formTitle: {
    fontSize: "28px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "25px",
    color: "#333",
  },
  input: {
    padding: "18px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    backgroundColor: INPUT_BG,
    fontSize: "16px",
    outline: "none",
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
    color: "#444",
  },
  buttonBase: {
    padding: "16px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background-color 0.3s",
    textAlign: "center",
    height: "55px",
  },
};

// --- 4. COMPONENT ---
const LoginPage = () => {
  const navigate = useNavigate();
  // ⭐ Use the login function from AuthContext
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMobile = window.innerWidth <= 1024;

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "black";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // API call to your backend
      const response = await fetch("http://localhost:4000/api/auth/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // ⭐ CRITICAL FIX: Use context login function instead of direct localStorage access
      login(data.token);

      console.log("Login successful! JWT Token sent to AuthContext for storage and decoding.");
      
      // Redirect to the dashboard
      navigate("/dashboard"); 
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        ...styles.container,
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* LEFT SIDE: Hero Content */}
      <div
        style={{
          ...styles.leftSide,
          width: isMobile ? "100%" : "60%",
          height: isMobile ? "250px" : "100vh",
        }}
      >
        {/* LOGO POSITIONED ABSOLUTELY from the top-left corner */}
        <div style={styles.logo}>
          <img src="/Logo.png" alt="PIRU" style={{ height: 48, width: 'auto' }} />
        </div>

        {/* Content Block: Uses margin-top to achieve desired low position */}
        <div style={styles.contentBlock}>
          <h4 style={styles.subtitle}>Upload - Review - Feedback</h4>
          <h1 style={styles.title}>
            Make sure to have good Quality assignments-
            <br />
            <span>PIRU</span>
          </h1>
          <p style={styles.description}>
            The best student website for student to manage their school
            assignment quality with single website.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div
        style={{
          ...styles.rightSide,
          width: isMobile ? "100%" : "40%",
          height: isMobile ? "auto" : "100vh",
        }}
      >
        <div style={styles.loginCard}>
          <h2 style={styles.formTitle}>Welcome Back!</h2>

          {/* Input Fields */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {/* Forgot Password Container */}
          <div
            style={{
              textAlign: "right",
              marginTop: "-15px",
              marginBottom: "5px",
            }}
          >
            <a
              href="/forgot"
              style={{
                fontSize: "14px",
                color: "#666",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              ...styles.buttonBase,
              backgroundColor: loading ? "#666" : "black",
              color: "white",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div
            style={{
              position: "relative",
              textAlign: "center",
              margin: "5px 0",
              height: "14px",
            }}
          >
            {/* Horizontal Line */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                right: "0",
                height: "1px",
                backgroundColor: "#ccc",
                zIndex: 0,
              }}
            ></div>
            {/* 'Or' Text */}
            <span
              style={{
                position: "relative",
                zIndex: 1,
                backgroundColor: CARD_BG,
                padding: "0 10px",
                fontSize: "14px",
                color: "#888",
                fontWeight: "500",
              }}
            >
              Or
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={() => alert('Google sign-in is still in development.')}
            style={{
              ...styles.buttonBase,
              backgroundColor: "black",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <GoogleIcon />
            Continue With Google
          </button>

          {/* Sign Up Link */}
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#666",
              marginTop: "10px",
            }}
          >
            <span style={{ color: "#666", fontWeight: "500" }}>
              Didn’t Have Account?{" "}
            </span>
            <Link
              to="/register"
              style={{
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Sign Up Here
            </Link>
          </p>

          {/* Error Message */}
          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                fontSize: "14px",
                padding: "10px",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                borderRadius: "5px",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;