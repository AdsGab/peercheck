import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfilePage = () => {

  const { user, logout } = useAuth();
  const [hoverMission, setHoverMission] = useState(null);
  const [hoverGoBtn, setHoverGoBtn] = useState(null);
  const [hoverPill, setHoverPill] = useState(null);

  const styles = {
  page: { fontFamily:"Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto", minHeight:"100vh", width:"100vw", display:"flex", flexDirection:"column", background:"#ffffff", color:"#0b1a1a" },

  header: { display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", padding:"18px 28px", borderBottom:"1px solid #e6e6e6", background:"#ffffff", width:"100vw", boxSizing:"border-box" },

  logo: { display:"flex", alignItems:"center", gap:10, fontWeight:700, color:"#0b6b58" },

  nav: { display:"flex", gap:18, alignItems:"center", position:"absolute", left:"50%", transform:"translateX(-50%)" },

  content: { maxWidth:1200, margin:"28px auto", padding:"0 18px", boxSizing:"border-box", width:"100%", position:"relative", zIndex:1 },

  topRow: { display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 },

  badgeRow: { display:"flex", gap:12, flexWrap:"wrap", marginTop:18 },

  badge: { background:"#2c7a5b", color:"#dffaf0", padding:"12px 24px", borderRadius:12, fontWeight:700 },

  scoreCard: { marginTop:24, padding:24, background:"#fff", borderRadius:12 },

  progressBarWrap: { marginTop:18, width:"100%" },

  progressTrack: { height:16, background:"#e9e9e9", borderRadius:14, overflow:"hidden", boxShadow:"inset 0 1px 3px rgba(0,0,0,0.15)" },

  progressFill: { height:"100%", background:"linear-gradient(90deg, #1ea97c, #159c71)", borderRadius:14, transition:"width 450ms ease-in-out", boxShadow:"0 0 12px rgba(30,169,124,0.45)" },

  missions: { marginTop:28, display:"grid", gap:14 },

  missionCard: { background:"#0f6a4e", color:"#e9fff4", padding:20, borderRadius:12, display:"flex", justifyContent:"space-between", alignItems:"center", transition:"all 260ms ease", transform:"translateY(0px)" },

  missionCardHover: { transform:"translateY(-4px)", boxShadow:"0 12px 26px rgba(0,0,0,0.18)" },

  goBtn: { background:"#21c79a", color:"#063b2f", padding:"10px 18px", borderRadius:12, border:"none", cursor:"pointer", fontWeight:700, transition:"all 200ms ease" },

  goBtnHover: { transform:"scale(1.05)", boxShadow:"0 6px 20px rgba(27, 211, 172, 0.35)" },

  pillHover: { transform:"translateY(-3px)", boxShadow:"0 8px 18px rgba(0,0,0,0.15)" },

  pillBase: { padding:"12px 26px", borderRadius:28, fontWeight:800, cursor:"pointer", userSelect:"none", transition:"all 220ms ease", display:"inline-flex", alignItems:"center", gap:8 },

  pillActive: { background:"#7FF3DF", color:"#063b2f", boxShadow:"0 4px 12px rgba(0,0,0,0.12)", transform:"translateY(0px)" },

  pillInactive: { background:"#2c7a5b", color:"#dffaf0", opacity:0.9, transform:"translateY(0px)" },

  hiButton: { display:"flex", alignItems:"center", gap:12, background:"#0b6b58", color:"#fff", padding:"10px 18px", borderRadius:30, border:"none", cursor:"pointer", fontWeight:800, outline:"none", boxShadow:"none" },

  hiIcon: { width:28, height:28, borderRadius:14, background:"#d6b77a", color:"#063b2f", display:"inline-flex", alignItems:"center", justifyContent:"center" }
  };

  // Example static values matching the screenshot
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => (location && location.state && location.state.tab) ? location.state.tab : 'rank');
  const [points, setPoints] = useState(0);
  const [pointsLoading, setPointsLoading] = useState(true);
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
  const navigate = useNavigate();
  const [userAssignments, setUserAssignments] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

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

  // Fetch user tasks
  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !user?.userId) return;
        const res = await fetch('http://localhost:4000/api/tasks', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          // Filter to only show assignments uploaded by current user
          const userUploads = data.filter(task => task.uploader_id === user.userId);
          setUserAssignments(userUploads);
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchUserTasks();
  }, [user?.userId]);

  // Fetch user reviews (answers) using user ID
  // Backend filters: answers.user_id = users.id (where users.id = userId parameter)
  useEffect(() => {
    const fetchUserReviews = async () => {
      setReviewsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token || !user?.userId) return;
        const res = await fetch(`http://localhost:4000/api/users/${user.userId}/answers`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          // Backend already filters: user_id from answers table = id from users table
          setUserReviews(data);
        }
      } catch (err) {
        console.error('Error fetching user reviews:', err);
      } finally {
        setReviewsLoading(false);
      }
    };
    fetchUserReviews();
  }, [user?.userId]);

  // Fetch user contribution points
  useEffect(() => {
    const fetchUserPoints = async () => {
      setPointsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token || !user?.userId) return;
        const res = await fetch(`http://localhost:4000/api/users/${user.userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.contribution_points) {
          setPoints(data.contribution_points);
        }
      } catch (err) {
        console.error('Error fetching user points:', err);
      } finally {
        setPointsLoading(false);
      }
    };
    fetchUserPoints();
  }, [user?.userId]);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          {/* Logo image should be placed in public/Logo.png */}
          <img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} />
        </div>

        <nav style={styles.nav}>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 700 }}>Assignment</Link>
          <Link to="/upload" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 700 }}>Upload</Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "#000", fontWeight: 700 }}>Profile</Link>
        </nav>

        <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}>
          <HiButton setActiveSection={setActiveSection} />
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
              
              {(userAssignments.length > 0 ? userAssignments : sampleAssignments).map(a => {
                const title = a.title || `${a.jurusan || ''}${a.jurusan && a.mata_kuliah ? ' - ' : ''}${a.mata_kuliah || ''}` || 'Assignment';
                const course = a.course || a.mata_kuliah || '';
                const time = a.time || (a.created_at ? new Date(a.created_at).toLocaleString() : '');
                const points = typeof a.points === 'number' ? a.points : 20;
                const files = Array.isArray(a.files) ? a.files : [];
                const reviewers = Array.isArray(a.reviewers) ? a.reviewers : [];
                const reviewsCount = typeof a.reviewsCount === 'number' ? a.reviewsCount : (reviewers.length || 0);
                return (
                  <div key={a.id} style={{ background: '#e7fff6', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{title}</div>
                        <div style={{ fontSize: 13, color: '#333', marginTop: 6 }}>{course}{time ? ` • ${time}` : ''}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <div style={{ fontWeight: 700 }}>{points || 0} Poin</div>
                        <button style={styles.goBtn} onClick={() => navigate(`/assignment/${a.id}`, { state: { uploaderId: a.uploader_id } })}>Show</button>
                      </div>
                    </div>

                    {files.length > 0 && (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {files.map((f, idx) => (
                          <div key={f.id ?? idx} style={{ width: 120, borderRadius: 8, background: '#fff', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                            <div style={{ width: 88, height: 60, background: '#f3f3f3', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              {f.type === 'image' ? (
                                <img src={f.src || '/assets/file-placeholder.png'} alt={f.name || f.filename || 'file'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <div style={{ fontSize: 24 }}>📄</div>
                              )}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>{f.name || f.filename || 'file'}</div>
                            {f.size && (<div style={{ fontSize: 11, color: '#666' }}>{f.size}</div>)}
                          </div>
                        ))}
                      </div>
                    )}

                    {(reviewers.length > 0 || reviewsCount > 0) && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          {reviewers.slice(0, 5).map((r, idx) => (
                            <div key={idx} title={r} style={{ width: 28, height: 28, borderRadius: 6, background: '#063b2f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r}</div>
                          ))}
                          {reviewsCount > 5 && <div style={{ fontSize: 12, color: '#333' }}>+{reviewsCount - 5} more</div>}
                        </div>
                        <div style={{ marginLeft: 'auto', fontSize: 13, color: '#333' }}>{reviewsCount} Reviews</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeSection === 'answer' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {reviewsLoading ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading reviews...</div>
              ) : userReviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>No reviews submitted yet</div>
              ) : (
                userReviews.map(r => {
                  // Find the task title from userAssignments
                  const task = userAssignments.find(a => a.id === r.task_id);
                  const taskTitle = task?.title || `${task?.jurusan || ''}${task?.jurusan && task?.mata_kuliah ? ' - ' : ''}${task?.mata_kuliah || ''}` || 'Assignment';
                  
                  return (
                    <div key={r.id} style={{ background: '#f3f3f3', borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 800 }}>{taskTitle}</div>
                          <div style={{ marginTop: 4, fontSize: 13, color: '#666' }}>Your Review</div>
                        </div>
                        <div style={{ fontWeight: 700, color: '#063b2f' }}>+{r.points || 0} Poin</div>
                      </div>
                      <div style={{ marginTop: 4, color: '#444', lineHeight: '1.5' }}>{r.content}</div>

                      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                        <button style={{ ...styles.goBtn, background: '#02B692', color: '#fff' }} onClick={() => navigate(`/assignment/${r.task_id}`)}>
                          Show Review
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

{/*Sprint 2*/}
        {/* Edit section moved to EditProfilePage.jsx */}

        {/* Roadmap modal (toggled by trophy) */}
        {showRoadmap && (
          <Roadmap points={points} onClose={() => setShowRoadmap(false)} milestones={roadmapMilestones} />
        )}

        {/* (Modal rendered via `UploadModal` component above) */}

        {/* Exchange link only visible on Rank tab */}
        {activeSection === 'rank' && (
          <div style={{ marginTop: 18 }}>
            <Link to="/exchangepoin" style={{ textDecoration: "underline", color: "#02B692", fontWeight: 700 }}>Exchange Poin?</Link>
          </div>
        )}

        {/* Only show missions when the Rank tab is active */}
        {activeSection === 'rank' && (
          <>
            <div style={{ marginTop: 12 }}>
              <div style={{ background: '#7FF3DF', color: '#063b2f', padding: '10px 22px', borderRadius: 28, fontWeight: 800, display: 'inline-block' }}>Your Mission</div>
            </div>

            <section style={styles.missions}>
          <div
        style={ hoverMission === "upload"
    ? { ...styles.missionCard, ...styles.missionCardHover }
    : styles.missionCard
  }
  
/*Sprint 1*/
  onMouseEnter={() => setHoverMission("upload")}
  onMouseLeave={() => setHoverMission(null)}
>
  <div>
    <div style={{ fontWeight: 800 }}>Upload Assignment</div>
    <div style={{ opacity: 0.9, marginTop: 6 }}>Earn 20 Poin</div>
  </div>

  <button
    style={
      hoverGoBtn === "upload"
        ? { ...styles.goBtn, ...styles.goBtnHover }
        : styles.goBtn
    }
    onMouseEnter={() => setHoverGoBtn("upload")}
    onMouseLeave={() => setHoverGoBtn(null)}
    onClick={() => { navigate("/upload"); }}
  >
    Go To Page!
  </button>
</div>

<div
  style={ hoverMission === "review"
    ? { ...styles.missionCard, ...styles.missionCardHover }
    : styles.missionCard
  }
  onMouseEnter={() => setHoverMission("review")}
  onMouseLeave={() => setHoverMission(null)}
>
  <div>
    <div style={{ fontWeight: 800 }}>Review Assignment</div>
    <div style={{ opacity: 0.9, marginTop: 6 }}>Earn 50 Poin</div>
  </div>

  <button
    style={
      hoverGoBtn === "review"
        ? { ...styles.goBtn, ...styles.goBtnHover }
        : styles.goBtn
    }
    onMouseEnter={() => setHoverGoBtn("review")}
    onMouseLeave={() => setHoverGoBtn(null)}
  >
    Go To Page!
  </button>
</div>

<div
  style={ hoverMission === "comment"
    ? { ...styles.missionCard, ...styles.missionCardHover }
    : styles.missionCard
  }
  onMouseEnter={() => setHoverMission("comment")}
  onMouseLeave={() => setHoverMission(null)}
>
  <div>
    <div style={{ fontWeight: 800 }}>Leave a Comment/Ratings</div>
    <div style={{ opacity: 0.9, marginTop: 6 }}>Earn 10 Poin</div>
  </div>

  <button
    style={
      hoverGoBtn === "comment"
        ? { ...styles.goBtn, ...styles.goBtnHover }
        : styles.goBtn
    }
    onMouseEnter={() => setHoverGoBtn("comment")}
    onMouseLeave={() => setHoverGoBtn(null)}
  >
    Go To Page!
  </button>
</div>

            </section>
          </>
        )}
      </main>
    </div>
  );
};

// Small component rendered inside the profile page to manage the pill tabs
//Sprint 1
function ProfilePills({ active, setActive }) {

  const [hover, setHover] = React.useState(null);

  const base = {
    padding: "12px 26px",
    borderRadius: 28,
    fontWeight: 800,
    cursor: "pointer",
    userSelect: "none",
    transition: "all 220ms ease",
    display: "inline-flex",
    alignItems: "center",
    gap: 8
  };

  const activeStyle = {
    background: "#7FF3DF",
    color: "#063b2f",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    transform: "translateY(0px)"
  };

  const inactiveStyle = {
    background: "#02B692",
    color: "#e9fff4",
    opacity: 0.95,
    transform: "translateY(0px)"
  };

  const hoverStyle = {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.18)"
  };

  const items = [
    { key: "rank", label: "🏆 Your Rank" },
    { key: "assignment", label: "📄 Your Assignment" },
    { key: "answer", label: "✏️ Your Review" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        rowGap: 20,
        marginTop: 18,
        marginBottom: 20,
        flexWrap: "wrap"
      }}
    >
      {items.map(i => (
        <div
          key={i.key}
          onClick={() => setActive(i.key)}
          onMouseEnter={() => setHover(i.key)}
          onMouseLeave={() => setHover(null)}
          style={{
            ...(active === i.key ? activeStyle : inactiveStyle),
            ...(hover === i.key ? hoverStyle : {}),
            ...base
          }}
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
  // Space ticks evenly across the track regardless of numeric gaps.
  const count = milestones.length;
  // Calculate fill percentage based on actual user points
  const fillPct = Math.min(100, Math.round((points / max) * 100));

  const overlay = { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.12)', zIndex: 1200 };
  const modal = { width: 'min(1000px, 92%)', background: '#e7d2b8', borderRadius: 12, padding: 24, boxSizing: 'border-box' };
  const trackWrap = { position: 'relative', height: 24, boxSizing: 'border-box', width: '100%', marginTop: 12 };
  const track = { height: 18, background: '#02B692', borderRadius: 12, position: 'relative', width: '100%' };
  const fill = { position: 'absolute', left: 0, top: 0, height: '100%', background: '#f7c400', borderRadius: '12px 0 0 12px', transition: 'width 400ms' };

  return (
    <div style={overlay} role="dialog" aria-label="Rank roadmap modal" onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ margin: 0 }}>Rank Information Detail</h2>
          <div style={{ marginTop: 6, fontSize: 13, color: '#333' }}>{points} Poin</div>
        </div>

        <div style={{ marginTop: 18, position: 'relative' }}>
          <div style={trackWrap}>
            <div style={track}>
              <div style={{ ...fill, width: `${fillPct}%` }} />
            </div>

            {/* ticks positioned by percentage (small circles above the track) */}
            {milestones.map((m, idx) => {
              // position ticks evenly by index, not by numeric value
              const leftPct = Math.round((idx / Math.max(1, count - 1)) * 100);
              const left = `${leftPct}%`;
              return (
                <div key={m.v} style={{ position: 'absolute', left, top: -6, transform: 'translateX(-50%)' }}>
                  <div style={{ width: 10, height: 10, background: '#02B692', borderRadius: 10 }} />
                </div>
              );
            })}

            {/* labels placed under the track and aligned to the same percentage positions as the ticks */}
            {milestones.map((m, idx) => {
              const leftPct = Math.round((idx / Math.max(1, count - 1)) * 100);
              const left = `${leftPct}%`;
              return (
                <div key={m.v} style={{ position: 'absolute', left, top: 30, transform: 'translateX(-50%)', width: 120, textAlign: 'center' }}>
                  <div style={{ fontSize: 22 }}>{m.icon}</div>
                  <div style={{ marginTop: 6, fontWeight: 800, fontSize: 14 }}>{m.label}</div>
                  <div style={{ marginTop: 2, color: '#555', fontSize: 13 }}>{m.v} Poin</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 140 }}>
          <button onClick={onClose} style={{ border: 'none', background: '#063b2f', color: '#fff', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }} aria-label="Close roadmap">Close</button>
        </div>
      </div>
    </div>
  );
}

// Upload modal used when user clicks 'Change Photo' in edit panel
// Moved to EditProfilePage.jsx

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

function HiButton({ setActiveSection }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setShowDropdown(!showDropdown)} 
        style={{ display: "flex", alignItems: "center", gap: 12, background: "#0b6b58", color: "#fff", padding: "10px 18px", borderRadius: 30, border: "none", cursor: "pointer", fontWeight: 800, outline: "none", boxShadow: "none" }} 
        aria-label="Open profile menu"
      >
        <span style={{ width: 28, height: 28, borderRadius: 14, background: "#d6b77a", color: "#063b2f", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>👤</span>
        <span>Hi, {user?.username || 'Anonymus'}</span>
      </button>
      
      {showDropdown && (
        <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', padding: 8, minWidth: 160, zIndex: 1000 }}>
          <div 
            onClick={() => navigate('/edit-profile')}
            style={{ padding: '10px 12px', cursor: 'pointer', fontWeight: 600, color: '#063b2f', borderRadius: 8, transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#e7fff6'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            Edit Profile
          </div>
          <div 
            onClick={() => { try { logout && logout(); } catch (_) { }; localStorage.removeItem('token'); navigate('/login'); }}
            style={{ padding: '10px 12px', cursor: 'pointer', fontWeight: 600, color: '#d32f2f', borderRadius: 8, transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#ffebee'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}
