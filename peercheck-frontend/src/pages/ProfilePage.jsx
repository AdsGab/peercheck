import React, { useState } from "react";
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
      position: 'relative',
      padding: "18px 28px",
      borderBottom: "1px solid #e6e6e6",
    },
    logo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#0b6b58" },
  nav: { display: "flex", gap: 18, alignItems: "center", position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
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
    pillBase: { padding: '10px 22px', borderRadius: 28, fontWeight: 800, cursor: 'pointer', userSelect: 'none' },
    pillActive: { background: '#7FF3DF', color: '#063b2f' },
    pillInactive: { background: '#2c7a5b', color: '#dffaf0' },
  };

  // Example static values matching the screenshot
  const [activeSection, setActiveSection] = useState('rank');
  const points = 1050;
  const next = 3000;
  const progress = Math.min(100, Math.round((points / next) * 100));
  const [showRoadmap, setShowRoadmap] = useState(false);

  // Example data for assignments and answers
  const sampleAssignments = [
    { id: 1, title: 'Project Tingkat III', course: 'FR & NFR Review', points: 20, time: '10 Menit yang lalu' },
    { id: 2, title: 'Pengolahan PL', course: 'UML & Agile', points: 15, time: '1 Jam yang lalu' },
    { id: 3, title: 'User Experience', course: 'Research Plan & Brainstorm', points: 10, time: '2 Jam yang lalu' },
  ];

  const sampleAnswers = [
    { id: 1, user: 'Anonymus', title: 'Review on UX', body: 'Tolong Review tugas mengenai user persona dan user model...', points: 10, reviews: 5 },
    { id: 2, user: 'Anonymus2', title: 'Expert Review', body: 'User persona sudah dibuat dengan bagus...', points: 12, reviews: 8 },
  ];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          {/* Logo image should be placed in public/Logo.png */}
          <img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} />
        </div>

        <nav style={styles.nav}>
          <Link to="/" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 600 }}>Assignment</Link>
          <Link to="/upload" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 700 }}>Upload</Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "#000", fontWeight: 700 }}>Profile</Link>
        </nav>
      </header>

      <main style={styles.content}>
        {/* Interactive pills for profile sections */}
        <ProfilePills active={activeSection} setActive={setActiveSection} />

        {/* Panels for each section */}
        {activeSection === 'rank' && (
          <>
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
                    <button
                      onClick={() => setShowRoadmap(true)}
                      aria-label="Show roadmap"
                      style={{ width: 80, height: 80, borderRadius: 12, background: "#ffd27a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: 'none', cursor: 'pointer' }}
                    >
                      🏆
                    </button>
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
          </>
        )}

        {activeSection === 'assignment' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sampleAssignments.map(a => (
              <div key={a.id} style={{ background: '#e7fff6', borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 800 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: '#333', marginTop: 6 }}>{a.course} • {a.time}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ fontWeight: 700 }}>{a.points} Poin</div>
                  <button style={styles.goBtn} onClick={() => window.location.href = '/upload'}>Show</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'answer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sampleAnswers.map(r => (
              <div key={r.id} style={{ background: '#f3f3f3', borderRadius: 12, padding: 18, display: 'flex', gap: 12 }}>
                <div style={{ width: 60, height: 60, borderRadius: 8, background: '#fff' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800 }}>{r.user} • {r.title}</div>
                    <div style={{ fontWeight: 700, color: '#063b2f' }}>+{r.points} Poin</div>
                  </div>
                  <div style={{ marginTop: 8, color: '#444' }}>{r.body}</div>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <button style={{ ...styles.goBtn, background: '#fff', color: '#063b2f', border: '1px solid #ccc' }}>Go To Page</button>
                    <button style={{ ...styles.goBtn, background: '#fff', color: '#063b2f', border: '1px solid #ccc' }}>Edit</button>
                  </div>
                </div>
                <div style={{ width: 140, textAlign: 'center' }}>
                  <div style={{ background: '#0b6b58', color: '#fff', padding: 8, borderRadius: 8 }}>Show Review</div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>{r.reviews} People Already Review Your Assignment!</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'edit' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 600 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: 30, background: '#e9fff4' }} />
              <div>
                <div style={{ fontWeight: 800 }}>Hi, Anonymus</div>
                <button style={{ marginTop: 6, padding: '8px 10px', borderRadius: 8, border: 'none', background: '#0b6b58', color: '#fff' }}>Change Photo</button>
              </div>
            </div>

            <input placeholder="Name" defaultValue="Anonymus" style={{ padding: 12, borderRadius: 12, border: 'none', background: '#0b6b58', color: '#fff' }} />
            <input placeholder="Email" defaultValue="anonymus@gmail.com" style={{ padding: 12, borderRadius: 12, border: 'none', background: '#0b6b58', color: '#fff' }} />
            <input placeholder="Password" defaultValue="password1234" type="password" style={{ padding: 12, borderRadius: 12, border: 'none', background: '#0b6b58', color: '#fff' }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ ...styles.goBtn, background: '#fff', color: '#063b2f', border: '1px solid #ccc' }}>Save</button>
              <button style={{ ...styles.goBtn, background: '#fff', color: '#063b2f', border: '1px solid #ccc' }}>Log Out</button>
            </div>
          </div>
        )}

        {/* Roadmap panel (toggled by trophy) */}
        {showRoadmap && <Roadmap points={points} onClose={() => setShowRoadmap(false)} />}

        <div style={{ marginTop: 18 }}>
          <Link to="/exchangepoin" style={{ textDecoration: "underline", color: "#0b6b58", fontWeight: 700 }}>Exchange Poin?</Link>
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ background: '#7FF3DF', color: '#063b2f', padding: '10px 22px', borderRadius: 28, fontWeight: 800, display: 'inline-block' }}>Your Mission</div>
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

// Small component rendered inside the profile page to manage the pill tabs
function ProfilePills({ active, setActive }) {
  const base = { padding: '10px 22px', borderRadius: 28, fontWeight: 800, cursor: 'pointer', userSelect: 'none' };
  const activeStyle = { background: '#7FF3DF', color: '#063b2f' };
  const inactiveStyle = { background: '#2c7a5b', color: '#dffaf0' };

  const items = [
    { key: 'rank', label: 'Your Rank' },
    { key: 'assignment', label: 'Your Assignment' },
    { key: 'answer', label: 'Your Answer' },
    { key: 'edit', label: 'Edit Profile' },
  ];

  return (
    <div style={{ display: 'flex', gap: 12, rowGap: 20, marginTop: 18, marginBottom: 20, flexWrap: 'wrap' }}>
      {items.map(i => (
        <div
          key={i.key}
          onClick={() => setActive(i.key)}
          style={{ ...(active === i.key ? activeStyle : inactiveStyle), ...base }}
          aria-pressed={active === i.key}
        >
          {i.label}
        </div>
      ))}
    </div>
  );
}

// Roadmap panel component
function Roadmap({ points, onClose }) {
  const milestones = [
    { v: 0, label: 'Bronze', icon: '🥉' },
    { v: 500, label: 'Silver', icon: '🥈' },
    { v: 1000, label: 'Gold', icon: '🏆' },
    { v: 1500, label: 'Diamond', icon: '💎' },
    { v: 3000, label: 'Challanger', icon: '🏅' },
    { v: 10000, label: 'Expert', icon: '👑' },
  ];

  const max = milestones[milestones.length - 1].v;
  const pct = Math.min(100, Math.round((points / max) * 100));

  const container = { background: '#e7d2b8', borderRadius: 12, padding: 20, marginTop: 18 };
  const track = { height: 14, background: '#e6e6e6', borderRadius: 12, overflow: 'visible' };
  const fill = { height: '100%', background: '#1d6f4d', borderRadius: 12, transition: 'width 400ms' };

  return (
    <div style={container} role="dialog" aria-label="Rank roadmap">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Rank Information Detail</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: '#333' }}>{points} Poin</div>
          <button onClick={onClose} style={{ border: 'none', background: '#063b2f', color: '#fff', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }}>Close</button>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={track}>
          <div style={{ ...fill, width: `${pct}%` }} />
          {/* ticks */}
          <div style={{ position: 'relative', top: -8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              {milestones.map((m) => (
                <div key={m.v} style={{ textAlign: 'center', width: '1px', transform: 'translateY(8px)' }}>
                  <div style={{ width: 8, height: 8, background: '#0b6b58', borderRadius: 8, margin: '0 auto' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, color: '#333' }}>
          {milestones.map((m) => (
            <div key={m.v} style={{ textAlign: 'center', width: `${100 / (milestones.length)}%` }}>
              <div style={{ fontSize: 20 }}>{m.icon}</div>
              <div style={{ marginTop: 6, fontWeight: 700 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: '#555' }}>{m.v} Poin</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
