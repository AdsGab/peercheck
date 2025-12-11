// src/pages/DashboardPage.jsx (Part 1: Imports and Constants)

import React, { useState } from "react";
import { Link } from "react-router-dom"; 

// --- 1. CONSTANTS ---
const ACCENT_COLOR_LIGHT = "#4DF3C8";
const ACCENT_COLOR_DARK = "#467A78";
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

// --- STYLES ---
const styles = {
    container: {
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        backgroundColor: BG_COLOR,
        padding: '0 0 50px 0',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 8%',
        height: '80px',
        backgroundColor: CARD_BG,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    navLinkGroup: {
        display: 'flex',
        gap: '40px',
        fontSize: '18px',
        fontWeight: 600,
        color: TEXT_COLOR_SECONDARY,
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 700,
        fontSize: '20px',
        color: TEXT_COLOR_PRIMARY,
    },
    // Main content layout (Assignments + Leaderboard)
    mainContent: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 8%',
        marginTop: '30px',
        gap: '40px',
    },
    // Left side: Filters and Assignment List
    assignmentArea: {
        flex: 3, 
        minWidth: 0,
    },
    // Right side: Leaderboard
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
    filterButton: {
        padding: '12px 25px',
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'pointer',
        textAlign: 'center',
        marginRight: '10px',
        color: CARD_BG,
        border: 'none',
    },
    // Assignment Card styles
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

const AssignmentCard = ({ assignment }) => {
    return (
        <div style={styles.cardContainer}>
            {/* Left Circular Icon */}
            <div style={{ marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ 
                    width: '30px', 
                    height: '30px', 
                    borderRadius: '50%', 
                    backgroundColor: ACCENT_COLOR_LIGHT, 
                    marginBottom: '10px',
                    opacity: 0.8
                }}></div>
                <div style={{ 
                    color: ACCENT_COLOR_DARK, 
                    fontWeight: 600, 
                    fontSize: '12px', 
                    textAlign: 'center' 
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
                    Tolong Review dokumen mengenai **{assignment.subject}** pada tahap {assignment.detail}, 
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

const DashboardPage = () => {
    
    const [selectedFilter, setSelectedFilter] = useState(null);

    // --- NAVBAR ---
    const Navbar = () => (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <span style={{ color: ACCENT_COLOR_DARK, marginRight: '5px' }}>P</span>
                <span style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>eeru</span>
                <span style={{ fontSize: '10px', marginLeft: '5px', color: TEXT_COLOR_SECONDARY }}>Peer Reviewer</span>
            </div>
            
            <div style={styles.navLinkGroup}>
                <Link to="/home" style={{ textDecoration: 'none', color: TEXT_COLOR_PRIMARY, fontWeight: 700 }}>
                    Assignment
                </Link>
                <Link to="/upload" style={{ textDecoration: 'none', color: TEXT_COLOR_SECONDARY }}>
                    Upload
                </Link>
                <Link to="/profile" style={{ textDecoration: 'none', color: TEXT_COLOR_SECONDARY }}>
                    Profile
                </Link>
            </div>

            <div style={{ fontSize: '16px', fontWeight: 700, color: ACCENT_COLOR_DARK }}>
                Premium Peer Reviewer
            </div>
        </nav>
    );

    // --- FILTERS (Mimicking the button layout) ---
    const FilterBar = () => (
        <div style={{ marginBottom: '20px' }}>
            <button style={{ ...styles.filterButton, backgroundColor: ACCENT_COLOR_DARK }}>
                Jurusan
            </button>
            <button style={{ ...styles.filterButton, backgroundColor: ACCENT_COLOR_DARK }}>
                Mata Kuliah
            </button>
            <button 
                // This button should trigger the dropdown shown in image_d2b4f0.png
                style={{ ...styles.filterButton, backgroundColor: ACCENT_COLOR_DARK }}>
                Tingkat Kesulitan
            </button>
        </div>
    );

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
                    borderBottom: item.rank < 3 ? '1px solid rgba(255, 255, 255, 0.4)' : 'none'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                            width: '20px', 
                            height: '20px', 
                            borderRadius: '50%', 
                            backgroundColor: 'white', 
                            marginRight: '10px',
                            opacity: 0.4
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
            <Navbar />
            
            <div style={styles.mainContent}>
                
                {/* Left Side: Filters and Assignments */}
                <div style={styles.assignmentArea}>
                    <FilterBar />
                    {dummyAssignments.map(assignment => (
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