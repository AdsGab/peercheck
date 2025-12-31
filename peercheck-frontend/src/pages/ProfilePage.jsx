import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfilePage = () => {

  const { user, logout } = useAuth();
  const userId = user?.id || user?.userId;

  const [hoverMission, setHoverMission] = useState(null);
  const [hoverGoBtn, setHoverGoBtn] = useState(null);

  // --- STYLES ---
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
    
    // 🔥 UPDATED STYLES FOR THE "SECOND SQUARE" LAYOUT
    flexRow: { display: "flex", gap: "12px", alignItems: "stretch" },
    
    // Your Original Left Card Style
    originalCard: { flex: 1, background: '#e7fff6', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 },
    
    // The New "Second Square" (Stats)
    statsCard: { width: "280px", background: "#52B79A", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", color: "#fff", gap: 12, flexShrink: 0 },
    
    showReviewBtn: { background: "#436E62", color: "#fff", border: "none", borderRadius: "20px", padding: "10px 20px", fontWeight: 700, fontSize: "13px", cursor: "pointer", marginTop: "5px" }
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(() => (location && location.state && location.state.tab) ? location.state.tab : 'rank');
  const [showRoadmap, setShowRoadmap] = useState(false);

  // --- STATE FOR DATA ---
  const [points, setPoints] = useState(0); 
  const [userAssignments, setUserAssignments] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [, setReviewsLoading] = useState(true);

  // --- ROADMAP CONFIG ---
  const roadmapMilestones = [
    { v: 0, label: 'Bronze', icon: '🥉' },
    { v: 500, label: 'Silver', icon: '🥈' },
    { v: 1000, label: 'Gold', icon: '🏆' },
    { v: 1500, label: 'Diamond', icon: '💎' },
    { v: 3000, label: 'Challenger', icon: '🏅' },
    { v: 10000, label: 'Expert', icon: '👑' },
  ];

  const roadmapMax = roadmapMilestones[roadmapMilestones.length - 1].v;
  const progress = Math.min(100, Math.round((points / roadmapMax) * 100));
  const currentRankObj = [...roadmapMilestones].reverse().find(m => points >= m.v) || roadmapMilestones[0];

  // --- DATA FETCHING ---
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        // 1. Fetch Points
        const userRes = await fetch(`http://localhost:4000/api/users/${userId}`, { headers });
        const userData = await userRes.json();
        if (userData.contribution_points !== undefined) setPoints(userData.contribution_points);

        // 2. 🔥 FETCH TASKS (Using /my to get review_count)
        const tasksRes = await fetch('http://localhost:4000/api/tasks/my', { headers });
        const tasksData = await tasksRes.json();
        if (Array.isArray(tasksData)) {
          setUserAssignments(tasksData);
        }

        // 3. Fetch Reviews
        const reviewsRes = await fetch(`http://localhost:4000/api/users/${userId}/answers`, { headers });
        const reviewsData = await reviewsRes.json();
        if (Array.isArray(reviewsData)) {
          setUserReviews(reviewsData);
        }
      } catch (err) { console.error(err); } 
      finally { setReviewsLoading(false); }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (activeSection !== 'rank' && showRoadmap) setShowRoadmap(false);
  }, [activeSection, showRoadmap]);


  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
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
        <ProfilePills active={activeSection} setActive={setActiveSection} />

        {/* --- RANK TAB --- */}
        {activeSection === 'rank' && (
          <>
            <div style={styles.topRow}>
              <div>
                <h2 style={{ margin: 0, fontSize: 32 }}>{points} Poin, Your Rank Now Is :</h2>
                <div style={{ marginTop: 8, fontWeight: 700, fontSize: 18 }}>{currentRankObj.label}, Good Job !</div>
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
                      <span>{points} / {roadmapMax}</span>
                      <span>{roadmapMax} Poin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* --- 🔥 UPDATED: ASSIGNMENT TAB --- */}
        {activeSection === 'assignment' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 12 }}>
              
              {(userAssignments.length > 0 ? userAssignments : []).map(a => {
                const title = a.description || a.mata_kuliah || 'Assignment';
                const course = a.jurusan || '';
                const time = a.created_at ? new Date(a.created_at).toLocaleDateString() : '';
                const files = Array.isArray(a.files) ? a.files : [];

                return (
                  <div key={a.id} style={styles.flexRow}>
                    
                    {/* 1. LEFT SIDE (YOUR ORIGINAL STYLE) */}
                    <div style={styles.originalCard}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 800 }}>{title}</div>
                          <div style={{ fontSize: 13, color: '#333', marginTop: 6 }}>{course} • {time}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <div style={{ fontWeight: 700 }}>20 Poin</div>
                        </div>
                      </div>
                      
                      {/* Files from your original code */}
                      {files.length > 0 ? (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {files.map((f, idx) => (
                            <div key={f.id ?? idx} style={{ width: 120, borderRadius: 8, background: '#fff', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                              <div style={{ width: 88, height: 60, background: '#f3f3f3', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                 <div style={{ fontSize: 24 }}>📄</div>
                              </div>
                              <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>{f.original_name || f.filename || 'file'}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Fallback purely for design matching if no files
                         <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: '13px', fontWeight: 600 }}>
                            <span style={{ fontSize: '16px' }}>📄</span> {title}
                         </div>
                      )}
                    </div>

                    {/* 2. RIGHT SIDE (THE NEW "SECOND SQUARE" FOR STATS) */}
                    <div style={styles.statsCard}>
                      <div style={{ fontWeight: 700, fontSize: "16px", lineHeight: "1.4" }}>
                         {a.review_count > 0 
                            ? `${a.review_count} People Already Review Your Assignment!` 
                            : "No reviews yet."}
                      </div>
                      
                      <button 
                        style={styles.showReviewBtn} 
                        onClick={() => navigate(`/assignment/${a.id}`)}
                      >
                        Show Review
                      </button>
                    </div>

                  </div>
                );
              })}
              {userAssignments.length === 0 && <div style={{textAlign:'center', color:'#666', padding:40}}>No assignments uploaded yet.</div>}
            </div>
          </div>
        )}

        {/* --- ANSWER/REVIEW TAB --- */}
        {activeSection === 'answer' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {userReviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>No reviews submitted yet</div>
              ) : (
                userReviews.map(r => {
                  const task = userAssignments.find(a => a.id === r.task_id);
                  const taskTitle = task?.title || task?.mata_kuliah || 'Assignment Task';
                  
                  return (
                    <div key={r.id || r.task_id} style={{ background: '#f3f3f3', borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 800 }}>{taskTitle}</div>
                          <div style={{ marginTop: 4, fontSize: 13, color: '#666' }}>Your Review</div>
                        </div>
                        <div style={{ fontWeight: 700, color: '#063b2f' }}>+{r.points || 20} Poin</div>
                      </div>
                      <div style={{ marginTop: 4, color: '#444', lineHeight: '1.5' }}>{r.content}</div>
                      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                        <button 
                          style={{ ...styles.goBtn, background: '#02B692', color: '#fff' }} 
                          onClick={() => navigate(`/assignment/${r.task_id}`)}
                        >
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

        {showRoadmap && (
          <Roadmap points={points} onClose={() => setShowRoadmap(false)} milestones={roadmapMilestones} />
        )}

        {activeSection === 'rank' && (
          <>
            <div style={{ marginTop: 18 }}>
              <Link to="/exchangepoin" style={{ textDecoration: "underline", color: "#02B692", fontWeight: 700 }}>Exchange Poin?</Link>
            </div>
            
            <div style={{ marginTop: 12 }}>
              <div style={{ background: '#7FF3DF', color: '#063b2f', padding: '10px 22px', borderRadius: 28, fontWeight: 800, display: 'inline-block' }}>Your Mission</div>
            </div>

            <section style={styles.missions}>
              {/* Mission 1: Upload Assignment */}
              {userAssignments.length === 0 && (
                <div style={ hoverMission === "upload" ? { ...styles.missionCard, ...styles.missionCardHover } : styles.missionCard } onMouseEnter={() => setHoverMission("upload")} onMouseLeave={() => setHoverMission(null)}>
                  <div><div style={{ fontWeight: 800 }}>Upload Assignment</div><div style={{ opacity: 0.9, marginTop: 6 }}>Earn 20 Poin</div></div>
                  <button style={ hoverGoBtn === "upload" ? { ...styles.goBtn, ...styles.goBtnHover } : styles.goBtn } onMouseEnter={() => setHoverGoBtn("upload")} onMouseLeave={() => setHoverGoBtn(null)} onClick={() => { navigate("/upload"); }}>Go To Page!</button>
                </div>
              )}

              {/* Mission 2: Review Assignment */}
              {userReviews.length === 0 && (
                <div style={ hoverMission === "review" ? { ...styles.missionCard, ...styles.missionCardHover } : styles.missionCard } onMouseEnter={() => setHoverMission("review")} onMouseLeave={() => setHoverMission(null)}>
                  <div><div style={{ fontWeight: 800 }}>Review Assignment</div><div style={{ opacity: 0.9, marginTop: 6 }}>Earn 50 Poin</div></div>
                  <button style={ hoverGoBtn === "review" ? { ...styles.goBtn, ...styles.goBtnHover } : styles.goBtn } onMouseEnter={() => setHoverGoBtn("review")} onMouseLeave={() => setHoverGoBtn(null)} onClick={() => navigate("/dashboard")}>Go To Page!</button>
                </div>
              )}

              <div style={ hoverMission === "comment" ? { ...styles.missionCard, ...styles.missionCardHover } : styles.missionCard } onMouseEnter={() => setHoverMission("comment")} onMouseLeave={() => setHoverMission(null)}>
                <div><div style={{ fontWeight: 800 }}>Leave a Comment/Ratings</div><div style={{ opacity: 0.9, marginTop: 6 }}>Earn 10 Poin</div></div>
                <button style={ hoverGoBtn === "comment" ? { ...styles.goBtn, ...styles.goBtnHover } : styles.goBtn } onMouseEnter={() => setHoverGoBtn("comment")} onMouseLeave={() => setHoverGoBtn(null)} onClick={() => navigate("/dashboard")}>Go To Page!</button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

// --- SUB COMPONENTS ---

function ProfilePills({ active, setActive }) {
  const [hover, setHover] = React.useState(null);
  const base = { padding: "12px 26px", borderRadius: 28, fontWeight: 800, cursor: "pointer", userSelect: "none", transition: "all 220ms ease", display: "inline-flex", alignItems: "center", gap: 8 };
  const activeStyle = { background: "#7FF3DF", color: "#063b2f", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", transform: "translateY(0px)" };
  const inactiveStyle = { background: "#02B692", color: "#e9fff4", opacity: 0.95, transform: "translateY(0px)" };
  const hoverStyle = { transform: "translateY(-3px)", boxShadow: "0 8px 20px rgba(0,0,0,0.18)" };
  const items = [ { key: "rank", label: "🏆 Your Rank" }, { key: "assignment", label: "📄 Your Assignment" }, { key: "answer", label: "✏️ Your Review" }, ];
  return (
    <div style={{ display: "flex", gap: 12, rowGap: 20, marginTop: 18, marginBottom: 20, flexWrap: "wrap" }}>
      {items.map(i => (
        <div key={i.key} onClick={() => setActive(i.key)} onMouseEnter={() => setHover(i.key)} onMouseLeave={() => setHover(null)} style={{ ...(active === i.key ? activeStyle : inactiveStyle), ...(hover === i.key ? hoverStyle : {}), ...base }}>
          {i.label}
        </div>
      ))}
    </div>
  );
}

function Roadmap({ points, onClose, milestones }) {
  const max = milestones[milestones.length - 1].v || 1;
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
            {milestones.map((m, idx) => {
              const leftPct = Math.round((idx / Math.max(1, milestones.length - 1)) * 100);
              return (
                <div key={m.v} style={{ position: 'absolute', left: `${leftPct}%`, top: -6, transform: 'translateX(-50%)' }}>
                  <div style={{ width: 10, height: 10, background: '#02B692', borderRadius: 10 }} />
                </div>
              );
            })}
            {milestones.map((m, idx) => {
              const leftPct = Math.round((idx / Math.max(1, milestones.length - 1)) * 100);
              return (
                <div key={m.v} style={{ position: 'absolute', left: `${leftPct}%`, top: 30, transform: 'translateX(-50%)', width: 120, textAlign: 'center' }}>
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

function HiButton() {
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

export default ProfilePage;