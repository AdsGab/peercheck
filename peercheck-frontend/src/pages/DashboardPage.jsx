// src/pages/DashboardPage.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

// --- 1. CONSTANTS ---
const ACCENT_COLOR_LIGHT = "#4DF3C8";
const ACCENT_COLOR_DARK = "#063b2f"; 
const BG_COLOR = "#F8F8F8";
const CARD_BG = "white";
const TEXT_COLOR_PRIMARY = "#2C2C2C";
const TEXT_COLOR_SECONDARY = "#666";

// --- DUMMY DATA ---
const dummyAssignments = [
    { id: 1, title: "Anonymus1", subject: "Interaksi Manusia Komputer", detail: "User Model & Persona", level: "Expert", points: 10, time: 7 },
    { id: 2, title: "Anonymus2", subject: "Design Thingking", detail: "Emphatize", level: "Intermediate", points: 15, time: 15 },
    { id: 3, title: "Anonymus3", subject: "User Experience", detail: "Solution Ideation", level: "Beginner", points: 5, time: 18 },
    { id: 4, title: "Anonymus4", subject: "Interaksi Manusia Komputer", detail: "Design Documentation", level: "Intermediate", points: 30, time: 20 },
    { id: 5, title: "Anonymus5", subject: "User Interface", detail: "Style Guide", level: "Expert", points: 10, time: 30 },
];

const leaderboardData = [
    { rank: 1, name: "Azazel", points: 100 },
    { rank: 2, name: "UIKing", points: 98 },
    { rank: 3, name: "Agung", points: 88 },
];

const difficultyLevels = [
    "Beginner", "Intermediate", "Expert",
];
const jurusanList = [
    "Rekayasa Perangkat Lunak", "Rekayasa Industri", "Rekayasa Multimedia", 
    "Biomedis", "Psikologi", "Desain Komunikasi Visual", "Teknik Informatika", 
    "Manjemen Pemasaran"
];
const mataKuliahList = [
    "Pemrograman Lanjut", "Basis Data", "Riset Operasi", "Desain Grafis",
    "UI/UX", "Algoritma", "Prinsip Pemasaran"
];

// --- APP NAVBAR (Shared Header Component) ---

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
                {/* Logo image should be placed in public/Logo.png */}
                <img src="/Logo.png" alt="PIRU" style={{ height: 50, objectFit: 'contain' }} />
            </div>

            <nav style={uploadPageStyles.nav}>
                <Link to="/dashboard" style={linkStyle('assignment')}>Assignment</Link>
                <Link to="/upload" style={linkStyle('upload')}>Upload</Link>
                <Link to="/profile" style={linkStyle('profile')}>Profile</Link>
            </nav>
            
            <div style={{ position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }}>
                <HiButton />
            </div>
        </header>
    );

}

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
        height: 'fit-content',
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
    // CRITICAL FIX: The dropdown is now positioned absolutely within its button wrapper
    dropdown: {
        position: 'absolute',
        top: '55px', // Fixed offset from the button height
        left: '0px', // Align left edge with the button
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
};

// --- Assignment Card Component (Unchanged) ---
const AssignmentCard = ({ assignment }) => {
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
                    {assignment.level}
                </div>
            </div>

            {/* Middle Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: ACCENT_COLOR_DARK }}>
                        {assignment.title}
                    </h3>
                    <div style={{ fontSize: '12px', color: TEXT_COLOR_SECONDARY }}>
                        {assignment.time} Menit yang lalu
                    </div>
                </div>
                
                <p style={{ margin: '5px 0', fontSize: '14px', color: TEXT_COLOR_PRIMARY }}>
                    Tolong Review tugas mengenai **{assignment.subject}** pada tahap {assignment.detail}, 
                    saya kesulitan dalam mencari poin juga gain mereka untuk divisu...
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '15px' }}>
                    <div style={styles.levelTag}>
                        {assignment.detail}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: ACCENT_COLOR_LIGHT }}>
                        +{assignment.points} Poin
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- MAIN DASHBOARD COMPONENT ---
const DashboardPage = () => {
    
    const [openDropdown, setOpenDropdown] = useState(null); 
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);

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


    // --- FILTERS and DROPDOWN LOGIC ---
    const FilterBar = () => {

        const renderDropdown = (type) => (
            // CRITICAL FIX: The wrapper div must be position: relative
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
                    // Dropdown is positioned absolutely within the button wrapper
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
            {leaderboardData.map(item => (
                <div key={item.rank} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '10px 0', 
                    borderBottom: '1px solid rgba(255, 255, 255, 0.4)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Placeholder circle */}
                        <div style={{ 
                            width: '20px', height: '20px', borderRadius: '50%', 
                            backgroundColor: 'white', marginRight: '10px', opacity: 0.4
                        }}></div>
                        <span style={{ fontWeight: 600, fontSize: '16px' }}>{item.rank}. {item.name}</span>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '16px' }}>{item.points} PPoint</span>
                </div>
            ))}
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
                    {dummyAssignments
                        // Apply filter
                        .filter(assignment => !selectedDifficulty || assignment.level === selectedDifficulty)
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