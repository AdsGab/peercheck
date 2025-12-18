import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; 

const BASE_API_URL = "http://localhost:4000/api";

const AssignmentDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth() || {};
    const navigate = useNavigate();
    
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

    const getFileIcon = (filename) => {
        if (!filename) return "📄";
        const ext = filename.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return "🖼️";
        if (ext === 'pdf') return "📕";
        return "📄";
    };

    // --- STYLES ---
    const styles = {
        page: { fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#fff", width: "100%", color: "#000" },
        header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 40px", borderBottom: "2px solid #000", backgroundColor: "#fff" },
        nav: { display: "flex", gap: "30px", position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: 500 },
        link: { textDecoration: "none", color: "#000", fontSize: "16px" },
        hiButton: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#2D5C55', color: '#fff', padding: '8px 20px', borderRadius: '30px', border: 'none', fontWeight: 700, fontSize: '14px' },
        mainContent: { padding: "0 5% 40px 5%", maxWidth: "1400px", margin: "30px auto", display: "flex", flexDirection: "column", gap: "30px" },
        topStrip: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 5%", fontWeight: 800, fontSize: "18px", maxWidth: "1400px", margin: "20px auto" },
        userInfo: { display: 'flex', alignItems: 'center', gap: '15px' },
        avatarCircle: { width: '50px', height: '50px', backgroundColor: '#C4C4C4', borderRadius: '50%' },
        greenBox: { border: '12px solid #63CCA1', borderRadius: '25px', backgroundColor: '#D9D9D9', padding: '30px 40px', position: 'relative' },
        descriptionTitle: { marginTop: 0, fontWeight: 800, fontSize: '18px', marginBottom: '15px' },
        descriptionText: { fontSize: '16px', lineHeight: '1.5', marginBottom: '30px', whiteSpace: 'pre-wrap' },
        fileList: { display: 'flex', flexDirection: 'column', gap: '12px' },
        filePill: { backgroundColor: '#fff', borderRadius: '15px', padding: '12px 20px', width: 'fit-content', minWidth: '300px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700, fontSize: '14px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textDecoration: 'none', color: '#000', cursor: 'pointer' },
        answerArea: { border: '12px solid #63CCA1', borderRadius: '25px', backgroundColor: '#D9D9D9', padding: '30px 40px', minHeight: '300px', display: 'flex', flexDirection: 'column' },
        textArea: { width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '16px', resize: 'none', flex: 1, marginTop: '15px', color: '#555', fontFamily: 'inherit' },
        footerButtons: { display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', position: 'relative' },
        btnUpload: { backgroundColor: '#4E6E64', color: '#fff', border: 'none', padding: '12px 40px', borderRadius: '30px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
        btnEdit: { backgroundColor: '#4E6E64', color: '#fff', border: 'none', padding: '12px 40px', borderRadius: '30px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
        btnDelete: { backgroundColor: 'transparent', color: '#000', border: '1px solid #000', padding: '12px 40px', borderRadius: '30px', fontWeight: 800, fontSize: '16px', cursor: 'pointer' },
        showOtherLink: { position: 'absolute', right: 0, bottom: 10, textDecoration: 'underline', fontWeight: 800, fontSize: '16px', color: '#000', cursor: 'pointer' },
        
        // ⭐ MODAL STYLES
        modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
        modalBox: { width: '400px', backgroundColor: '#58B99D', borderRadius: '15px', padding: '30px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', color: '#fff' },
        modalTitle: { fontSize: '20px', fontWeight: '800', marginBottom: '25px', color: '#fff' },
        modalButtons: { display: 'flex', justifyContent: 'center', gap: '15px' },
        modalBtnDelete: { backgroundColor: '#356156', color: '#fff', padding: '10px 30px', borderRadius: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
        modalBtnCancel: { backgroundColor: 'transparent', color: '#fff', padding: '10px 30px', borderRadius: '20px', border: '2px solid #fff', fontWeight: 'bold', cursor: 'pointer' }
    };

    if (loading) return <div style={{padding:50, textAlign:'center'}}>Loading...</div>;
    if (!task) return <div style={{padding:50, textAlign:'center'}}>Task not found</div>;

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={{fontWeight: 800, fontSize: '20px', color: '#2D5C55', display:'flex', alignItems:'center', gap:10}}>
                    <img src="/Logo.png" alt="Peeru" style={{height: 40}} /> 
                </div>
                <nav style={styles.nav}>
                    <Link to="/dashboard" style={styles.link}>Assignment</Link>
                    <Link to="/upload" style={styles.link}>Upload</Link>
                    <Link to="/profile" style={styles.link}>Profile</Link>
                </nav>
                <button style={styles.hiButton}>
                    <div style={{width: 24, height: 24, background:'#C8B45C', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}>👤</div>
                    Hi, {user?.username || "Guest"}
                </button>
            </header>

            <div style={styles.topStrip}>
                <div style={styles.userInfo}>
                    <div style={styles.avatarCircle}></div>
                    <span>{task.uploader_name || "Unknown User"}</span>
                </div>
                <span>{task.mata_kuliah}</span>
                <span>{task.jurusan}</span>
                <span>{task.tingkat}</span>
            </div>

            <main style={styles.mainContent}>
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
                    {!myAnswer || isEditing ? (
                        <>
                            <h3 style={{...styles.descriptionTitle, color: '#444'}}>
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
                                    <button style={styles.btnDelete} onClick={() => navigate(-1)}>Delete</button>
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

                                <div style={styles.showOtherLink}>Show Other Answer</div>
                            </div>
                        </>
                    )}
                </div>
            </main>

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