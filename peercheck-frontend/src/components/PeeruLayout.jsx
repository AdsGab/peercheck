// src/components/PeeruLayout.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import peeruLogo from '../assets/peeru.png';

// --- SHARED CONSTANTS ---
const HERO_IMAGE_URL = 'https://plus.unsplash.com/premium_photo-1682096181675-12f8293cd31e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const ACCENT_COLOR = '#4DF3C8';
const PRIMARY_TEXT_COLOR = '#2C2C2C';
const LANDING_BG = '#F8F8F8';

const BLURRED_PATTERN_SVG = `
<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <filter id="blur">
            <feGaussianBlur stdDeviation="2"/>
        </filter>
    </defs>
    <g filter="url(#blur)" fill="rgba(200,200,200,0.4)">
        <circle cx="20%" cy="20%" r="20"/>
        <circle cx="50%" cy="10%" r="25"/>
        <circle cx="80%" cy="40%" r="15"/>
        <circle cx="10%" cy="70%" r="30"/>
        <circle cx="60%" cy="90%" r="22"/>
        <circle cx="95%" cy="75%" r="18"/>
    </g>
</svg>`;

{/*Sprint 3*/}
// --- SHARED STYLES ---
const baseStyles = {
    container: {
        fontFamily: 'Inter, sans-serif',
        backgroundColor: LANDING_BG,
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        width: '100vw',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 8%',
        height: '80px',
        backgroundColor: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        zIndex: 100,
        animation: 'navFade 0.8s ease forwards',
    },
    navButton: {
        padding: '10px 22px',
        borderRadius: '10px',
        fontWeight: 600,
        fontSize: '15px',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.25s ease',
    },
    heroRight: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeUp 0.9s ease forwards',
    },
};

{/*Sprint 3*/}
const PeeruLayout = ({ children, activeLink, hideRightBlock = false }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isTablet = windowWidth <= 1024;
    const isMobile = windowWidth <= 640;

    return (
        <div style={baseStyles.container}>
            {/* GLOBAL ANIMATIONS */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes float {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                    100% { transform: translateY(0); }
                }

                @keyframes navFade {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes floatSlow {
                0% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0); }
                }

                @keyframes floatFast {
                0% { transform: translateY(0); }
                50% { transform: translateY(-16px); }
                100% { transform: translateY(0); }
                }

                .nav-link {
                    position: relative;
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -6px;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: ${ACCENT_COLOR};
                    transition: all 0.3s ease;
                }

                .nav-link:hover::after {
                    width: 100%;
                    left: 0;
                }
            `}</style>

            {/* BACKGROUND */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('data:image/svg+xml;base64,${btoa(BLURRED_PATTERN_SVG)}')`,
                    animation: 'float 18s linear infinite',
                    opacity: 0.6,
                }}
            />

            {/* NAVBAR */}
            <nav style={baseStyles.navbar}>
                {/* Logo - Left */}
                <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                    <img src={peeruLogo} alt="Peeru Logo" style={{ height: '44px', width: 'auto', cursor: 'pointer' }} />
                </div>

                {/* Centered Navigation Links */}
                {!isMobile && (
                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 40, alignItems: 'center' }}>
                        {['Home', 'About', 'Features', 'Pricing'].map(link => (
                            <Link
                                key={link}
                                to={link === 'Home' ? '/home' : `/${link.toLowerCase()}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '40px',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    color: link.toLowerCase() === activeLink ? PRIMARY_TEXT_COLOR : '#666',
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    borderBottom: link.toLowerCase() === activeLink ? `2px solid ${ACCENT_COLOR}` : '2px solid transparent',
                                    transition: 'all 0.25s ease',
                                }}
                            >
                                {link}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Auth Buttons - Right */}
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '15px', marginLeft: 'auto' }}>
                    <Link to="/login" style={{ ...baseStyles.navButton, border: '1px solid #ccc' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        Login
                    </Link>

                    <Link to="/register" style={{ ...baseStyles.navButton, backgroundColor: ACCENT_COLOR, color: 'white', boxShadow: '0 6px 20px rgba(77,243,200,0.4)' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        Sign Up
                    </Link>
                </div>
            </nav>

{/*Sprint 3*/}
            {/* HERO */}
            <div
                style={{
                    display: 'flex',
                    padding: '0 8%',
                    minHeight: 'calc(100vh - 80px)',
                    alignItems: 'center',
                    flexDirection: isTablet ? 'column' : 'row',
                }}
            >
                <div style={{ flex: 1, animation: 'fadeUp 0.8s ease forwards' }}>
                    {children}
                </div>

                                {!hideRightBlock && (
                <div
                        style={{
                        ...baseStyles.heroRight,
                        position: 'relative', 
                        width: isMobile ? 280 : 450,
                        height: isMobile ? 340 : 500,
                        animation: 'float 6s ease-in-out infinite',
                        }}
                >
                        {/* IMAGE */}
                        <img
                        src={HERO_IMAGE_URL}
                        alt="hero"
                        style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 20,
                                objectFit: 'cover',
                                transition: 'transform 0.4s, box-shadow 0.4s',
                        }}
                        />

                        {/*Student Trust */}
                        <div
                        style={{
                                position: 'absolute',
                                top: '18%',
                                left: '-12%',
                                backgroundColor: 'white',
                                padding: '14px 18px',
                                borderRadius: '14px',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                                animation: 'floatSlow 5s ease-in-out infinite',
                                zIndex: 20,
                        }}
                        >
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#666' }}>
                                1000 +
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                                Student Trust
                        </div>
                        </div>

                        {/*University Trust*/}
                        <div
                        style={{
                                position: 'absolute',
                                bottom: '16%',
                                right: '-8%',
                                backgroundColor: 'white',
                                padding: '14px 18px',
                                borderRadius: '14px',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                                animation: 'floatFast 6s ease-in-out infinite',
                                zIndex: 20,
                                textAlign: 'left',
                        }}
                        >
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#666' }}>
                                10 +
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                                University Trust
                        </div>
                        </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default PeeruLayout;