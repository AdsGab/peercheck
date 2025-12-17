// src/pages/LandingPage.jsx (Focus on the button links)

import React from "react";
import { Link } from "react-router-dom";
import PeeruLayout from "../components/PeeruLayout"; 

const ACCENT_COLOR = '#4DF3C8';
const PRIMARY_TEXT_COLOR = '#2C2C2C';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={ACCENT_COLOR}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
);


const LandingPage = () => {
    
    const heroTitleStyle = {
        color: PRIMARY_TEXT_COLOR,
        fontSize: '44px',
        fontWeight: 800,
        lineHeight: '1.2',
        marginBottom: '20px',
    };
    
    const navButtonBaseStyle = {
        padding: '14px 28px',
        borderRadius: '10px',
        fontWeight: 600,
        fontSize: '16px',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <PeeruLayout activeLink="home"> 
            
            {/* Unique Hero Content */}
            <h4 style={{ color: ACCENT_COLOR, fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>Upload – Review – Feedback</h4>
            
            <h1 style={heroTitleStyle}>
                Make sure to have good <br />
                <strong style={{fontWeight: 800}}>Quality assignments</strong>–<br />
                Peer Review Solutions
            </h1>
            
            <p style={{ color: '#666', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>
                The best student website for student to manage their school <br />
                assignment quality with single website
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                
                {/* 1. Get started button -> /register (Correct CTA) */}
                <Link 
                    to="/register" 
                    style={{ 
                        ...navButtonBaseStyle, 
                        backgroundColor: ACCENT_COLOR, 
                        color: 'white', 
                        border: 'none', 
                        boxShadow: `0 4px 10px rgba(77, 243, 200, 0.4)` 
                    }}
                >
                    Get started
                </Link>
                
                {/* 2. How it works button -> /about (FIXED: Leads to explanatory page) */}
                <Link 
                    to="/about" // <-- CHANGED from /register to /about
                    style={{ 
                        ...navButtonBaseStyle,
                        backgroundColor: 'white', 
                        color: ACCENT_COLOR, 
                        border: `1px solid ${ACCENT_COLOR}`, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px' 
                    }}
                >
                    <CheckIcon /> How it works?
                </Link>
            </div>
            
        </PeeruLayout>
    );
}

export default LandingPage;