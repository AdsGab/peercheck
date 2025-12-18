import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import useAuth from "../hooks/useAuth";

// --- 1. CONSTANTS ---
const ACCENT_COLOR_LIGHT = "#4DF3C8";
const ACCENT_COLOR_DARK = "#063b2f"; 
const BG_COLOR = "#F8F8F8";
const CARD_BG = "white";
const TEXT_COLOR_PRIMARY = "#2C2C2C";
const TEXT_COLOR_SECONDARY = "#666";

const BASE_API_URL = "http://localhost:4000/api"; 

const difficultyLevels = ["Beginner", "Intermediate", "Expert"];
const jurusanList = [
    "Rekayasa Perangkat Lunak", "Rekayasa Industri", "Rekayasa Multimedia", 
    "Biomedis", "Psikologi", "Desain Komunikasi Visual", "Teknik Informatika", 
    "Manjemen Pemasaran"
];
const mataKuliahList = ["Pemrograman Lanjut", "Basis Data", "Riset Operasi", "Desain Grafis", "UI/UX", "Algoritma", "Prinsip Pemasaran"];

// --- SHARED UI COMPONENTS ---
const uploadPageStyles = { 
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", position: 'relative', padding: "18px 28px", borderBottom: "1px solid #e6e6e6", background: CARD_BG },
    logo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#0b6b58" },
    nav: { display: "flex", gap: 18, alignItems: "center", position: 'absolute', left: '50%', transform: 'translateX(-50%)' },
    link: { color: "#055b47", textDecoration: "none", fontWeight: 600 }, 
    hiButton: { display: 'flex', alignItems: 'center', gap: 12, background: '#0b6b58', color: '#fff', padding: '10px 18px', borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800 },
    hiIcon: { width: 28, height: 28, borderRadius: 14, background: '#d6b77a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#063b2f' },
};

function HiButton() {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <button onClick={() => navigate('/profile', { state: { tab: 'edit' } })} style={uploadPageStyles.hiButton}>
            <span style={uploadPageStyles.hiIcon}>👤</span>
            <span>Hi, {user?.username || 'Anonymus'}</span>
        </button>
    );
}

function AppNavbar({ activePage }) {
    const linkStyle = (page) => ({ ...uploadPageStyles.link, color: activePage === page ? '#000' : uploadPageStyles.link.color, fontWeight: activePage === page ? 700 : 600 });
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

const styles = {
    container: { fontFamily: 'Inter, sans-serif', minHeight: '100vh', backgroundColor: BG_COLOR, padding: '0 0 50px 0' },
    mainContent: { display: 'flex', justifyContent: 'space-between', padding: '20px 8%', marginTop: '30px', gap: '40px' },
    assignmentArea: { flex: 3, minWidth: 0, position: 'relative' },
    leaderboardArea: { flex: 1, maxWidth: '350px', minWidth: '250px', minHeight: '400px', backgroundColor: ACCENT_COLOR_LIGHT, borderRadius: '15px', padding: '30px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', color: 'white' },
    filterBar: { display: 'flex', marginBottom: '20px', gap: '10px' },
    filterButton: { padding: '12px 25px', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', textAlign: 'center', color: CARD_BG, border: 'none', backgroundColor: ACCENT_COLOR_DARK, minWidth: '120px' },
    dropdown: { position: 'absolute', top: '55px', left: '0px', backgroundColor: CARD_BG, borderRadius: '10px', boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)', zIndex: 50, padding: '10px 0', minWidth: '180px', maxHeight: '300px', overflowY: 'auto' },
    dropdownItem: { padding: '8px 15px', fontSize: '15px', fontWeight: 600, color: TEXT_COLOR_PRIMARY, cursor: 'pointer' },
    cardContainer: { display: 'flex', backgroundColor: CARD_BG, borderRadius: '15px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)', cursor: 'pointer' },
    levelTag: { fontSize: '12px', fontWeight: 600, padding: '4px 8px', borderRadius: '5px', color: CARD_BG, width: 'fit-content', marginTop: '5px', backgroundColor: ACCENT_COLOR_DARK },
};

const AssignmentCard = ({ assignment }) => {
    const navigate = useNavigate();
    return (
        <div style={styles.cardContainer} onClick={() => navigate(`/assignment/${assignment.id}`)}>
            <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: ACCENT_COLOR_LIGHT, marginBottom: '10px' }}></div>
                <div style={{ color: ACCENT_COLOR_DARK, fontWeight: 600, fontSize: '12px' }}>{assignment.tingkat}</div>
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: ACCENT_COLOR_DARK }}>{assignment.jurusan} - {assignment.mata_kuliah}</h3>
                    <div style={{ fontSize: '12px', color: TEXT_COLOR_SECONDARY }}>{new Date(assignment.created_at).toLocaleDateString()}</div>
                </div>
                <p style={{ margin: '10px 0', fontSize: '14px', color: TEXT_COLOR_PRIMARY }}>{assignment.description?.substring(0, 150)}...</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={styles.levelTag}>{assignment.tingkat}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: ACCENT_COLOR_LIGHT }}>+20 Poin</div>
                </div>
            </div>
        </div>
    );
};

const DashboardPage = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedJurusan, setSelectedJurusan] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');
        fetch(`${BASE_API_URL}/tasks`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => { setAssignments(data); setLoading(false); })
            .catch(() => setLoading(false));
        setLeaderboard([{ rank: 1, name: "Azazel", points: 100 }, { rank: 2, name: "UIKing", points: 98 }, { rank: 3, name: "Agung", points: 88 }]);
    }, [navigate]);

    return (
        <div style={styles.container}>
            <AppNavbar activePage="assignment" />
            <div style={styles.mainContent}>
                <div style={styles.assignmentArea}>
                    <div style={styles.filterBar}>
                       <button style={styles.filterButton} onClick={() => setOpenDropdown(openDropdown === 'jur' ? null : 'jur')}>{selectedJurusan || 'Jurusan'}</button>
                       <button style={styles.filterButton} onClick={() => setOpenDropdown(openDropdown === 'diff' ? null : 'diff')}>{selectedDifficulty || 'Kesulitan'}</button>
                    </div>
                    {loading ? <p>Loading...</p> : assignments.map(a => <AssignmentCard key={a.id} assignment={a} />)}
                </div>
                <div style={styles.leaderboardArea}>
                    <h4 style={{textAlign:'center'}}>Weekly Leaderboard</h4>
                    {leaderboard.map(i => <div key={i.rank} style={{padding:'10px 0', borderBottom:'1px solid #fff'}}>{i.rank}. {i.name} - {i.points}pt</div>)}
                </div>
            </div>
        </div>
    );
};
export default DashboardPage;