// src/pages/FeaturesPage.jsx

import React from "react";
import PeeruLayout from "../components/PeeruLayout"; 

const FeaturesPage = () => {

    const ACCENT_COLOR = '#4DF3C8';
    const PRIMARY_TEXT_COLOR = '#2C2C2C';
    
    const FeatureItem = ({ number, title, description }) => (
        <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ color: ACCENT_COLOR, fontSize: '22px', fontWeight: 700, marginRight: '10px', marginTop: '3px' }}>
                    {number}.
                </span> 
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: PRIMARY_TEXT_COLOR, margin: 0 }}>
                    {title}
                </h3>
            </div>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', paddingLeft: '32px', margin: 0 }}>
                {description}
            </p>
        </div>
    );

    return (
        <PeeruLayout activeLink="features">
            
            <h1 style={{ color: PRIMARY_TEXT_COLOR, fontSize: '32px', fontWeight: 800, lineHeight: '1.2', marginBottom: '40px' }}>
                Features
            </h1>
            
            <FeatureItem 
                number="1"
                title="Upload Assignments Easily"
                description="Upload your assignments in seconds! Peeru supports various file formats like PDF and DOCX so students can share assignments quickly and conveniently."
            />
            
            <FeatureItem 
                number="2"
                title="Peeru Reviews"
                description="Get objective and constructive feedback from fellow students. Each review helps you improve the quality of your assignment before submitting it to your professor."
            />

            <FeatureItem 
                number="3"
                title="Rating & Feedback System"
                description="Reviewers can not only provide comments, but also rate assignments based on aspects like clarity of ideas, writing structure, and creativity to provide more meaningful feedback."
            />
            
            <FeatureItem 
                number="4"
                title="Gamification"
                description="Gamification can make students have a pleasure to help the other and encourage them to reach the top leader of subjects."
            />
            
            <FeatureItem 
                number="5"
                title="Earn good rewards"
                description="And you can get rewards in the form of cash if you are a good reviewer."
            />

        </PeeruLayout>
    );
};

export default FeaturesPage;