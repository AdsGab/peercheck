import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; 

// --- CONSTANTS ---
const BASE_API_URL = "http://localhost:4000/api";
const INITIAL_PROFILE_STATE = {
    name: 'Anonymus',
    email: 'anonymus@gmail.com',
    points: 1050, 
    rank: 'Gold', 
};

// --- DUMMY DATA (Only retaining for Answer section, Assignment section is dynamic) ---
const sampleAnswers = [
    { id: 1, user: 'anonymus', title: 'Review on UX', body: "Anonymous answer submitted on another user's assignment: suggest improving the user persona and clarifying target audience.", points: 10, ratingAvg: 4.2, ratingCount: 5 },
    { id: 2, user: 'anonymus', title: 'Expert Review', body: "Anonymous answer submitted on another user's assignment: provided expert feedback on persona completeness and recommended next steps.", points: 12, ratingAvg: 4.8, ratingCount: 8 },
    { id: 3, user: 'anonymus', title: 'Code Quality Review', body: "Anonymous answer submitted on another user's assignment: notes on code structure, naming, and duplication to improve maintainability.", points: 8, ratingAvg: 3.6, ratingCount: 3 },
    { id: 4, user: 'anonymus', title: 'UI Suggestions', body: "Anonymous answer submitted on another user's assignment: suggested increasing contrast and adjusting spacing for readability.", points: 6, ratingAvg: 4.0, ratingCount: 2 },
];


// --- DYNAMIC PROFILE PAGE COMPONENT ---
const ProfilePage = () => {
    // --- 1. USER & AUTH CONTEXT ---
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();
    const location = useLocation();

    // --- 2. LOCAL PROFILE & FETCH STATE ---
    const [userProfile, setUserProfile] = useState(INITIAL_PROFILE_STATE);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [profileError, setProfileError] = useState(null);
    
    // STATE: Assignments and Assignment Loading
    const [myAssignments, setMyAssignments] = useState([]);
    const [loadingAssignments, setLoadingAssignments] = useState(false);
    
    // Form States
    const [nameInput, setNameInput] = useState(INITIAL_PROFILE_STATE.name);
    const [emailInput, setEmailInput] = useState(INITIAL_PROFILE_STATE.email);
    const [passwordInput, setPasswordInput] = useState('password1234');
    
    // UI States
    const [activeSection, setActiveSection] = useState(() => 
        (location && location.state && location.state.tab) ? location.state.tab : 'rank'
    );
    const [showRoadmap, setShowRoadmap] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showSaveConfirm, setShowSaveConfirm] = useState(false);
    const [uploadMsg, setUploadMsg] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user && user.userId) {
            const fetchUserProfile = async () => {
                setLoadingProfile(true);

                try {
                    // MOCK API SUCCESS: Simulate receiving personalized data
                    const mockData = {
                        name: user.username || 'User ' + user.userId.substring(0, 4), 
                        email: user.email || `${user.username}@peeru.com`,
                        points: 1050, 
                        rank: 'Gold',
                    };

                    setUserProfile(mockData);
                    setNameInput(mockData.name);
                    setEmailInput(mockData.email);

                } catch (e) {
                    console.error("Profile fetch failed:", e);
                    setProfileError("Failed to load profile data.");
                } finally {
                    setLoadingProfile(false);
                }
            };
            fetchUserProfile();
        } else {
            setLoadingProfile(false);
        }
    }, [user, navigate]);


    // ⭐ CRITICAL EFFECT: Fetch Assignments uploaded by the user (Corrected timing)
    useEffect(() => {
        if (!user || !user.userId) {
            setMyAssignments([]);
            setLoadingAssignments(false);
            return; 
        }

        const fetchMyAssignments = async () => {
            const token = localStorage.getItem('token');
            setLoadingAssignments(true);
            
            if (!token) {
                 setLoadingAssignments(false);
                 setProfileError("Authentication token is missing. Please log in.");
                 return;
            }

            try {
                const response = await fetch(`${BASE_API_URL}/tasks/my`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    const status = response.status;
                    let errorMessage = 'Failed to fetch user assignments';
                    
                    try {
                        const errorBody = await response.json();
                        errorMessage = errorBody.error || errorMessage;
                    } catch {
                        errorMessage = `API Status ${status}: Check token validity.`;
                    }
                    
                    throw new Error(`[${status}] API Error: ${errorMessage}`);
                }

                const data = await response.json();
                setMyAssignments(data); 

            } catch (err) {
                console.error("My Assignments Fetch Error:", err);
                if (err.message.indexOf("401") === -1) {
                    setProfileError(err.message); 
                }
                setMyAssignments([]);
            } finally {
                setLoadingAssignments(false);
            }
        };

        fetchMyAssignments();
        
    }, [user]); 


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
        goBtn: { background: "#21c79a", color: "#063b2f", padding: "10px 18px", borderRadius: 12, border: "none", cursor: 'pointer', fontWeight: 700 },
        pillBase: { padding: '10px 22px', borderRadius: 28, fontWeight: 800, cursor: 'pointer', userSelect: 'none' },
        pillActive: { background: '#7FF3DF', color: '#063b2f' },
        pillInactive: { background: '#02B692', color: '#dffaf0' }, 
        hiButton: { display: 'flex', alignItems: 'center', gap: 12, background: '#0b6b58', color: '#fff', padding: '10px 18px', borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800, outline: 'none', boxShadow: 'none', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' },
        hiIcon: { width: 28, height: 28, borderRadius: 14, background: '#d6b77a', color: '#063b2f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800 }
    };

    // --- UI Logic based on state ---
    const points = userProfile.points; 
    const currentRank = userProfile.rank; 
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

    // Helper to map DB date to simple time string
    const formatTimeAgo = (dbDate) => {
        if (!dbDate) return 'undefined';
        const now = new Date();
        const past = new Date(dbDate);
        const diffInMinutes = Math.floor((now - past) / (1000 * 60));
        if (diffInMinutes < 60) return `${diffInMinutes} Menit yang lalu`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} Jam yang lalu`;
        return `${Math.floor(diffInHours / 24)} Hari yang lalu`;
    };


    // --- UI/MODAL HANDLERS ---
    useEffect(() => {
        if (activeSection !== 'rank' && showRoadmap) {
            setShowRoadmap(false);
        }
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
        return new Promise((resolve) => resolve('mock_base64_data')); 
    }
    
    async function handleSaveProfile() {
        setUploadMsg('Saving...');
        
        await new Promise(resolve => setTimeout(resolve, 500)); 
        setUserProfile(prev => ({ ...prev, name: nameInput, email: emailInput }));
        setUploadMsg('Profile details updated successfully.');
        
        if (selectedFile) {
            setUploading(true);
            try {
                const b64 = await fileToBase64(selectedFile);
                const pending = { ts: Date.now(), fileName: selectedFile.name, dataUrl: b64 };
                localStorage.setItem('profilePhotoPending', JSON.stringify(pending));
                setUploadMsg('Profile saved (Photo pending upload).');
            } catch(e) {
                setUploadMsg('Failed to store photo locally.');
            } finally {
                setUploading(false);
            }
        }
    }
    
    const handleLogout = () => {
        logout(); 
        navigate('/login');
    };

    // --- LOADING/ERROR UI ---
    if (loadingProfile) {
        return <div style={{...styles.page, justifyContent: 'center', alignItems: 'center'}}>Loading Profile...</div>;
    }
    if (profileError) {
        return <div style={{...styles.page, justifyContent: 'center', alignItems: 'center', color: 'red'}}>Error: {profileError}</div>;
    }


    return (
        <div style={styles.page}>
            {/* Header with Dynamic HiButton */}
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
                    <button 
                        onMouseDown={(e) => e.preventDefault()} 
                        onClick={() => setActiveSection('edit')} 
                        style={styles.hiButton} 
                        aria-label="Open profile edit"
                    >
                        <span style={styles.hiIcon}>👤</span>
                        <span>Hi, {userProfile.name}</span>
                    </button>
                </div>
            </header>

            <main style={styles.content}>
                {/* Interactive pills for profile sections */}
                <ProfilePills active={activeSection} setActive={setActiveSection} />

                {/* --- RANK SECTION --- */}
                {activeSection === 'rank' && (
                    <>
                        <div style={styles.topRow}>
                            <div>
                                <h2 style={{ margin: 0, fontSize: 32 }}>{points} Poin, Your Rank Now Is :</h2>
                                <div style={{ marginTop: 8, fontWeight: 700, fontSize: 18 }}>{currentRank}, Good Job !</div>
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


                {/* --- ASSIGNMENT SECTION (Dynamic) --- */}
                {activeSection === 'assignment' && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            
                            {/* Loading/Empty State Messages */}
                            {loadingAssignments && <p style={{ textAlign: 'center', color: '#666' }}>Loading your assignments...</p>}

                            {!loadingAssignments && myAssignments.length === 0 && (
                                <p style={{ textAlign: 'center', color: '#666' }}>You have not uploaded any assignments yet.</p>
                            )}

                            {/* List fetched assignments */}
                            {!loadingAssignments && myAssignments.length > 0 && myAssignments.map(a => (
                                <div key={a.id} style={{ background: '#e7fff6', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: 800 }}>{a.jurusan} - {a.mata_kuliah}</div>
                                            <div style={{ fontSize: 13, color: '#333', marginTop: 6 }}>{a.tingkat} • {formatTimeAgo(a.created_at)}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                            <div style={{ fontWeight: 700 }}>20 Poin</div> 
                                            <button style={styles.goBtn} onClick={() => navigate('/upload')}>Show</button>
                                        </div>
                                    </div>

                                    {/* File previews (Mocked structure based on static data) */}
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        <div style={{ width: 120, borderRadius: 8, background: '#fff', padding: 8, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                                            <div style={{ width: 88, height: 60, background: '#f3f3f3', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: 24 }}>📄</div>
                                            <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>{a.description && a.description.length > 10 ? a.description.substring(0, 10) + '...' : 'File'}</div>
                                            <div style={{ fontSize: 11, color: '#666' }}>PDF/DOC</div>
                                        </div>
                                    </div>

                                    {/* Reviewers info (Mocked structure) */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                            <div key={1} style={{ width: 28, height: 28, borderRadius: 6, background: '#063b2f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>AA</div>
                                            <div key={2} style={{ width: 28, height: 28, borderRadius: 6, background: '#063b2f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>BR</div>
                                            <div style={{ fontSize: 12, color: '#333' }}>+3 more</div>
                                        </div>
                                        <div style={{ marginLeft: 'auto', fontSize: 13, color: '#333' }}>5 Reviews</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- ANSWER SECTION (Uses re-included sampleAnswers) --- */}
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
                                        <div style={{ background: '#02B692', color: '#fff', padding: '10px 14px', borderRadius: 12, display: 'inline-block' }}>Show Review</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- EDIT PROFILE SECTION --- */}
                {activeSection === 'edit' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 600 }}>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            {/* Avatar preview or placeholder */}
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" style={{ width: 60, height: 60, borderRadius: 30, objectFit: 'cover', background: '#e9fff4' }} />
                            ) : (
                                <div style={{ width: 60, height: 60, borderRadius: 30, background: '#e9fff4' }} />
                            )}

                            <div>
                                <div style={{ fontWeight: 800 }}>Hi, {userProfile.name}</div>
                                <button onClick={() => setShowUploadModal(true)} style={{ marginTop: 6, padding: '8px 10px', borderRadius: 8, border: 'none', background: '#02B692', color: '#fff' }}>Change Photo</button>
                            </div>
                        </div>

                        {/* DYNAMIC, CONTROLLED INPUTS */}
                        <input placeholder="Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} style={{ padding: 12, borderRadius: 12, border: 'none', background: '#02B692', color: '#fff' }} />
                        <input placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={{ padding: 12, borderRadius: 12, border: 'none', background: '#02B692', color: '#fff' }} />
                        <input placeholder="Password" defaultValue={passwordInput} type="password" disabled style={{ padding: 12, borderRadius: 12, border: 'none', background: '#02B692', color: '#fff' }} />
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={() => setShowSaveConfirm(true)} style={{ ...styles.goBtn, background: '#fff', color: '#063b2f', border: '1px solid #ccc' }}>Save</button>
                            <button onClick={handleLogout} style={{ ...styles.goBtn, background: '#fff', color: '#063b2f', border: '1px solid #ccc' }}>Log Out</button> 
                        </div>

                        {/* Upload / status message */}
                        {uploadMsg && (<div style={{ fontSize: 13, color: '#333' }}>{uploadMsg}</div>)}
                    </div>
                )}

                {/* --- MODALS & FOOTER --- */}
                {showUploadModal && (
                    <UploadModal
                        onClose={closeUploadModal}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        onConfirm={async (file) => { await handleSaveProfile(file); setShowUploadModal(false); }}
                    />
                )}
                {showSaveConfirm && (
                    <SaveConfirmModal onClose={() => setShowSaveConfirm(false)} onConfirm={async () => { await handleSaveProfile(); setShowSaveConfirm(false); }} />
                )}
                {showRoadmap && (
                    <Roadmap points={points} onClose={() => setShowRoadmap(false)} milestones={roadmapMilestones} />
                )}

                {/* Exchange link and missions sections */}
                {activeSection === 'rank' && (
                    <>
                        <div style={{ marginTop: 18 }}>
                            <Link to="/exchangepoin" style={{ textDecoration: "underline", color: "#02B692", fontWeight: 700 }}>Exchange Poin?</Link>
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
                                <button style={styles.goBtn} onClick={() => { navigate("/upload"); }}>Go To Page!</button>
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

export default ProfilePage;


// --- HELPER COMPONENTS ---

function ProfilePills({ active, setActive }) {
  const base = { padding: '10px 22px', borderRadius: 28, fontWeight: 800, cursor: 'pointer', userSelect: 'none' };
  const activeStyle = { background: '#7FF3DF', color: '#063b2f' };
  const inactiveStyle = { background: '#02B692', color: '#dffaf0' };

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

function Roadmap({ points, onClose, milestones }) {
  const max = milestones[milestones.length - 1].v || 1;
  const count = milestones.length;
  const fillTo = 1000;
  const fillIndex = Math.max(0, Math.min(count - 1, milestones.findIndex(m => m.v === fillTo)));
  const resolvedFillIndex = fillIndex >= 0 ? fillIndex : (() => {
    let best = 0; let bestDiff = Infinity;
    milestones.forEach((m, i) => {
      const d = Math.abs(m.v - fillTo);
      if (d < bestDiff) { best = i; bestDiff = d; }
    });
    return best;
  })();
  const fillPct = Math.round((resolvedFillIndex / Math.max(1, count - 1)) * 100);

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
              const leftPct = Math.round((idx / Math.max(1, count - 1)) * 100);
              const left = `${leftPct}%`;
              return (
                <div key={m.v} style={{ position: 'absolute', left, top: -6, transform: 'translateX(-50%)' }}>
                  <div style={{ width: 10, height: 10, background: '#02B692', borderRadius: 10 }} />
                </div>
              );
            })}

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

function UploadModal({ onClose, selectedFile, setSelectedFile, onConfirm }) {
  const overlay = { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.12)', zIndex: 1400 };
  const modal = { width: 'min(720px, 92%)', background: 'transparent', borderRadius: 12, padding: 20, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' };
  const inner = { width: '100%', background: '#e7e7e7', borderRadius: 12, padding: 28, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 };
  const drop = { width: '100%', maxWidth: 640, height: 220, borderRadius: 10, background: '#efefef', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 12, border: '2px dashed rgba(0,0,0,0.06)' };
  const confirmBtn = { marginTop: 10, padding: '10px 26px', borderRadius: 12, background: '#02B692', color: '#063b2f', border: 'none', fontWeight: 700, cursor: 'pointer' };

  function handleDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) setSelectedFile(f);
  }

  function handleDragOver(e) { e.preventDefault(); }

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (f) setSelectedFile(f);
  }

  return (
    <div style={overlay} role="dialog" aria-label="Upload photo modal" onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <div style={inner}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800 }}>Upload Photo</div>
            <button onClick={onClose} style={{ background: '#063b2f', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }}>Close</button>
          </div>

          <div
            style={drop}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('profile-upload-input') && document.getElementById('profile-upload-input').click()}
            aria-label="Select or drag image"
          >
            {selectedFile && selectedFile.type && selectedFile.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(selectedFile)} alt="preview" style={{ maxHeight: 160, maxWidth: '100%', borderRadius: 8 }} />
            ) : (
              <>
                <div style={{ fontSize: 28 }}>⬆️</div>
                <div style={{ fontWeight: 700 }}>Upload Image</div>
                <div style={{ fontSize: 13, color: '#666' }}>Select or drag an image here</div>
              </>
            )}
            <input id="profile-upload-input" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </div>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => { onConfirm && onConfirm(selectedFile); }}
              style={confirmBtn}
              disabled={!selectedFile}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaveConfirmModal({ onClose, onConfirm }) {
  const overlay = { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(2,182,146,0.35)', zIndex: 1400 };
  const box = { width: 380, background: '#e7fff4', borderRadius: 12, padding: 20, boxSizing: 'border-box', textAlign: 'center', color: '#063b2f' };
  const btnRow = { display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12 };
  const okBtn = { background: '#02B692', color: '#063b2f', padding: '8px 18px', borderRadius: 10, border: 'none', fontWeight: 800, cursor: 'pointer' };
  const cancelBtn = { background: '#fff', color: '#063b2f', padding: '8px 18px', borderRadius: 10, border: '1px solid #ccc', cursor: 'pointer' };

  return (
    <div style={overlay} onClick={onClose} role="dialog" aria-label="Save confirmation">
      <div style={box} onClick={(e) => e.stopPropagation()}>
        <div style={{ fontWeight: 900, fontSize: 18 }}>Confirm Save</div>
        <div style={{ marginTop: 8, color: '#0b6b58' }}>Do you want to save the changes to your profile?</div>
        <div style={btnRow}>
          <button onClick={() => { onConfirm && onConfirm(); onClose && onClose(); }} style={okBtn}>Yes, Save</button>
          <button onClick={onClose} style={cancelBtn}>Cancel</button>
        </div>
      </div>
      </div>
  );
}

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