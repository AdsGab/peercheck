// src/pages/PricingPage.jsx (FINAL AND AGGRESSIVE CENTERING FIX)

import React from "react";
import { Link } from "react-router-dom";
import PeeruLayout from "../components/PeeruLayout"; 

// --- PRICING COLORS (Approximated from image_d2b6cd.png) ---
const ACCENT_COLOR_PREMIUM = '#4DF3C8'; // Light Teal (for Premium card)
const CARD_BG_FREE = '#467A78';       // Dark Teal (for Free card)
const BUTTON_BG_DARK = 'rgba(0, 0, 0, 0.2)';

// --- CARD COMPONENTS ---

const PlanCard = ({ title, features, price, isPremium = false }) => {
    
    const cardColor = isPremium ? ACCENT_COLOR_PREMIUM : CARD_BG_FREE;
    const textColor = 'white'; 
    
    const cardStyle = {
        width: '100%',
        maxWidth: '450px',
        height: '500px', 
        backgroundColor: cardColor,
        borderRadius: '25px',
        padding: '50px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        margin: '0 20px',
    };

    const priceButton = (
        <Link 
            to={isPremium ? "/register" : "#"} 
            onClick={(e) => { if (!isPremium) e.preventDefault(); }}
            style={{
                backgroundColor: isPremium ? 'white' : BUTTON_BG_DARK,
                color: isPremium ? cardColor : textColor,
                padding: '12px 30px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                marginTop: 'auto', 
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                opacity: 0.9,
            }}
        >
            {price}
        </Link>
    );
    
    const featureStyle = { 
        fontSize: '20px', 
        fontWeight: 700, 
        color: textColor, 
        marginBottom: '25px',
        lineHeight: '1.4',
        display: 'flex',
        alignItems: 'flex-start',
    };

    return (
        <div style={cardStyle}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: textColor, marginBottom: '50px', textAlign: 'center' }}>
                {title}
            </h2>

            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, textAlign: 'left', width: '100%' }}>
                {features.map((feature, index) => (
                    <li key={index} style={featureStyle}>
                        •&nbsp;&nbsp;{feature}
                    </li>
                ))}
            </ul>
            
            {/* Price Button */}
            {priceButton}
        </div>
    );
};


// --- PRICING PAGE COMPONENT ---
const PricingPage = () => {
    return (
        <PeeruLayout activeLink="pricing" hideRightBlock={true}> 
            
            <div style={{
                // ⭐ AGGRESSIVE FIX: The combination of height: 100% and justifyContent: 'center' 
                // in the PARENT (heroLeft, which is flex-column) and THIS wrapper 
                // ensures vertical centering.
                
                // Content of heroLeft needs to be centered vertically, 
                // so we rely on heroLeft's 'justifyContent: center' which is active 
                // when hideRightBlock is true.
                
                // We use flex-row here for horizontal arrangement of the cards.
                display: 'flex',
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                // The height property is key to occupying the vertical space needed for centering
                height: '100%', 
                padding: '50px 0', 
                flexWrap: 'wrap',
                gap: '40px',
            }}>
                {/* 1. Free Plan Card */}
                <PlanCard
                    title="Free Plan"
                    features={[
                        "Only 2 Assignment/Days",
                        "Mixing with other people's tasks",
                    ]}
                    price="Rp.0/Month"
                    isPremium={false}
                />

                {/* 2. Premium Plan Card */}
                <PlanCard
                    title="Premium Plan"
                    features={[
                        "Unlimited Assignment Upload",
                        "Get Highlights for your assignment/review",
                    ]}
                    price="Rp.15.000/Month"
                    isPremium={true}
                />
            </div>
            
        </PeeruLayout>
    );
};

export default PricingPage;