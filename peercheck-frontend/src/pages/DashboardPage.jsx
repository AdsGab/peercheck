// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 

// --- 1. CONSTANTS ---
const ACCENT_COLOR_LIGHT = "#4DF3C8";
const ACCENT_COLOR_DARK = "#063b2f"; 
const BG_COLOR = "#F8F8F8";
const CARD_BG = "white";
const TEXT_COLOR_PRIMARY = "#2C2C2C";
const TEXT_COLOR_SECONDARY = "#666";

const BASE_API_URL = "http://localhost:4000/api"; 

// --- MOCK FILTER DATA (Unchanged) ---
const difficultyLevels = ["Beginner", "Intermediate", "Expert"];
const jurusanList = [
    "Rekayasa Perangkat Lunak", "Rekayasa Industri", "Rekayasa Multimedia", 
    "Biomedis", "Psikologi", "Desain Komunikasi Visual", "Teknik Informatika", 
    "Manjemen Pemasaran"
];
const mataKuliahList = ["Pemrograman Lanjut", "Basis Data", "Riset Operasi", "Desain Grafis", "UI/UX", "Algoritma", "Prinsip Pemasaran"];


// --- APP NAVBAR (Shared Header Component) ---
// (AppNavbar and HiButton functions go here - kept for context)
const uploadPageStyles = { 
    header: {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: 'relative', padding: "18px 28px", borderBottom: "1px solid #e6e6e6",
        background: CARD_BG,
    },
    logo: {
        display: "flex", alignItems: "center", gap: 10, fontWeight: 700, color: "#0b6b58",
    },
    nav: {
        display: "flex", gap: 18, alignItems: "center", position: 'absolute',
        left: '50%', transform: 'translateX(-50%)',
    },
    link: { color: "#055b47", textDecoration: "none", fontWeight: 600 }, 
    hiButton: { 
        display: 'flex', alignItems: 'center', gap: 12, 
        background: '#0b6b58', color: '#fff', padding: '10px 18px', 
        borderRadius: 30, border: 'none', cursor: 'pointer', fontWeight: 800, 
        outline: 'none', boxShadow: 'none' 
    },
    hiIcon: { 
        width: 28, height: 28, borderRadius: 14, background: '#d6b77a', 
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
        color: '#063b2f' 
    },
};

function HiButton() {
    const navigate = useNavigate();
    return (
        <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => navigate('/profile', { state: { tab: 'edit' } })}
            style={uploadPageStyles.hiButton}
            aria-label="Open profile edit"
        >
            <span style={uploadPageStyles.hiIcon}>👤</span>
            <span>Hi, Anonymus</span>
        </button>
    );
}

function AppNavbar({ activePage }) {
    const linkStyle = (page) => ({
        ...uploadPageStyles.link,
        color: activePage === page ? '#000' : uploadPageStyles.link.color,
        fontWeight: activePage === page ? 700 : 600,
    });

    return (
        <header style={uploadPageStyles.header}>
            <div style={uploadPageStyles.logo}>
                <img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} />
            </div>

            <nav style={uploadPageStyles.nav}>
                <Link to="/home" style={linkStyle('assignment')}>Assignment</Link>
                <Link to="/upload" style={linkStyle('upload')}>Upload</Link>
                <Link to="/profile" style={linkStyle('profile')}>Profile</Link>
            </nav>
            
            <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}>
                <HiButton />
            </div>
        </header>
    );
}
// --- END APP NAVBAR ---


// --- DASHBOARD SPECIFIC STYLES ---
const styles = {
    container: {
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        backgroundColor: BG_COLOR,
        padding: '0 0 50px 0',
    },
    mainContent: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 8%',
        marginTop: '30px',
        gap: '40px',
    },
    assignmentArea: {
        flex: 3, 
        minWidth: 0,
        position: 'relative', 
    },
    leaderboardArea: {
        flex: 1, 
        maxWidth: '350px',
        minWidth: '250px',
        // FIX: Ensure Leaderboard stretches height
        minHeight: '400px', 
        backgroundColor: ACCENT_COLOR_LIGHT,
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        color: 'white',
    },
    filterBar: {
        display: 'flex',
        marginBottom: '20px',
        gap: '10px',
    },
    filterButton: {
        padding: '12px 25px',
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'pointer',
        textAlign: 'center',
        color: CARD_BG,
        border: 'none',
        backgroundColor: ACCENT_COLOR_DARK, 
        transition: 'background-color 0.2s',
        minWidth: '120px',
    },
    dropdown: {
        position: 'absolute',
        top: '55px', 
        left: '0px', 
        backgroundColor: CARD_BG,
        borderRadius: '10px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
        zIndex: 50,
        padding: '10px 0',
        minWidth: '180px',
        maxHeight: '300px',
        overflowY: 'auto',
    },
    dropdownItem: {
        padding: '8px 15px',
        fontSize: '15px',
        fontWeight: 600,
        color: TEXT_COLOR_PRIMARY,
        cursor: 'pointer',
        transition: 'background-color 0.1s',
    },
    cardContainer: {
        display: 'flex',
        backgroundColor: CARD_BG,
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    },
    levelTag: {
        fontSize: '12px',
        fontWeight: 600,
        padding: '4px 8px',
        borderRadius: '5px',
        color: CARD_BG,
        width: 'fit-content',
        marginTop: '5px',
        backgroundColor: ACCENT_COLOR_DARK, 
    },
    statusMessage: {
        textAlign: 'center',
        padding: '20px',
        fontSize: '16px',
        color: TEXT_COLOR_SECONDARY,
    }
};

// --- Assignment Card Component ---
const AssignmentCard = ({ assignment }) => {
    // Helper function to format the time since creation
    const formatTime = (isoDate) => {
        if (!isoDate) return 'Waktu tidak diketahui';
        // Note: This is a placeholder. Real implementation requires Date diff.
        // For now, we return a mocked value.
        const minutesAgo = Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000);
        if (minutesAgo < 60) return `${minutesAgo} Menit yang lalu`;
        const hoursAgo = Math.floor(minutesAgo / 60);
        return `${hoursAgo} Jam yang lalu`;
    };

    return (
        <div style={styles.cardContainer}>
            {/* Left Circular Icon */}
            <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                    width: '30px', height: '30px', borderRadius: '50%', 
                    backgroundColor: ACCENT_COLOR_LIGHT, marginBottom: '10px', opacity: 0.8
                }}></div>
                <div style={{ 
                    color: ACCENT_COLOR_DARK, fontWeight: 600, fontSize: '12px', textAlign: 'center' 
                }}>
                    {assignment.tingkat || 'N/A'} {/* MAPPED from API */}
                </div>
            </div>

            {/* Middle Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: ACCENT_COLOR_DARK }}>
                        {/* Mocked Title since API doesn't have a title field, use Jurusan + Mata Kuliah */}
                        {assignment.jurusan || 'Jurusan'} - {assignment.mata_kuliah || 'Mata Kuliah'}
                    </h3>
                    <div style={{ fontSize: '12px', color: TEXT_COLOR_SECONDARY }}>
                        {formatTime(assignment.created_at)} {/* MAPPED from API */}
                    </div>
                </div>
                
                <p style={{ margin: '5px 0', fontSize: '14px', color: TEXT_COLOR_PRIMARY }}>
                    {/* MAPPED from API */}
                    Tolong Review dokumen mengenai **{assignment.mata_kuliah || 'Mata Kuliah'}**... {assignment.description && assignment.description.substring(0, 100)}...
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '15px' }}>
                    <div style={styles.levelTag}>
                        {assignment.tingkat || 'N/A'} {/* MAPPED from API */}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: ACCENT_COLOR_LIGHT }}>
                        +?? Poin {/* Points are not available in the current schema */}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- MAIN DASHBOARD COMPONENT ---
const DashboardPage = () => {
    const navigate = useNavigate();
    
    // State for API Data and Loading/Error status
    const [assignments, setAssignments] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    // State for Filters (unchanged)
    const [openDropdown, setOpenDropdown] = useState(null); 
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);

    // --- API Fetch Logic ---

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // 1. Fetch Assignments from /api/tasks
                const assignmentResponse = await fetch(`${BASE_API_URL}/tasks`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                
                if (!assignmentResponse.ok) {
                    const status = assignmentResponse.status;
                    let errorBody;
                    try {
                        errorBody = await assignmentResponse.json();
                    } catch {
                        errorBody = await assignmentResponse.text();
                    }
                    throw new Error(`[${status}] API Error: ${errorBody.error || errorBody.message || errorBody.substring(0, 50) + '...'}.`);
                }

                const assignmentData = await assignmentResponse.json();
                setAssignments(assignmentData); 

                // 2. Leaderboard Mock/Fallback (No changes needed)
                const mockLeaderboardResponse = [
                    { rank: 1, name: "Azazel", points: 100 },
                    { rank: 2, name: "UIKing", points: 98 },
                    { rank: 3, name: "Agung", points: 88 },
                ];
                setLeaderboard(mockLeaderboardResponse);

            } catch (err) {
                console.error("Dashboard Fetch Error:", err);
                setError(`API Connection Error: ${err.message}`);
                setAssignments([]); 
                setLeaderboard([]);
                
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]); 


    // --- FILTER STATE MANAGEMENT (Unchanged) ---
    const filterOptions = {
        'jurusan': jurusanList,
        'mata': mataKuliahList,
        'tingkat': difficultyLevels
    };

    const filterState = {
        'jurusan': selectedJurusan,
        'mata': selectedMataKuliah,
        'tingkat': selectedDifficulty
    };

    const setFilterState = (type, value) => {
        if (type === 'jurusan') setSelectedJurusan(value);
        else if (type === 'mata') setSelectedMataKuliah(value);
        else if (type === 'tingkat') setSelectedDifficulty(value);
        setOpenDropdown(null);
    };


    // --- FILTERS and DROPDOWN LOGIC (Unchanged) ---
    const FilterBar = () => {

        const renderDropdown = (type) => (
            <div style={{ position: 'relative' }}> 
                <button 
                    onClick={() => setOpenDropdown(openDropdown === type ? null : type)}
                    style={{ 
                        ...styles.filterButton, 
                        backgroundColor: filterState[type] ? ACCENT_COLOR_LIGHT : ACCENT_COLOR_DARK,
                        color: filterState[type] ? ACCENT_COLOR_DARK : CARD_BG,
                        border: filterState[type] ? `1px solid ${ACCENT_COLOR_DARK}` : 'none'
                    }}
                >
                    {filterState[type] || (type === 'jurusan' ? 'Jurusan' : type === 'mata' ? 'Mata Kuliah' : 'Tingkat Kesulitan')}
                </button>
                
                {openDropdown === type && (
                    <div style={styles.dropdown}>
                        {/* Option to clear filter */}
                        <div
                            style={{
                                ...styles.dropdownItem,
                                color: TEXT_COLOR_SECONDARY,
                                borderBottom: `1px solid ${BG_COLOR}`,
                            }}
                            onClick={() => setFilterState(type, null)}
                        >
                            All {type.charAt(0).toUpperCase() + type.slice(1)}
                        </div>
                        {/* List options */}
                        {filterOptions[type].map((option) => (
                            <div
                                key={option}
                                style={{
                                    ...styles.dropdownItem,
                                    backgroundColor: filterState[type] === option ? ACCENT_COLOR_LIGHT : CARD_BG,
                                    color: filterState[type] === option ? ACCENT_COLOR_DARK : TEXT_COLOR_PRIMARY,
                                    fontWeight: filterState[type] === option ? 700 : 600
                                }}
                                onClick={() => setFilterState(type, option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );

        return (
            <div style={styles.filterBar}>
                {renderDropdown('jurusan')} 
                {renderDropdown('mata')}
                {renderDropdown('tingkat')}
            </div>
        );
    };

    // --- LEADERBOARD ---
    const Leaderboard = () => (
        <div style={styles.leaderboardArea}>
            <h4 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 700, color: CARD_BG, textAlign: 'center' }}>
                Weekly Leaderboard <br /> This Subject
            </h4>
            {leaderboard.length > 0 ? (
                leaderboard.map((item, index) => (
                    <div key={index} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '10px 0', 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.4)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', marginRight: '10px', opacity: 0.4 }}></div>
                            <span style={{ fontWeight: 600, fontSize: '16px' }}>{item.rank}. {item.name}</span>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '16px' }}>{item.points} PPoint</span>
                    </div>
                ))
            ) : (
                <p style={{ opacity: 0.8, textAlign: 'center' }}>No leaderboard data available.</p>
            )}
            <p style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px', fontWeight: 500, opacity: 0.8 }}>
                Maybe you are next!
            </p>
        </div>
    );


    // --- MAIN RENDER ---
    return (
        <div style={styles.container}>
            <AppNavbar activePage="assignment" />
            
            <div style={styles.mainContent}>
                
                {/* Left Side: Filters and Assignments */}
                <div style={styles.assignmentArea}>
                    <FilterBar />
                    
                    {/* Data Status Messaging */}
                    {loading && <p style={styles.statusMessage}>Loading assignments...</p>}
                    {error && <p style={{...styles.statusMessage, color: 'red'}}>Error: {error}</p>}
                    
                    {!loading && assignments.length === 0 && !error && (
                        <p style={styles.statusMessage}>No assignments found. Start by uploading one!</p>
                    )}

                    {/* Assignment List */}
                    {!loading && assignments.length > 0 && assignments
                        // Filter the list based on selected difficulty
                        .filter(assignment => !selectedDifficulty || assignment.tingkat === selectedDifficulty) // MAPPED to API field
                        .map(assignment => (
                            <AssignmentCard key={assignment.id} assignment={assignment} />
                        ))}
                </div>

                {/* Right Side: Leaderboard */}
                <Leaderboard />
                
            </div>
        </div>
    );
};

export default DashboardPage;