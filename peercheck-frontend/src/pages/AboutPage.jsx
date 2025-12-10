// src/pages/AboutPage.jsx

import React from "react";
import PeeruLayout from "../components/PeeruLayout"; 

const AboutPage = () => {
    
    const ACCENT_COLOR = '#4DF3C8'; 
    const PRIMARY_TEXT_COLOR = '#2C2C2C';
    
    return (
        <PeeruLayout activeLink="about"> 
            
            <h4 style={{ color: ACCENT_COLOR, fontSize: '16px', fontWeight: 600, marginBottom: '10px' }}>
                Upload – Review – Feedback
            </h4>
            
            <h1 style={{ color: PRIMARY_TEXT_COLOR, fontSize: '32px', fontWeight: 800, lineHeight: '1.2', marginBottom: '30px' }}>
                About Peeru
            </h1>
            
            <p style={{ color: PRIMARY_TEXT_COLOR, fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' }}>
                <strong style={{fontWeight: 700}}>Peeru</strong> is a collaborative academic platform built for 
                <u style={{textDecorationColor: ACCENT_COLOR}}>students who want to improve the quality of their 
                assignments through peer feedback</u>.
            </p>
            
            <p style={{ color: PRIMARY_TEXT_COLOR, fontSize: '18px', lineHeight: '1.6', opacity: 0.8 }}>
                We believe that learning doesn’t stop at submission — it 
                <u style={{textDecorationColor: ACCENT_COLOR}}>grows through constructive reviews and shared insights.</u>
            </p>
            
        </PeeruLayout>
    );
};

export default AboutPage;