import React from "react";
import { Link } from "react-router-dom";

const ExchangePoin = () => {
  const styles = {
    page: { fontFamily: "Inter, system-ui, Roboto, Arial", minHeight: "100vh", width: "100vw", background: "#fff", color: "#06201a" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 28px", borderBottom: "1px solid #e6e6e6" },
    content: { maxWidth: 1200, margin: "28px auto", padding: "0 18px", boxSizing: "border-box" },
    titleRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    cards: { marginTop: 24, display: "grid", gap: 18 },
    card: { background: "#0f6a4e", color: "#e9fff4", padding: 20, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" },
    actionBtn: { background: "#21c79a", color: "#063b2f", padding: "10px 18px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 700 }
  };

  const options = [
    { points: "10.000 Poin", amount: "Rp.100.000" },
    { points: "1000 Poin", amount: "Rp.10.000" },
    { points: "100 Poin", amount: "Rp.1.000" },
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#0b6b58" }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#06b08e" />
            <path d="M6 8h12v2H6zM6 12h12v2H6z" fill="#fff" />
          </svg>
          <span>Peer Reviewer</span>
        </div>
        <nav>
          <Link to="/profile" style={{ color: "#0b6b58", fontWeight: 600, textDecoration: "none" }}>Back to Profile</Link>
        </nav>
      </header>

      <main style={styles.content}>
        <div style={styles.titleRow}>
          <div>
            <h1 style={{ margin: 0 }}>Exchange Poin</h1>
            <p style={{ margin: "6px 0 0", color: "#666" }}>Convert your points to rewards.</p>
          </div>
        </div>

        <div style={styles.cards}>
          {options.map((o) => (
            <div key={o.points} style={styles.card}>
              <div>
                <div style={{ fontWeight: 800 }}>{o.points}</div>
                <div style={{ opacity: 0.9, marginTop: 6 }}>Exchange to cash</div>
              </div>
              <div>
                <button style={styles.actionBtn} onClick={() => alert(`Exchanged ${o.points} for ${o.amount}`)}>{o.amount}</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExchangePoin;
