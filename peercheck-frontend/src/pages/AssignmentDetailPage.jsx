import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth"; 

const BASE_API_URL = "http://localhost:4000/api";

// --- CONSTANTS FOR CONSISTENT STYLING ---
const ACCENT_COLOR_LIGHT = "#4DF3C8";
const ACCENT_COLOR_DARK = "#063b2f"; 
const BG_COLOR = "#F8F8F8";
const CARD_BG = "white";
const TEXT_COLOR_PRIMARY = "#2C2C2C";
const TEXT_COLOR_SECONDARY = "#666";

const uploadPageStyles = { 
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', padding: '18px 28px', borderBottom: '1px solid #e6e6e6', background: CARD_BG, width: '100vw', boxSizing: 'border-box' },
    logo: { display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, color: '#0b6b58' },
    nav: { display: 'flex', gap: 18, alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
    link: { color: '#0b6b58', textDecoration: 'none', fontWeight: 700 }, 
    hiButton: { display: 'flex', alignItems: 'center', gap: 12, background: '#0b6b58', color: '#fff', padding: '10px 18px', borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800 },
    hiIcon: { width: 28, height: 28, borderRadius: 14, background: '#d6b77a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#063b2f' },
};

function HiButton() {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <button onClick={() => navigate('/profile', { state: { tab: 'edit' } })} style={uploadPageStyles.hiButton}>
            <span style={uploadPageStyles.hiIcon}>👤</span>
            <span>Hi, {user?.username || 'Guest'}</span>
        </button>
    );
}

function AppNavbar({ activePage }) {
    const linkStyle = (page) => ({ ...uploadPageStyles.link, textDecoration: 'none', color: activePage === page ? '#000' : uploadPageStyles.link.color, fontWeight: 700 });
    return (
        <header style={uploadPageStyles.header}>
            <div style={uploadPageStyles.logo}><img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} /></div>
            <nav style={uploadPageStyles.nav}>
                <Link to="/dashboard" style={linkStyle('assignment')}>Assignment</Link>
                <Link to="/upload" style={linkStyle('upload')}>Upload</Link>
                <Link to="/profile" style={linkStyle('profile')}>Profile</Link>
            </nav>
            <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}><HiButton /></div>
        </header>
    );
}

const AssignmentDetailPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const { user } = useAuth() || {};
    const navigate = useNavigate();
    const uploaderId = location.state?.uploaderId;
    
    // Data State
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    // Answer State
    const [myAnswer, setMyAnswer] = useState(null); 
    const [inputContent, setInputContent] = useState(""); 
    const [submitting, setSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // ⭐ NEW: Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showOtherAnswers, setShowOtherAnswers] = useState(false);
    const [otherAnswers, setOtherAnswers] = useState([]);
    const [loadingAnswers, setLoadingAnswers] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const taskRes = await fetch(`${BASE_API_URL}/tasks/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
                if (taskRes.ok) setTask(await taskRes.json());

                const answerRes = await fetch(`${BASE_API_URL}/tasks/${id}/answer`, { headers: { 'Authorization': `Bearer ${token}` } });
                const answerData = await answerRes.json();
                if (answerRes.ok && answerData) setMyAnswer(answerData);
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        fetchData();
    }, [id]);

    const handleSubmitOrUpdate = async () => {
        if (!inputContent.trim()) return alert("Please write an answer!");
        setSubmitting(true);
        const token = localStorage.getItem('token');
        try {
            const method = isEditing ? "PUT" : "POST";
            const res = await fetch(`${BASE_API_URL}/tasks/${id}/answer`, {
                method: method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ content: inputContent })
            });
            if (res.ok) {
                setMyAnswer({ ...myAnswer, content: inputContent, updated_at: new Date().toISOString() });
                setIsEditing(false);
            } else alert("Failed to save");
        } catch (err) { alert("Error saving"); } 
        finally { setSubmitting(false); }
    };

    // ⭐ NEW: Handle Confirmed Delete
    const handleConfirmDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${BASE_API_URL}/tasks/${id}/answer`, {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setMyAnswer(null); // Clear answer from screen
                setInputContent(""); // Clear text box
                setShowDeleteModal(false); // Close modal
            } else {
                alert("Failed to delete");
            }
        } catch (err) {
            alert("Error deleting");
        }
    };

    const handleStartEdit = () => {
        setInputContent(myAnswer.content);
        setIsEditing(true);
    };

    // ⭐ NEW: Fetch all answers for this task (excluding current user)
    const handleShowOtherAnswers = async () => {
        setLoadingAnswers(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${BASE_API_URL}/tasks/${id}`, { 
                headers: { 'Authorization': `Bearer ${token}` } 
            });
            const taskData = await res.json();
            
            // Filter out current user's answer
            const filtered = taskData.answers?.filter(ans => ans.user_id !== user?.userId) || [];
            setOtherAnswers(filtered);
            setShowOtherAnswers(true);
        } catch (err) { 
            console.error(err);
            alert("Error loading answers");
        } finally {
            setLoadingAnswers(false);
        }
    };

    const getFileIcon = (filename) => {
        if (!filename) return "📄";
        const ext = filename.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return "🖼️";
        if (ext === 'pdf') return "📕";
        return "📄";
    };

    // --- STYLES ---
    const styles = {
        page: { fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: BG_COLOR, width: "100%", display: 'flex', flexDirection: 'column' },
        mainContent: { padding: "28px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "30px", flex: 1, width: '100%', boxSizing: 'border-box' },
        topStrip: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", fontWeight: 700, fontSize: "14px" },
        userInfo: { display: 'flex', alignItems: 'center', gap: '15px', flex: 1 },
        avatarCircle: { width: '50px', height: '50px', backgroundColor: '#d6b77a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '24px' },
        infoTags: { display: 'flex', gap: '12px', alignItems: 'center' },
        infoTag: { background: ACCENT_COLOR_DARK, color: '#fff', padding: '8px 16px', borderRadius: '12px', fontWeight: 600, fontSize: '14px' },
        greenBox: { backgroundColor: CARD_BG, borderRadius: '15px', padding: '30px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)' },
        descriptionTitle: { marginTop: 0, fontWeight: 700, fontSize: '16px', marginBottom: '15px', color: ACCENT_COLOR_DARK },
        descriptionText: { fontSize: '16px', lineHeight: '1.6', marginBottom: '20px', whiteSpace: 'pre-wrap', color: TEXT_COLOR_PRIMARY },
        fileList: { display: 'flex', flexDirection: 'column', gap: '12px' },
        filePill: { backgroundColor: '#f5f5f5', borderRadius: '12px', padding: '12px 16px', width: 'fit-content', minWidth: '300px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, fontSize: '14px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textDecoration: 'none', color: ACCENT_COLOR_DARK, cursor: 'pointer', transition: 'all 200ms ease' },
        answerArea: { backgroundColor: CARD_BG, borderRadius: '15px', padding: '30px', minHeight: '300px', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)' },
        textArea: { width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px', resize: 'none', flex: 1, marginTop: '15px', color: '#555', fontFamily: 'inherit' },
        footerButtons: { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', position: 'relative' },
        btnUpload: { backgroundColor: ACCENT_COLOR_DARK, color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '25px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 200ms ease' },
        btnEdit: { backgroundColor: ACCENT_COLOR_DARK, color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '25px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 200ms ease' },
        btnDelete: { backgroundColor: 'transparent', color: ACCENT_COLOR_DARK, border: '1px solid ' + ACCENT_COLOR_DARK, padding: '12px 30px', borderRadius: '25px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 200ms ease' },
        showOtherLink: { position: 'absolute', right: 0, bottom: 10, textDecoration: 'underline', fontWeight: 700, fontSize: '14px', color: ACCENT_COLOR_DARK, cursor: 'pointer', border: 'none', background: 'transparent', padding: 0 },
        
        // ⭐ OTHER ANSWERS MODAL STYLES
        answersModalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', boxSizing: 'border-box' },
        answersModalBox: { width: '100%', maxWidth: '900px', backgroundColor: CARD_BG, borderRadius: '15px', padding: '30px', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' },
        answersModalHeader: { fontSize: '20px', fontWeight: '800', marginBottom: '20px', color: ACCENT_COLOR_DARK, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        closeBtn: { background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: ACCENT_COLOR_DARK, padding: 0 },
        answerCard: { backgroundColor: BG_COLOR, borderRadius: '12px', padding: '18px', marginBottom: '15px', borderLeft: `4px solid ${ACCENT_COLOR_DARK}` },
        answerContent: { fontSize: '14px', lineHeight: '1.6', color: TEXT_COLOR_PRIMARY, marginTop: '10px', whiteSpace: 'pre-wrap' },
        
        // ⭐ MODAL STYLES
        modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
        modalBox: { width: '400px', backgroundColor: ACCENT_COLOR_LIGHT, borderRadius: '15px', padding: '30px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', color: '#fff' },
        modalTitle: { fontSize: '20px', fontWeight: '800', marginBottom: '25px', color: '#fff' },
        modalButtons: { display: 'flex', justifyContent: 'center', gap: '15px' },
        modalBtnDelete: { backgroundColor: ACCENT_COLOR_DARK, color: '#fff', padding: '10px 30px', borderRadius: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
        modalBtnCancel: { backgroundColor: 'transparent', color: '#fff', padding: '10px 30px', borderRadius: '20px', border: '2px solid #fff', fontWeight: 'bold', cursor: 'pointer' }
    };

    if (loading) return <div style={{padding:50, textAlign:'center'}}>Loading...</div>;
    if (!task) return <div style={{padding:50, textAlign:'center'}}>Task not found</div>;

    // Check if current user is the uploader
    const isUploader = user?.userId === task.uploader_id;

    

    return (
        <div style={styles.page}>
            <AppNavbar activePage="assignment" />

            <main style={styles.mainContent}>
                <div style={styles.topStrip}>
                    <div style={styles.userInfo}>
                        <div style={styles.avatarCircle}>👤</div>
                        <span style={{ color: TEXT_COLOR_PRIMARY, fontWeight: 700 }}>{task.uploader_name || "Unknown User"}</span>
                    </div>
                    <div style={styles.infoTags}>
                        <div style={styles.infoTag}>{task.jurusan}</div>
                        <div style={styles.infoTag}>{task.mata_kuliah}</div>
                        <div style={styles.infoTag}>{task.tingkat}</div>
                    </div>
                </div>

                <div style={styles.greenBox}>
                    <h3 style={styles.descriptionTitle}>Deskripsi :</h3>
                    <div style={styles.descriptionText}>{task.description}</div>
                    <div style={styles.fileList}>
                        {task.files && task.files.map((file, index) => (
                            <a key={index} href={`http://localhost:4000/${file.file_path.replace(/\\/g, "/")}`} target="_blank" rel="noreferrer" style={styles.filePill}>
                                <span style={{fontSize: '18px'}}>{getFileIcon(file.original_name)}</span> {file.original_name}
                            </a>
                        ))}
                    </div>
                </div>

                <div style={styles.answerArea}>
                    {isUploader ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: TEXT_COLOR_SECONDARY }}>
                            <div style={{ fontSize: '16px', fontWeight: 700, color: ACCENT_COLOR_DARK, marginBottom: '10px' }}>
                                👋 You cannot review your own assignment
                            </div>
                            <div style={{ fontSize: '14px', marginBottom: '20px' }}>
                                You are the uploader of this assignment. Check other assignments to submit reviews and earn points!
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button style={{...styles.btnUpload, justifyContent: 'center'}} onClick={() => navigate('/dashboard')}>
                                    ← Back to Assignments
                                </button>
                                <button style={{...styles.btnEdit, justifyContent: 'center'}} onClick={handleShowOtherAnswers} disabled={loadingAnswers}>
                                    {loadingAnswers ? 'Loading...' : '👀 View Reviews'}
                                </button>
                            </div>
                        </div>
                    ) : !myAnswer || isEditing ? (
                        <>
                            <h3 style={{...styles.descriptionTitle, color: ACCENT_COLOR_DARK}}>
                                {isEditing ? "Edit Your Answer..." : "Write Your Answer Here..."}
                            </h3>
                            <textarea 
                                style={styles.textArea} 
                                placeholder="Ketik feedback anda di sini..."
                                value={inputContent}
                                onChange={(e) => setInputContent(e.target.value)}
                            />
                            <div style={styles.footerButtons}>
                                <button style={styles.btnUpload} onClick={handleSubmitOrUpdate} disabled={submitting}>
                                    <span>{isEditing ? "💾" : "⬆"}</span> 
                                    {submitting ? "Saving..." : (isEditing ? "Save Changes" : "Upload")}
                                </button>
                                
                                {isEditing ? (
                                    <button style={styles.btnDelete} onClick={() => setIsEditing(false)}>Cancel</button>
                                ) : (
                                    <button style={styles.btnDelete} onClick={() => navigate('/dashboard')}>Back</button>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{...styles.descriptionText, flex: 1}}>{myAnswer.content}</div>
                            <div style={styles.footerButtons}>
                                <button style={styles.btnEdit} onClick={handleStartEdit}>
                                    <span>✏️</span> Edit
                                </button>
                                
                                {/* ⭐ BUTTON TRIGGERS MODAL */}
                                <button style={styles.btnDelete} onClick={() => setShowDeleteModal(true)}>
                                    Delete
                                </button>

                                <button style={styles.showOtherLink} onClick={handleShowOtherAnswers} disabled={loadingAnswers}>
                                    {loadingAnswers ? 'Loading...' : 'Show Other Answer'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* ⭐ OTHER ANSWERS MODAL */}
            {showOtherAnswers && (
                <div style={styles.answersModalOverlay} onClick={() => setShowOtherAnswers(false)}>
                    <div style={styles.answersModalBox} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.answersModalHeader}>
                            <span>Other Reviews</span>
                            <button style={styles.closeBtn} onClick={() => setShowOtherAnswers(false)}>✕</button>
                        </div>
                        
                        {loadingAnswers ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading reviews...</div>
                        ) : otherAnswers.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: TEXT_COLOR_SECONDARY }}>No other reviews yet</div>
                        ) : (
                            otherAnswers.map((answer, idx) => (
                                <div key={idx} style={styles.answerCard}>
                                    <div style={{ fontWeight: 700, color: ACCENT_COLOR_DARK }}>Review {idx + 1}</div>
                                    <div style={styles.answerContent}>{answer.content}</div>
                                    <div style={{ marginTop: '10px', fontSize: '12px', color: TEXT_COLOR_SECONDARY }}>
                                        {answer.created_at ? new Date(answer.created_at).toLocaleDateString() : 'No date'}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* ⭐ DELETE MODAL OVERLAY */}
            {showDeleteModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalBox}>
                        <div style={styles.modalTitle}>Delete Your Answer?</div>
                        <div style={styles.modalButtons}>
                            <button style={styles.modalBtnDelete} onClick={handleConfirmDelete}>Delete</button>
                            <button style={styles.modalBtnCancel} onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentDetailPage;