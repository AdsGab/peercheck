import React from "react";
import { Link } from "react-router-dom";
import PeeruLayout from "../components/PeeruLayout";

const ACCENT_COLOR = "#14c5a2";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={ACCENT_COLOR}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

{/*Sprint 3*/}
const styles = {
  subtitle: {
    color: "#0b6b58",
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    letterSpacing: 0.4,
  },

  heroTitle: {
    color: "#0b1a1a",
    fontSize: 46,
    fontWeight: 800,
    lineHeight: 1.18,
    marginBottom: 22,
  },

  paragraph: {
    color: "#5f6f6b",
    fontSize: 18,
    lineHeight: 1.65,
    marginBottom: 34,
    maxWidth: 520,
  },

  ctaRow: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    alignItems: "center",
  },

  btnBase: {
    padding: "14px 32px",
    borderRadius: 28,
    fontWeight: 800,
    fontSize: 16,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    cursor: "pointer",
    transition: "all 240ms ease",
    userSelect: "none",
  },

  btnPrimary: {
    background: "linear-gradient(145deg,#0b6b58,#14c5a2)",
    color: "#fff",
    boxShadow: "0 12px 26px rgba(20,197,162,0.35)",
  },

  btnSecondary: {
    background: "#fff",
    color: "#0b6b58",
    border: "1px solid #d6efe7",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
};

const LandingPage = () => {
  return (
    <PeeruLayout activeLink="home">
      {/* Subtitle */}
      <div style={styles.subtitle}>
        Upload – Review – Feedback
      </div>

      {/* Hero */}
      <h1 style={styles.heroTitle}>
        Make sure to have good <br />
        <strong>Quality assignments</strong> – <br />
        Peer Review Solutions
      </h1>

      {/* Description */}
      <p style={styles.paragraph}>
        The best student website to manage assignment quality,
        feedback, and peer review — all in one simple platform.
      </p>

      {/* CTA */}
      <div style={styles.ctaRow}>
        <Link
          to="/register"
          style={{ ...styles.btnBase, ...styles.btnPrimary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px rgba(20,197,162,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow =
              "0 12px 26px rgba(20,197,162,0.35)";
          }}
        >
          Get started
        </Link>

        <Link
          to="/about"
          style={{ ...styles.btnBase, ...styles.btnSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 16px 32px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(0,0,0,0.08)";
          }}
        >
          <CheckIcon />
          How it works?
        </Link>
      </div>
    </PeeruLayout>
  );
};

export default LandingPage;
