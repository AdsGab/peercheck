import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// ⭐ FIXED PATH: Must go up one level to find hooks
import useAuth from "../hooks/useAuth"; 

const BASE_API_URL = "http://localhost:4000/api";

const AssignmentDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`${BASE_API_URL}/tasks/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setTask(data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const styles = {
        page: { fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#fff", width: "100vw" },
        header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 28px", borderBottom: "1px solid #e6e6e6", position: 'relative' },
        nav: { display: "flex", gap: 18, position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
        link: { color: "#055b47", textDecoration: "none", fontWeight: 600 },
        hiButton: { display: 'flex', alignItems: 'center', gap: 12, background: '#0b6b58', color: '#fff', padding: '10px 18px', borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800 },
        hiIcon: { width: 28, height: 28, borderRadius: 14, background: '#d6b77a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
        
        // Layout matching image_859849.png
        topStrip: { display: "flex", justifyContent: "space-between", padding: "20px 8%", borderBottom: "2px solid #000", fontWeight: 800, fontSize: "18px", alignItems: 'center' },
        mainContent: { padding: "20px 8%" },
        greenBox: { border: '8px solid #5cbfa8', borderRadius: '20px', padding: '30px', background: '#d9d9d9', marginBottom: '30px' },
        filePill: { background: '#fff', padding: '12px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', width: 'fit-content', fontWeight: 700, border: '1px solid #ccc' },
        answerArea: { border: '8px solid #5cbfa8', borderRadius: '20px', padding: '30px', background: '#d9d9d9', minHeight: '350px', display: 'flex', flexDirection: 'column' },
        textarea: { flex: 1, width: "100%", background: "transparent", border: "none", outline: "none", fontSize: "18px", marginTop: "15px", resize: "none" },
        footerBtns: { display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }
    };

    if (loading) return <div>Loading...</div>;
    if (!task) return <div>Task not found</div>;

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div style={{fontWeight: 700, color: "#0b6b58"}}><img src="/Logo.png" alt="PIRU" style={{ height: 50 }} /></div>
                <nav style={styles.nav}>
                    <Link to="/dashboard" style={styles.link}>Assignment</Link>
                    <Link to="/upload" style={styles.link}>Upload</Link>
                    <Link to="/profile" style={styles.link}>Profile</Link>
                </nav>
                <button onClick={() => navigate('/profile')} style={styles.hiButton}>
                    <span style={styles.hiIcon}>👤</span>Hi, {user?.username || 'User'}
                </button>
            </header>

            {/* Top info matching image_859849.png */}
            <div style={styles.topStrip}>
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <div style={{width:'40px', height:'40px', background:'#bbb', borderRadius:'50%'}}></div>
                    <span>Anonymus1</span>
                </div>
                <span>{task.jurusan}</span>
                <span>{task.mata_kuliah}</span>
                <span>{task.tingkat}</span>
            </div>

            <main style={styles.mainContent}>
                <div style={styles.greenBox}>
                    <h3 style={{marginTop: 0, fontWeight: 900}}>Deskripsi :</h3>
                    <p style={{lineHeight: '1.6', fontSize: '18px'}}>{task.description}</p>
                    <div style={{marginTop: '40px'}}>
                        <div style={styles.filePill}>📄 Tugas Design Thingking.pdf</div>
                        <div style={styles.filePill}>📄 Tugas Design Thingking.img</div>
                    </div>
                </div>

                <div style={styles.answerArea}>
                    <span style={{fontWeight: 900, color: '#444', fontSize: '20px'}}>Write Your Answer Here...</span>
                    <textarea style={styles.textarea} placeholder="Ketik feedback anda di sini..."></textarea>
                    <div style={styles.footerBtns}>
                        <button style={{background: '#0b6b58', color:'#fff', padding:'12px 40px', borderRadius:'30px', border:'none', fontWeight:800, cursor:'pointer', display:'flex', alignItems:'center', gap:'10px', fontSize: '18px'}}>
                            <span>⬆️</span> Upload
                        </button>
                        <button onClick={() => navigate(-1)} style={{background: '#bbb', color:'#0b1a1a', padding:'12px 40px', borderRadius:'30px', border:'none', fontWeight:800, cursor:'pointer', fontSize: '18px'}}>
                            Delete
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AssignmentDetailPage;