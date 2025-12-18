import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// ⭐ 1. Import Auth Hook
import useAuth from "../hooks/useAuth"; 

const BASE_API_URL = "http://localhost:4000/api";

const ProfilePage = () => {
  // ⭐ 2. Hooks for Logic
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  // --- STATE MANAGEMENT ---
  const [hoverMission, setHoverMission] = useState(null);
  const [hoverGoBtn, setHoverGoBtn] = useState(null);
  // (hoverPill was unused in friend's code but kept for safety)
  const [hoverPill, setHoverPill] = useState(null);

  // Data State
  const [myAssignments, setMyAssignments] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  
  // Profile Form State
  const [nameInput, setNameInput] = useState('Anonymus');
  const [emailInput, setEmailInput] = useState('anonymus@gmail.com');

  // UI Toggles
  const [activeSection, setActiveSection] = useState(() => (location && location.state && location.state.tab) ? location.state.tab : 'rank');
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Static Data for UI elements not yet in backend
  const points = 1050; 
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

  // --- STYLES (EXACT COPY FROM FRIEND'S CODE) ---
  const styles = {
    page: { fontFamily:"Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto", minHeight:"100vh", width:"100vw", display:"flex", flexDirection:"column", background:"#ffffff", color:"#0b1a1a" },
    header: { display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", padding:"18px 28px", borderBottom:"1px solid #e6e6e6" },
    logo: { display:"flex", alignItems:"center", gap:10, fontWeight:700, color:"#0b6b58" },
    nav: { display:"flex", gap:18, alignItems:"center", position:"absolute", left:"50%", transform:"translateX(-50%)" },
    content: { maxWidth:1200, margin:"28px auto", padding:"0 18px", boxSizing:"border-box" },
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
    hiIcon: { width:28, height:28, borderRadius:14, background:"#d6b77a", color:"#063b2f", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800 }
  };

  // --- LOGIC INTEGRATION ---
  
  // 1. Load User Data
  useEffect(() => {
    if (user) {
        setNameInput(user.username || 'Anonymus');
        setEmailInput(user.email || 'anonymus@gmail.com');
    }
  }, [user]);

  // 2. Fetch Assignments
  useEffect(() => {
    if (!user) return;
    const fetchMyAssignments = async () => {
      const token = localStorage.getItem('token');
      setLoadingAssignments(true);
      try {
        const response = await fetch(`${BASE_API_URL}/tasks/my`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setMyAssignments(data); 
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoadingAssignments(false);
      }
    };
    fetchMyAssignments();
  }, [user]);

  // 3. Helper for Date
  const formatTimeAgo = (dbDate) => {
    if (!dbDate) return 'Baru saja';
    const diff = Math.floor((Date.now() - new Date(dbDate)) / 60000);
    if (diff < 60) return `${diff} Menit yang lalu`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} Jam yang lalu`;
    return `${Math.floor(hours / 24)} Hari yang lalu`;
  };

  // 4. Sample Answers (Reviews) - Kept static for now as backend doesn't support yet
  const sampleAnswers = [
    { id: 1, user: 'anonymus', title: 'Review on UX', body: "Anonymous answer submitted on another user's assignment...", points: 10, ratingAvg: 4.2, ratingCount: 5 },
    { id: 2, user: 'anonymus', title: 'Expert Review', body: "Anonymous answer submitted on another user's assignment...", points: 12, ratingAvg: 4.8, ratingCount: 8 },
    { id: 3, user: 'anonymus', title: 'Code Quality Review', body: "Notes on code structure, naming, and duplication...", points: 8, ratingAvg: 3.6, ratingCount: 3 },
    { id: 4, user: 'anonymus', title: 'UI Suggestions', body: "Suggested increasing contrast and adjusting spacing...", points: 6, ratingAvg: 4.0, ratingCount: 2 },
  ];

  // --- HANDLERS (Friend's Logic + Auth) ---
  useEffect(() => {
    if (activeSection !== 'rank' && showRoadmap) setShowRoadmap(false);
  }, [activeSection, showRoadmap]);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.type || !f.type.startsWith('image/')) { setUploadMsg('Please select an image file.'); return; }
    if (f.size > 5 * 1024 * 1024) { setUploadMsg('Image too large (max 5MB).'); return; }
    setSelectedFile(f); setUploadMsg('');
  }

  function closeUploadModal() {
    setSelectedFile(null); setShowUploadModal(false); setUploadMsg('');
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  async function handleConfirmUpload(file) {
    if (!file) return;
    setUploadMsg('Saving...');
    try {
      const b64 = await fileToBase64(file);
      const pending = { ts: Date.now(), fileName: file.name, dataUrl: b64 };
      localStorage.setItem('profilePhotoPending', JSON.stringify(pending));
      setUploadMsg('Saved locally.');
      setSelectedFile(null); setShowUploadModal(false);
    } catch (e) { setUploadMsg('Failed to store photo locally.'); }
  }

  async function handleSaveProfile() {
    setUploadMsg('Profile saved.');
    if (selectedFile) await handleConfirmUpload(selectedFile);
  }

  // --- RENDER ---
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} />
        </div>

        <nav style={styles.nav}>
          <Link to="/dashboard" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 600 }}>Assignment</Link>
          <Link to="/upload" style={{ textDecoration: "none", color: "#0b6b58", fontWeight: 700 }}>Upload</Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "#000", fontWeight: 700 }}>Profile</Link>
        </nav>

        <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}>
          <button onMouseDown={(e) => e.preventDefault()} onClick={() => setActiveSection('edit')} style={styles.hiButton} aria-label="Open profile edit">
            <span style={styles.hiIcon}>👤</span>
            {/* ⭐ Dynamic User Name */}
            <span>Hi, {user?.username || 'Anonymus'}</span>
          </button>
        </div>
      </header>

      <main style={styles.content}>
        <ProfilePills active={activeSection} setActive={setActiveSection} />

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
                    <button onClick={() => setShowRoadmap(true)} aria-label="Show roadmap" style={{ width: 80, height: 80, borderRadius: 12, background: "#ffd27a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: 'none', cursor: 'pointer' }}>🏆</button>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>Keep Going</div>
                      <div style={{ fontSize: 13, color: "#666", marginTop: 6 }}>Progress towards next rank</div>
                    </div>
                  </div>
                </div>
                <div style={{ width: 320 }}>
                  <div style={styles.progressBarWrap}>
                    <div style={styles.progressTrack}><div style={{ ...styles.progressFill, width: `${progress}%` }} /></div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "#666" }}>
                      <span>0 Poin</span><span>500 Poin</span><span>1000 Poin</span><span>1500 Poin</span><span>3000 Poin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ⭐ DYNAMIC ASSIGNMENT SECTION (Friend's UI + Your Logic) */}
        {activeSection === 'assignment' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 12 }}>
              
              {loadingAssignments && <p style={{textAlign: 'center', color: '#666'}}>Loading assignments...</p>}
              
              {/* Mapping Real Backend Data */}
              {myAssignments.map(a => (
                <div key={a.id} style={{ background: '#e7fff6', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 800 }}>{a.mata_kuliah || "No Title"}</div>
                      <div style={{ fontSize: 13, color: '#333', marginTop: 6 }}>{a.jurusan} • {formatTimeAgo(a.created_at)}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div style={{ fontWeight: 700 }}>20 Poin</div> 
                      {/* ⭐ Fixed Button Navigation */}
                      <button 
                        style={styles.goBtn} 
                        onClick={() => navigate(`/assignment/${a.id}`)}
                      >
                        Show
                      </button>
                    </div>
                  </div>

                  {/* Mock File UI (Preserving layout even if files aren't fetched yet) */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <div style={{ width: 120, borderRadius: 8, background: '#fff', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                      <div style={{ width: 88, height: 60, background: '#f3f3f3', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: 24 }}>📄</div>
                      <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>
                        {a.description ? (a.description.length > 10 ? a.description.substring(0, 10)+'...' : a.description) : 'File'}
                      </div>
                      <div style={{ fontSize: 11, color: '#666' }}>PDF/DOC</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: '#063b2f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>AA</div>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: '#063b2f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>BR</div>
                    </div>
                    <div style={{ marginLeft: 'auto', fontSize: 13, color: '#333' }}>2 Reviews</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ⭐ YOUR REVIEW SECTION (RESTORED FRIEND'S UI) */}
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
                      {/* ⭐ Fixed Button Navigation (Safe Fallback) */}
                      <button 
                        style={{ ...styles.goBtn, background: '#fff', color: '#063b2f', border: '1px solid #ccc' }}
                        onClick={() => navigate(r.assignment_id ? `/assignment/${r.assignment_id}` : '/dashboard')}
                      >
                        Go To Page
                      </button>
                      <button style={{ ...styles.goBtn, background: '#fff', color: '#063b2f', border: '1px solid #ccc' }}>Edit</button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 12 }}>
                        <StarRating avg={r.ratingAvg} />
                        <div style={{ fontSize: 12, color: '#666' }}>({r.ratingCount})</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: 140, flex: '0 0 140px', textAlign: 'center' }}>
                    <div style={{ background: '#02B692', color: '#fff', padding: '10px 14px', borderRadius: 12, display: 'inline-block' }}>Show Review</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ⭐ EDIT PROFILE SECTION (Connected to State) */}
        {activeSection === 'edit' && (
          <div style={{ background:"#ffffff", padding:24, borderRadius:16, boxShadow:"0 12px 28px rgba(0,0,0,0.12)", maxWidth:600, display:"flex", flexDirection:"column", gap:18 }}>
            <div style={{ display:"flex", gap:16, alignItems:"center" }}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width:75, height:75, borderRadius:40, objectFit:"cover", boxShadow:"0 4px 14px rgba(0,0,0,0.18)" }} />
              ) : (
                <div style={{ width:75, height:75, borderRadius:40, background:"#e9fff4", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>👤</div>
              )}
              <div>
                <div style={{ fontWeight:800, fontSize:18, color:"#063b2f" }}>Hi, {nameInput}</div>
                <button onClick={() => setShowUploadModal(true)} style={{ marginTop:8, padding:"8px 12px", borderRadius:10, background:"#1BC9A2", border:"none", color:"#063b2f", fontWeight:700, cursor:"pointer", transition:"all 220ms ease", boxShadow:"0 4px 10px rgba(27,201,162,0.25)" }}>Change Photo</button>
              </div>
            </div>

            <input placeholder="Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} style={{ padding:14, borderRadius:12, border:"1px solid #d4e7df", background:"#f7fffc", color:"#063b2f", fontWeight:600, boxShadow:"0 3px 10px rgba(0,0,0,0.06)" }} />
            <input placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={{ padding:14, borderRadius:12, border:"1px solid #d4e7df", background:"#f7fffc", color:"#063b2f", fontWeight:600, boxShadow:"0 3px 10px rgba(0,0,0,0.06)" }} />
            <input placeholder="Password" type="password" defaultValue="password1234" disabled style={{ padding:14, borderRadius:12, border:"1px solid #d4e7df", background:"#f7fffc", color:"#063b2f", fontWeight:600, boxShadow:"0 3px 10px rgba(0,0,0,0.06)" }} />

            <div style={{ display:"flex", gap:12, marginTop:6 }}>
              <button onClick={() => setShowSaveConfirm(true)} style={{ flex:1, padding:"12px 18px", borderRadius:14, background:"#0b6b58", color:"#fff", border:"none", fontWeight:800, cursor:"pointer", transition:"all 240ms ease", boxShadow:"0 6px 18px rgba(0,0,0,0.18)" }}>Save</button>
              <button onClick={() => { logout(); navigate('/login'); }} style={{ flex:1, padding:"12px 18px", borderRadius:14, background:"#fff", color:"#063b2f", border:"1px solid #c7d8d3", fontWeight:800, cursor:"pointer", transition:"all 240ms ease", boxShadow:"0 4px 12px rgba(0,0,0,0.1)" }}>Log Out</button>
            </div>
            {uploadMsg && (<div style={{ fontSize:13, color:"#444", marginTop:6 }}>{uploadMsg}</div>)}
          </div>
        )}

        {showUploadModal && <UploadModal onClose={closeUploadModal} selectedFile={selectedFile} setSelectedFile={setSelectedFile} onConfirm={handleConfirmUpload} />}
        {showSaveConfirm && <SaveConfirmModal onClose={() => setShowSaveConfirm(false)} onConfirm={async () => { await handleSaveProfile(); setShowSaveConfirm(false); }} />}
        {showRoadmap && <Roadmap points={points} onClose={() => setShowRoadmap(false)} milestones={roadmapMilestones} />}

        {/* MISSION CARDS */}
        {activeSection === 'rank' && (
          <>
            <div style={{ marginTop: 18 }}><Link to="/exchangepoin" style={{ textDecoration: "underline", color: "#02B692", fontWeight: 700 }}>Exchange Poin?</Link></div>
            <div style={{ marginTop: 12 }}><div style={{ background: '#7FF3DF', color: '#063b2f', padding: '10px 22px', borderRadius: 28, fontWeight: 800, display: 'inline-block' }}>Your Mission</div></div>
            <section style={styles.missions}>
              <div 
                style={hoverMission === "upload" ? { ...styles.missionCard, ...styles.missionCardHover } : styles.missionCard} 
                onMouseEnter={() => setHoverMission("upload")} 
                onMouseLeave={() => setHoverMission(null)}
              >
                <div><div style={{ fontWeight: 800 }}>Upload Assignment</div><div style={{ opacity: 0.9, marginTop: 6 }}>Earn 20 Poin</div></div>
                <button 
                  style={hoverGoBtn === "upload" ? { ...styles.goBtn, ...styles.goBtnHover } : styles.goBtn} 
                  onMouseEnter={() => setHoverGoBtn("upload")} 
                  onMouseLeave={() => setHoverGoBtn(null)} 
                  onClick={() => navigate("/upload")}
                >Go To Page!</button>
              </div>

              <div 
                style={hoverMission === "review" ? { ...styles.missionCard, ...styles.missionCardHover } : styles.missionCard} 
                onMouseEnter={() => setHoverMission("review")} 
                onMouseLeave={() => setHoverMission(null)}
              >
                <div><div style={{ fontWeight: 800 }}>Review Assignment</div><div style={{ opacity: 0.9, marginTop: 6 }}>Earn 50 Poin</div></div>
                <button 
                  style={hoverGoBtn === "review" ? { ...styles.goBtn, ...styles.goBtnHover } : styles.goBtn} 
                  onMouseEnter={() => setHoverGoBtn("review")} 
                  onMouseLeave={() => setHoverGoBtn(null)} 
                  onClick={() => navigate("/dashboard")}
                >Go To Page!</button>
              </div>

              <div 
                style={hoverMission === "comment" ? { ...styles.missionCard, ...styles.missionCardHover } : styles.missionCard} 
                onMouseEnter={() => setHoverMission("comment")} 
                onMouseLeave={() => setHoverMission(null)}
              >
                <div><div style={{ fontWeight: 800 }}>Leave a Comment/Ratings</div><div style={{ opacity: 0.9, marginTop: 6 }}>Earn 10 Poin</div></div>
                <button 
                  style={hoverGoBtn === "comment" ? { ...styles.goBtn, ...styles.goBtnHover } : styles.goBtn} 
                  onMouseEnter={() => setHoverGoBtn("comment")} 
                  onMouseLeave={() => setHoverGoBtn(null)} 
                  onClick={() => navigate("/dashboard")}
                >Go To Page!</button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS (Unchanged from Friend's Code) ---

function ProfilePills({ active, setActive }) {
  const [hover, setHover] = React.useState(null);
  const base = { padding: "12px 26px", borderRadius: 28, fontWeight: 800, cursor: "pointer", userSelect: "none", transition: "all 220ms ease", display: "inline-flex", alignItems: "center", gap: 8 };
  const activeStyle = { background: "#7FF3DF", color: "#063b2f", boxShadow: "0 4px 12px rgba(0,0,0,0.12)", transform: "translateY(0px)" };
  const inactiveStyle = { background: "#02B692", color: "#e9fff4", opacity: 0.95, transform: "translateY(0px)" };
  const hoverStyle = { transform: "translateY(-3px)", boxShadow: "0 8px 20px rgba(0,0,0,0.18)" };
  const items = [{ key: "rank", label: "🏆 Your Rank" }, { key: "assignment", label: "📄 Your Assignment" }, { key: "answer", label: "✏️ Your Review" }, { key: "edit", label: "⚙️ Edit Profile" }];

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
  const count = milestones.length;
  const fillTo = 1000;
  const fillIndex = Math.max(0, Math.min(count - 1, milestones.findIndex(m => m.v === fillTo)));
  const fillPct = Math.round((fillIndex / Math.max(1, count - 1)) * 100);
  const overlay = { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.12)', zIndex: 1200 };
  const modal = { width: 'min(1000px, 92%)', background: '#e7d2b8', borderRadius: 12, padding: 24, boxSizing: 'border-box' };
  const trackWrap = { position: 'relative', height: 24, boxSizing: 'border-box', width: '100%', marginTop: 12 };
  const track = { height: 18, background: '#02B692', borderRadius: 12, position: 'relative', width: '100%' };
  const fill = { position: 'absolute', left: 0, top: 0, height: '100%', background: '#f7c400', borderRadius: '12px 0 0 12px', transition: 'width 400ms' };

  return (
    <div style={overlay} onClick={onClose}><div style={modal} onClick={(e) => e.stopPropagation()}><div style={{ textAlign: 'center' }}><h2 style={{ margin: 0 }}>Rank Information Detail</h2><div style={{ marginTop: 6, fontSize: 13, color: '#333' }}>{points} Poin</div></div><div style={{ marginTop: 18, position: 'relative' }}><div style={trackWrap}><div style={track}><div style={{ ...fill, width: `${fillPct}%` }} /></div>{milestones.map((m, idx) => (<div key={m.v} style={{ position: 'absolute', left: `${Math.round((idx / Math.max(1, count - 1)) * 100)}%`, top: 30, transform: 'translateX(-50%)', width: 120, textAlign: 'center' }}><div style={{ fontSize: 22 }}>{m.icon}</div><div style={{ marginTop: 6, fontWeight: 800, fontSize: 14 }}>{m.label}</div></div>))}</div></div><div style={{ display: 'flex', justifyContent: 'center', marginTop: 140 }}><button onClick={onClose} style={{ border: 'none', background: '#063b2f', color: '#fff', padding: '8px 14px', borderRadius: 8, cursor: 'pointer' }}>Close</button></div></div></div>
  );
}

function UploadModal({ onClose, selectedFile, setSelectedFile, onConfirm }) {
  const overlay = { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#02B692cc', zIndex: 1400 };
  return <div style={overlay} onClick={onClose}><div style={{ width: 'min(720px, 92%)', background: '#e7e7e7', borderRadius: 12, padding: 28 }} onClick={e => e.stopPropagation()}><div style={{ display: 'flex', justifyContent: 'space-between' }}><div>Upload Photo</div><button onClick={onClose}>Close</button></div><div style={{ width: '100%', height: 220, background: '#efefef', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 16 }} onClick={() => document.getElementById('profile-upload-input').click()}>{selectedFile ? <img src={URL.createObjectURL(selectedFile)} style={{ maxHeight: 160 }} /> : "Select image"}</div><input id="profile-upload-input" type="file" onChange={e => setSelectedFile(e.target.files[0])} style={{ display: 'none' }} /><button onClick={() => onConfirm(selectedFile)} style={{ marginTop: 10 }}>Confirm</button></div></div>;
}

function SaveConfirmModal({ onClose, onConfirm }) {
  const overlay = { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(2,182,146,0.35)', zIndex: 1400 };
  return <div style={overlay} onClick={onClose}><div style={{ width: 380, background: '#e7fff4', borderRadius: 12, padding: 20 }} onClick={e => e.stopPropagation()}><div>Confirm Save</div><button onClick={onConfirm}>Yes</button><button onClick={onClose}>Cancel</button></div></div>;
}

function StarRating({ avg = 0 }) {
  return <div style={{ display: 'flex', gap: 2 }}>{[...Array(5)].map((_, i) => (<span key={i} style={{ color: i < Math.floor(avg) ? '#ffbe2e' : '#ccc' }}>★</span>))}</div>;
}

export default ProfilePage;