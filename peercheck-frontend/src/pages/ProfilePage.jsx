import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
    hiButton: { display: 'flex', alignItems: 'center', gap: 12, background: '#0b6b58', color: '#fff', padding: '10px 18px', borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800, outline: 'none', boxShadow: 'none', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' },
    hiIcon: { width: 28, height: 28, borderRadius: 14, background: '#d6b77a', color: '#063b2f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }
  };

  // Example static values matching the screenshot
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => (location && location.state && location.state.tab) ? location.state.tab : 'rank');
  const points = 1050;
  const next = 3000;
  // Roadmap milestones (shared with Roadmap component) so progress calculations align
  const roadmapMilestones = [
    { v: 0, label: 'Bronze', icon: '🥉' },
    { v: 500, label: 'Silver', icon: '🥈' },
    { v: 1000, label: 'Gold', icon: '🏆' },
    { v: 1500, label: 'Diamond', icon: '💎' },
    { v: 3000, label: 'Challanger', icon: '🏅' },
    { v: 10000, label: 'Expert', icon: '👑' },
  ];

  const roadmapMax = roadmapMilestones[roadmapMilestones.length - 1].v;
  const progress = Math.min(100, Math.round((points / roadmapMax) * 100));
  const [showRoadmap, setShowRoadmap] = useState(false);

  // Example data for assignments and answers
  const sampleAssignments = [
    {
      id: 1,
      title: 'Project Tingkat III',
      course: 'FR & NFR Review',
      points: 20,
      time: '10 Menit yang lalu',
      files: [
        { id: 'f1', name: 'report.pdf', type: 'pdf', size: '120KB' },
        { id: 'f2', name: 'diagram.png', type: 'image', size: '450KB', src: '/assets/sample-diagram.png' },
      ],
      reviewsCount: 5,
      reviewers: ['AA', 'BR', 'CM', 'DS', 'ER'],
    },
    { id: 2, title: 'Pengolahan PL', course: 'UML & Agile', points: 15, time: '1 Jam yang lalu', files: [{ id: 'f3', name: 'uml.zip', type: 'zip', size: '1.2MB' }], reviewsCount: 3, reviewers: ['AA','BR','CM'] },
    { id: 3, title: 'User Experience', course: 'Research Plan & Brainstorm', points: 10, time: '2 Jam yang lalu', files: [{ id: 'f4', name: 'ux-mockup.jpg', type: 'image', size: '600KB', src: '/assets/sample-mockup.jpg' }], reviewsCount: 8, reviewers: ['AA','BR','CM','DS','ER','FT','GV','HW'] },
    { id: 4, title: 'Database Optimization', course: 'Basis Data Lanjut', points: 25, time: '3 Jam yang lalu', files: [{ id: 'f5', name: 'query-plan.pdf', type: 'pdf', size: '200KB' }], reviewsCount: 2, reviewers: ['AA','BR'] },
    { id: 5, title: 'Sistem Operasi', course: 'Concurrency Assignment', points: 18, time: '8 Jam yang lalu', files: [{ id: 'f6', name: 'lab-results.csv', type: 'csv', size: '85KB' }], reviewsCount: 4, reviewers: ['AA','BR','CM','DS'] },
    { id: 6, title: 'Pemrograman Mobile', course: 'Android App', points: 30, time: '1 Hari yang lalu', files: [{ id: 'f7', name: 'app-debug.apk', type: 'apk', size: '3.4MB' }], reviewsCount: 6, reviewers: ['AA','BR','CM','DS','ER','FT'] },
  ];

  const sampleAnswers = [
    {
      id: 1,
      user: 'anonymus',
      title: 'Review on UX',
      body: "Anonymous answer submitted on another user's assignment: suggest improving the user persona and clarifying target audience.",
      points: 10,
      ratingAvg: 4.2,
      ratingCount: 5,
    },
    {
      id: 2,
      user: 'anonymus',
      title: 'Expert Review',
      body: "Anonymous answer submitted on another user's assignment: provided expert feedback on persona completeness and recommended next steps.",
      points: 12,
      ratingAvg: 4.8,
      ratingCount: 8,
    },
    {
      id: 3,
      user: 'anonymus',
      title: 'Code Quality Review',
      body: "Anonymous answer submitted on another user's assignment: notes on code structure, naming, and duplication to improve maintainability.",
      points: 8,
      ratingAvg: 3.6,
      ratingCount: 3,
    },
    {
      id: 4,
      user: 'anonymus',
      title: 'UI Suggestions',
      body: "Anonymous answer submitted on another user's assignment: suggested increasing contrast and adjusting spacing for readability.",
      points: 6,
      ratingAvg: 4.0,
      ratingCount: 2,
    },
  ];

  // Close roadmap when user navigates away from Rank tab
  useEffect(() => {
    if (activeSection !== 'rank' && showRoadmap) {
      setShowRoadmap(false);
    }
  }, [activeSection, showRoadmap]);

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

        <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}>
          <button onMouseDown={(e) => e.preventDefault()} onClick={() => setActiveSection('edit')} style={styles.hiButton} aria-label="Open profile edit">
            <span style={styles.hiIcon}>👤</span>
            <span>Hi, Anonymus</span>
          </button>
        </div>
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 12 }}>
              
              {sampleAssignments.map(a => (
                <div key={a.id} style={{ background: '#e7fff6', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{a.title}</div>
                    <div style={{ fontSize: 13, color: '#333', marginTop: 6 }}>{a.course} • {a.time}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ fontWeight: 700 }}>{a.points} Poin</div>
                    <button style={styles.goBtn} onClick={() => window.location.href = '/upload'}>Show</button>
                  </div>
                </div>

                {/* File previews (mock) */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {a.files.map(f => (
                    <div key={f.id} style={{ width: 120, borderRadius: 8, background: '#fff', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                      <div style={{ width: 88, height: 60, background: '#f3f3f3', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {f.type === 'image' ? (
                          <img src={f.src || '/assets/file-placeholder.png'} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ fontSize: 24 }}>{f.type === 'pdf' ? '📄' : f.type === 'zip' ? '🗜️' : f.type === 'apk' ? '📱' : '📁'}</div>
                        )}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: '#666' }}>{f.size}</div>
                    </div>
                  ))}
                </div>

                {/* Reviewers info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {a.reviewers.slice(0, 5).map((r, idx) => (
                      <div key={idx} title={r} style={{ width: 28, height: 28, borderRadius: 6, background: '#063b2f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r}</div>
                    ))}
                    {a.reviewsCount > 5 && <div style={{ fontSize: 12, color: '#333' }}>+{a.reviewsCount - 5} more</div>}
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: 13, color: '#333' }}>{a.reviewsCount} Reviews</div>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        {activeSection === 'answer' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {sampleAnswers.map(r => (
                <div key={r.id} style={{ background: '#f3f3f3', borderRadius: 12, padding: 18, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 60, height: 60, borderRadius: 8, background: '#fff', flex: '0 0 60px' }} />

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 800 }}>{r.user} • {r.title}</div>
                      <div style={{ fontWeight: 700, color: '#063b2f' }}>+{r.points} Poin</div>
                    </div>
                    <div style={{ marginTop: 8, color: '#444' }}>{r.body}</div>

                    <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                      <button style={{ ...styles.goBtn, background: '#fff', color: '#063b2f', border: '1px solid #ccc' }}>Go To Page</button>
                      <button style={{ ...styles.goBtn, background: '#fff', color: '#063b2f', border: '1px solid #ccc' }}>Edit</button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 12 }}>
                        <StarRating avg={r.ratingAvg} />
                        <div style={{ fontSize: 12, color: '#666' }}>({r.ratingCount})</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ width: 140, flex: '0 0 140px', textAlign: 'center' }}>
                    <div style={{ background: '#0b6b58', color: '#fff', padding: '10px 14px', borderRadius: 12, display: 'inline-block' }}>Show Review</div>
                  </div>
                </div>
              ))}
            </div>
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

        {/* Roadmap modal (toggled by trophy) */}
        {showRoadmap && (
          <Roadmap points={points} onClose={() => setShowRoadmap(false)} milestones={roadmapMilestones} />
        )}

        {/* Exchange link only visible on Rank tab */}
        {activeSection === 'rank' && (
          <div style={{ marginTop: 18 }}>
            <Link to="/exchangepoin" style={{ textDecoration: "underline", color: "#0b6b58", fontWeight: 700 }}>Exchange Poin?</Link>
          </div>
        )}

        {/* Only show missions when the Rank tab is active */}
        {activeSection === 'rank' && (
          <>
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
          </>
        )}
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

// Roadmap panel component (renders ticks/icons positioned by absolute percentage)
function Roadmap({ points, onClose, milestones }) {
  const max = milestones[milestones.length - 1].v || 1;
  const pct = Math.min(100, Math.round((points / max) * 100));

  const overlay = { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', zIndex: 1200 };
  const modal = { width: 'min(1000px, 92%)', background: '#e7d2b8', borderRadius: 12, padding: 20, boxSizing: 'border-box' };
  const trackWrap = { position: 'relative', height: 40, boxSizing: 'border-box', width: '100%' };
  const track = { height: 14, background: '#e6e6e6', borderRadius: 12, position: 'relative', width: '100%' };
  const fill = { position: 'absolute', left: 0, top: 0, height: '100%', background: '#1d6f4d', borderRadius: 12, transition: 'width 400ms' };

  const milestoneLabelStyle = {
    position: 'absolute',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    width: 120,
    boxSizing: 'border-box',
    pointerEvents: 'none',
  };

  return (
    <div style={overlay} role="dialog" aria-label="Rank roadmap modal" onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Rank Information Detail</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: '#333' }}>{points} Poin</div>
            <button onClick={onClose} style={{ border: 'none', background: '#063b2f', color: '#fff', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }} aria-label="Close roadmap">Close</button>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={trackWrap}>
            <div style={track}>
              <div style={{ ...fill, width: `${pct}%` }} />
            </div>

            {/* ticks positioned by percentage (small circles above the track) */}
            {milestones.map((m) => {
              const leftPct = (m.v / max) * 100;
              const left = `${leftPct}%`;
              return (
                <div key={m.v} style={{ position: 'absolute', left, top: -6, transform: 'translateX(-50%)' }}>
                  <div style={{ width: 10, height: 10, background: '#0b6b58', borderRadius: 10, boxShadow: '0 0 0 4px rgba(11,107,88,0.06)' }} />
                </div>
              );
            })}
          </div>

          {/* Labels placed under the track, centered on the same percentage positions. Use pointerEvents: none to allow clicks to hit modal. */}
          <div style={{ position: 'relative', marginTop: 18, minHeight: 80, width: '100%' }}>
            {milestones.map((m) => {
              const leftPct = (m.v / max) * 100;
              const left = `${leftPct}%`;
              return (
                <div key={m.v} style={{ ...milestoneLabelStyle, left }}>
                  <div style={{ fontSize: 20 }}>{m.icon}</div>
                  <div style={{ marginTop: 6, fontWeight: 700, fontSize: 13 }}>{m.label}</div>
                  <div style={{ fontSize: 12, color: '#555' }}>{m.v} Poin</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

// Small star rating renderer used for answers
function StarRating({ avg = 0 }) {
  const full = Math.floor(avg);
  const half = avg - full >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push('full');
    else if (i === full && half) stars.push('half');
    else stars.push('empty');
  }

  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {stars.map((s, idx) => (
        <span key={idx} style={{ color: s === 'empty' ? '#ccc' : '#ffbe2e', fontSize: 16 }}>
          {s === 'full' ? '★' : s === 'half' ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}
