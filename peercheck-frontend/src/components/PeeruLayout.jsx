// src/components/PeeruLayout.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

// --- SHARED CONSTANTS ---
const HERO_IMAGE_URL = 'https://placehold.co/400x500/cccccc/000000/png?text=Student+Hero';
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
  <rect width="100%" height="100%" fill="transparent"/>
  <g filter="url(#blur)" fill="rgba(200, 200, 200, 0.4)">
    <circle cx="20%" cy="20%" r="20"/>
    <circle cx="50%" cy="10%" r="25"/>
    <circle cx="80%" cy="40%" r="15"/>
    <circle cx="10%" cy="70%" r="30"/>
    <circle cx="60%" cy="90%" r="22"/>
    <circle cx="95%" cy="75%" r="18"/>
  </g>
</svg>`;

// --- SHARED STYLES ---
const baseStyles = {
  container: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: LANDING_BG,
    minHeight: '100vh',
    position: 'relative',
    overflowX: 'hidden',
    paddingBottom: '50px',
    width: '100vw',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 8%',
    height: '80px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    position: 'relative', 
    zIndex: 100, 
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: '20px',
    color: PRIMARY_TEXT_COLOR,
  },
  navButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '15px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background-color 0.2s, color 0.2s',
    minWidth: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroRight: {
    position: 'relative',
    width: '450px',
    height: '500px',
    marginRight: '-50px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const PeeruLayout = ({ children, activeLink, hideRightBlock = false }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.backgroundColor = LANDING_BG;

        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.body.backgroundColor = '';
        };
    }, []);

    const isTablet = windowWidth <= 1024;
    const isMobile = windowWidth <= 640;
    const horizontalPadding = isMobile ? '5%' : '8%';
    
    // Dynamic Layout Logic for responsiveness
    const dynamicLayout = {
        mainContent: {
            padding: `0 ${horizontalPadding}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 'calc(100vh - 80px - 50px)', 
            flexDirection: isTablet ? 'column' : 'row',
            textAlign: hideRightBlock || isTablet ? 'center' : 'left',
            width: '100%',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 10,
        },
        heroLeft: {
            // FIX: Allows left side to take full width if right block is hidden
            maxWidth: hideRightBlock ? '100%' : (isTablet ? '100%' : '550px'), 
            padding: '20px 0',
            alignItems: hideRightBlock ? 'center' : (isTablet ? 'center' : 'flex-start'),
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 20, 
            justifyContent: hideRightBlock ? 'center' : 'flex-start',
        },
        heroRight: {
            ...baseStyles.heroRight,
            width: isMobile ? '300px' : '450px',
            height: isMobile ? '350px' : '500px',
            marginRight: isTablet ? '0' : '-50px',
            marginTop: isTablet ? '40px' : '0',
            order: isTablet ? '-1' : '0',
        },
    };

    const navLinks = ['Home', 'About', 'Features', 'Pricing'];

    return (
        <div style={baseStyles.container}>
            {/* Background SVG Pattern */}
            <div 
                style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
                    backgroundImage: `url('data:image/svg+xml;base64,${btoa(BLURRED_PATTERN_SVG)}')`,
                }}
            ></div>

            {/* Navbar (z-index: 100) */}
            <nav style={baseStyles.navbar}>
                <div style={baseStyles.logoGroup}>
                    <img 
                        src="/Logo.png" 
                        alt="Peeru Logo" 
                        style={{ height: '40px', marginRight: '8px' }}
                    />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '20px' }}>
                    {/* Navigation Links */}
                    {!isMobile && (
                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                            {navLinks.map(link => (
                                <Link 
                                    key={link} 
                                    to={link === 'Home' ? '/home' : `/${link.toLowerCase()}`}
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: 'none', 
                                        color: link.toLowerCase() === activeLink ? PRIMARY_TEXT_COLOR : '#666',
                                        fontSize: '15px', 
                                        fontWeight: 600, 
                                        borderBottom: link.toLowerCase() === activeLink ? `2px solid ${ACCENT_COLOR}` : 'none',
                                        paddingBottom: '5px',
                                        transition: 'color 0.2s, border-bottom 0.2s'
                                    }}
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                    )}
                    
                    {/* Login Button */}
                    <Link to="/login" style={{ ...baseStyles.navButton, backgroundColor: 'white', color: PRIMARY_TEXT_COLOR, border: '1px solid #ccc', marginRight: '10px' }}>
                        Login
                    </Link>
                    {/* Sign Up Button */}
                    <Link to="/register" style={{ ...baseStyles.navButton, backgroundColor: ACCENT_COLOR, color: 'white', border: `1px solid ${ACCENT_COLOR}` }}>
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div style={dynamicLayout.mainContent}>
                
                {/* Left Side: UNIQUE CONTENT */}
                <div style={dynamicLayout.heroLeft}>
                    {children}
                </div>

                {/* Conditional Right Block */}
                {!hideRightBlock && (
                    <div style={dynamicLayout.heroRight}>
                        <div style={{
                            width: '90%', height: '90%', borderRadius: '50%', overflow: 'hidden', position: 'absolute',
                            filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.1))',
                        }}>
                            <img 
                                src={HERO_IMAGE_URL} 
                                alt="Smiling student with backpack" 
                                style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', filter: 'brightness(1.1) contrast(1.1)'}}
                            />
                        </div>
                        {/* Floating Stat Card 1: Student Trust */}
                        <div style={{ position: 'absolute', top: '20%', left: '-10%', textAlign: 'left', backgroundColor: 'white', padding: '15px 20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', zIndex: 10, fontWeight: 600 }}>
                            <div style={{ fontSize: '20px', color: PRIMARY_TEXT_COLOR }}>1000 +</div>
                            <div style={{ fontSize: '14px', color: '#666', marginTop: '2px' }}>Student Trust</div>
                        </div>

                        {/* Floating Stat Card 2: University Trust */}
                        <div style={{ position: 'absolute', bottom: '15%', right: '0%', textAlign: 'right', alignItems: 'flex-end', backgroundColor: 'white', padding: '15px 20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', zIndex: 10, fontWeight: 600, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '20px', color: PRIMARY_TEXT_COLOR }}>10 +</div>
                            <div style={{ fontSize: '14px', color: '#666', marginTop: '2px' }}>University Trust</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PeeruLayout;