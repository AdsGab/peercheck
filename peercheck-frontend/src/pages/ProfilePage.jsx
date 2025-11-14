import React from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const styles = {
    page: {
      fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      color: "#0b1a1a",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 28px",
      borderBottom: "1px solid #e6e6e6",
    },
    logo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#0b6b58" },
    nav: { display: "flex", gap: 18, alignItems: "center" },
    content: { maxWidth: 1200, margin: "28px auto", padding: "0 18px", boxSizing: "border-box" },
    topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 },
    badgeRow: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 },
    badge: {
      background: "#2c7a5b",
      color: "#dffaf0",
      padding: "12px 24px",
      borderRadius: 12,
      fontWeight: 700,
    },
    scoreCard: { marginTop: 24, padding: 24, background: "#fff", borderRadius: 12 },
    progressBarWrap: { marginTop: 18, width: "100%" },
    progressTrack: { height: 14, background: "#e6e6e6", borderRadius: 12, overflow: "hidden" },
    progressFill: { height: "100%", background: "#1d6f4d", borderRadius: 12, transition: "width 400ms" },
    missions: { marginTop: 28, display: "grid", gap: 14 },
    missionCard: { background: "#0f6a4e", color: "#e9fff4", padding: 20, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" },
    goBtn: { background: "#21c79a", color: "#063b2f", padding: "10px 18px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 700 },
  };

  // Example static values matching the screenshot
  const points = 1050;
  const next = 3000;
  const progress = Math.min(100, Math.round((points / next) * 100));

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#06b08e" />
            <path d="M6 8h12v2H6zM6 12h12v2H6z" fill="#fff" />
          </svg>
          <span>Peer Reviewer</span>
        </div>

        <nav style={styles.nav}>
          <Link to="/" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 600 }}>Assignment</Link>
          <Link to="/upload" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 600 }}>Upload</Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "#000", fontWeight: 700 }}>Profile</Link>
        </nav>
      </header>

      <main style={styles.content}>
        <div style={styles.topRow}>
          <div>
            <h2 style={{ margin: 0, fontSize: 32 }}>{points} Poin, Your Rank Now Is :</h2>
            <div style={{ marginTop: 8, fontWeight: 700, fontSize: 18 }}>Gold, Good Job !</div>
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Hi, Anonymus</div>
              <div style={{ fontSize: 12, color: "#666" }}>Member since Nov 2025</div>
            </div>
          </div>
        </div>

        <div style={styles.scoreCard}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: 12, background: "#ffd27a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🏆</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>Keep Going</div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>Progress towards next rank</div>
                </div>
              </div>
            </div>
            <div style={{ width: 320 }}>
              <div style={styles.progressBarWrap}>
                <div style={styles.progressTrack}>
                  <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "#666" }}>
                  <span>0 Poin</span>
                  <span>500 Poin</span>
                  <span>1000 Poin</span>
                  <span>1500 Poin</span>
                  <span>3000 Poin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.badgeRow}>
          <div style={styles.badge}>Your Rank</div>
          <div style={styles.badge}>Your Assignment</div>
          <div style={styles.badge}>Your Answer</div>
          <div style={styles.badge}>Edit Profile</div>
        </div>

        <div style={{ marginTop: 18 }}>
          <a href="/exchangepoin" style={{ textDecoration: "underline", color: "#0b6b58", fontWeight: 700 }}>Exchange Poin?</a>
        </div>

        <section style={styles.missions}>
          <div style={styles.missionCard}>
            <div>
              <div style={{ fontWeight: 800 }}>Upload Assignment</div>
              <div style={{ opacity: 0.9, marginTop: 6 }}>Earn 20 Poin</div>
            </div>
            <button style={styles.goBtn} onClick={() => { window.location.href = "/upload"; }}>Go To Page!</button>
          </div>

          <div style={styles.missionCard}>
            <div>
              <div style={{ fontWeight: 800 }}>Review Assignment</div>
              <div style={{ opacity: 0.9, marginTop: 6 }}>Earn 50 Poin</div>
            </div>
            <button style={styles.goBtn}>Go To Page!</button>
          </div>

          <div style={styles.missionCard}>
            <div>
              <div style={{ fontWeight: 800 }}>Leave a Comment/Ratings</div>
              <div style={{ opacity: 0.9, marginTop: 6 }}>Earn 10 Poin</div>
            </div>
            <button style={styles.goBtn}>Go To Page!</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
