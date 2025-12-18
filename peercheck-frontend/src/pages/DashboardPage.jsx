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

// Filters modeled to match UploadPage.jsx
const mataKuliahOptions = {
    "Rekayasa Perangkat Lunak": ["Pemrograman Lanjut", "Basis Data", "Sistem Operasi", "Rekayasa Perangkat Lunak"],
    "Rekayasa Industri": ["Riset Operasi", "Manajemen Produksi", "Ergonomi"],
    "Rekayasa Multimedia": ["Desain Grafis", "Multimedia Interaktif", "Animasi"],
    "Rekayasa Perangkat Lunak Aplikasi": ["Pengembangan Aplikasi Mobile", "UI/UX", "Pemrograman Web"],
    "Biomedis": ["Biokimia", "Instrumen Medis", "Fisika Kedokteran"],
    "Psikologi": ["Psikologi Perkembangan", "Psikologi Pendidikan", "Psikometri"],
    "Desain Komunikasi Visual": ["Tipografi", "Branding", "Desain Editorial"],
    "Teknik Informatika": ["Algoritma", "Jaringan Komputer", "Kecerdasan Buatan"],
    "Manjemen Pemasaran": ["Prinsip Pemasaran", "Riset Pasar", "Manajemen Produk"],
};
const jurusanList = Object.keys(mataKuliahOptions);
const tingkatOptions = ["Beginner", "Intermediate", "Expert"];

// --- SHARED UI COMPONENTS ---
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
            <span>Hi, {user?.username || 'Anonymus'}</span>
        </button>
    );
}

function AppNavbar({ activePage }) {
    const linkStyle = (page) => ({ ...uploadPageStyles.link, color: activePage === page ? '#000' : uploadPageStyles.link.color, fontWeight: 700 });
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
    container: { fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, \'Segoe UI\', Roboto', minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', backgroundColor: BG_COLOR, color: '#0b1a1a' },
    mainContent: { display: 'flex', gap: 32, padding: 28, flex: 1, boxSizing: 'border-box', alignItems: 'flex-start', maxWidth: 1400, margin: '0 auto', width: '100%' },
    assignmentArea: { flex: 2, minWidth: 0, position: 'relative' },
    leaderboardArea: { flex: 0, width: '320px', minHeight: '400px', backgroundColor: ACCENT_COLOR_LIGHT, borderRadius: '15px', padding: '30px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', color: 'white', boxSizing: 'border-box' },
    // UploadPage-like filter pills
    pillsRow: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, position: 'relative', zIndex: 3000 },
    pill: { background: '#063b2f', color: '#ffffff', padding: '12px 18px', borderRadius: 14, minWidth: 160, textAlign: 'center', cursor: 'pointer', fontWeight: 700, border: '1px solid #d9ece6', transition: 'all 200ms ease', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', position: 'relative', zIndex: 3001 },
    pillHover: { transform: 'translateY(-3px)', boxShadow: '0 8px 22px rgba(0,0,0,0.12)' },
    dropdown: { position: 'absolute', marginTop: 8, background: '#fff', color: '#063b2f', borderRadius: 12, boxShadow: '0 12px 30px rgba(0,0,0,0.16)', padding: 8, zIndex: 4000, minWidth: 240 },
    dropdownItem: { padding: '10px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, transition: 'all 180ms ease' },
    dropdownItemHover: { background: '#e1faf4', color: '#0b6b58', transform: 'translateX(4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
    cardContainer: { display: 'flex', backgroundColor: CARD_BG, borderRadius: '15px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)', cursor: 'pointer', transition: 'all 200ms ease' },
    levelTag: { fontSize: '12px', fontWeight: 600, padding: '4px 8px', borderRadius: '5px', color: CARD_BG, width: 'fit-content', marginTop: '5px', backgroundColor: ACCENT_COLOR_DARK },
};

const AssignmentCard = ({ assignment }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);
    return (
        <div 
            style={{
                ...styles.cardContainer,
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered ? '0 6px 20px rgba(0, 0, 0, 0.1)' : '0 2px 5px rgba(0, 0, 0, 0.05)'
            }} 
            onClick={() => navigate(`/assignment/${assignment.id}`)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
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
    const [openDropdown, setOpenDropdown] = useState(null); // 'jurusan' | 'mata' | 'tingkat' | null
    const [hover, setHover] = useState(null);
    const [hoverItem, setHoverItem] = useState(null);
    const [selectedJurusan, setSelectedJurusan] = useState('');
    const [selectedMataKuliah, setSelectedMataKuliah] = useState('');
    const [selectedTingkat, setSelectedTingkat] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');
        fetch(`${BASE_API_URL}/tasks`, { headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => res.json())
            .then(data => { setAssignments(Array.isArray(data) ? data : []); setLoading(false); })
            .catch(() => setLoading(false));
        setLeaderboard([{ rank: 1, name: "Azazel", points: 100 }, { rank: 2, name: "UIKing", points: 98 }, { rank: 3, name: "Agung", points: 88 }]);
    }, [navigate]);

    return (
        <div style={styles.container}>
            <AppNavbar activePage="assignment" />
            <div style={styles.mainContent}>
                <div style={styles.assignmentArea}>
                    {/* UploadPage-like filter pills */}
                    <div style={styles.pillsRow}>
                        {/* Jurusan */}
                        <div style={{ position: 'relative' }}>
                            <div
                                style={{ ...styles.pill, ...(hover === 'jurusan' ? styles.pillHover : {}) }}
                                onMouseEnter={() => setHover('jurusan')}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setOpenDropdown(openDropdown === 'jurusan' ? null : 'jurusan')}
                            >
                                {selectedJurusan || 'Jurusan'}
                            </div>
                            {openDropdown === 'jurusan' && (
                                <div style={styles.dropdown}>
                                    <div
                                        style={{ ...styles.dropdownItem, ...(hoverItem === 'jurusan-reset' ? styles.dropdownItemHover : {}) }}
                                        onMouseEnter={() => setHoverItem('jurusan-reset')}
                                        onMouseLeave={() => setHoverItem(null)}
                                        onClick={() => { setSelectedJurusan(''); setSelectedMataKuliah(''); setOpenDropdown(null); }}
                                    >
                                        Semua Jurusan
                                    </div>
                                    {jurusanList.map(j => (
                                        <div
                                            key={j}
                                            style={{ ...styles.dropdownItem, ...(hoverItem === j ? styles.dropdownItemHover : {}) }}
                                            onMouseEnter={() => setHoverItem(j)}
                                            onMouseLeave={() => setHoverItem(null)}
                                            onClick={() => { setSelectedJurusan(j); setSelectedMataKuliah(''); setOpenDropdown(null); }}
                                        >
                                            {j}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mata Kuliah */}
                        <div style={{ position: 'relative' }}>
                            <div
                                style={{ ...styles.pill, ...(hover === 'mata' ? styles.pillHover : {}) }}
                                onMouseEnter={() => setHover('mata')}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setOpenDropdown(openDropdown === 'mata' ? null : 'mata')}
                            >
                                {selectedMataKuliah || 'Mata Kuliah'}
                            </div>
                            {openDropdown === 'mata' && (
                                <div style={styles.dropdown}>
                                    <div
                                        style={{ ...styles.dropdownItem, ...(hoverItem === 'mata-reset' ? styles.dropdownItemHover : {}) }}
                                        onMouseEnter={() => setHoverItem('mata-reset')}
                                        onMouseLeave={() => setHoverItem(null)}
                                        onClick={() => { setSelectedMataKuliah(''); setOpenDropdown(null); }}
                                    >
                                        Semua Mata Kuliah
                                    </div>
                                    {(mataKuliahOptions[selectedJurusan] || []).map(m => (
                                        <div
                                            key={m}
                                            style={{ ...styles.dropdownItem, ...(hoverItem === m ? styles.dropdownItemHover : {}) }}
                                            onMouseEnter={() => setHoverItem(m)}
                                            onMouseLeave={() => setHoverItem(null)}
                                            onClick={() => { setSelectedMataKuliah(m); setOpenDropdown(null); }}
                                        >
                                            {m}
                                        </div>
                                    ))}
                                    {!selectedJurusan && (
                                        <div style={{ padding: 8, opacity: 0.6 }}>Pilih Jurusan dulu</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Tingkat Kesulitan */}
                        <div style={{ position: 'relative' }}>
                            <div
                                style={{ ...styles.pill, ...(hover === 'tingkat' ? styles.pillHover : {}) }}
                                onMouseEnter={() => setHover('tingkat')}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setOpenDropdown(openDropdown === 'tingkat' ? null : 'tingkat')}
                            >
                                {selectedTingkat || 'Tingkat Kesulitan'}
                            </div>
                            {openDropdown === 'tingkat' && (
                                <div style={styles.dropdown}>
                                    <div
                                        style={{ ...styles.dropdownItem, ...(hoverItem === 'tingkat-reset' ? styles.dropdownItemHover : {}) }}
                                        onMouseEnter={() => setHoverItem('tingkat-reset')}
                                        onMouseLeave={() => setHoverItem(null)}
                                        onClick={() => { setSelectedTingkat(''); setOpenDropdown(null); }}
                                    >
                                        Semua Tingkat
                                    </div>
                                    {tingkatOptions.map(t => (
                                        <div
                                            key={t}
                                            style={{ ...styles.dropdownItem, ...(hoverItem === t ? styles.dropdownItemHover : {}) }}
                                            onMouseEnter={() => setHoverItem(t)}
                                            onMouseLeave={() => setHoverItem(null)}
                                            onClick={() => { setSelectedTingkat(t); setOpenDropdown(null); }}
                                        >
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Filtered assignments */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        (assignments
                            .filter(a => {
                                const jurMatch = selectedJurusan ? (a.jurusan === selectedJurusan) : true;
                                const mkVal = a.mata_kuliah ?? a.mataKuliah;
                                const mkMatch = selectedMataKuliah ? (mkVal === selectedMataKuliah) : true;
                                const tkMatch = selectedTingkat ? (a.tingkat === selectedTingkat) : true;
                                return jurMatch && mkMatch && tkMatch;
                            })
                            .map(a => <AssignmentCard key={a.id ?? `${a.jurusan}-${a.mata_kuliah ?? a.mataKuliah}-${a.created_at ?? Math.random()}`} assignment={a} />))
                    )}
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