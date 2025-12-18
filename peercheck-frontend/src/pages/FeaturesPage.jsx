// src/pages/FeaturesPage.jsx

import React from "react";
import PeeruLayout from "../components/PeeruLayout"; 

const FeaturesPage = () => {

    const ACCENT_COLOR = '#4DF3C8';
    const PRIMARY_TEXT_COLOR = '#2C2C2C';

    const FeatureItem = ({ number, title, description }) => (
        <div
            style={{
                backgroundColor: '#ffffff',
                padding: '22px 26px',
                borderRadius: '14px',
                borderLeft: `5px solid ${ACCENT_COLOR}`,
                boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)';
            }}
        >
{/*Sprint3*/}
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span
                    style={{
                        color: PRIMARY_TEXT_COLOR,
                        fontSize: '22px',
                        fontWeight: 800,
                        marginRight: '12px',
                        lineHeight: '1',
                    }}
                >
                    {number}
                </span>
                <h3
                    style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: PRIMARY_TEXT_COLOR,
                        margin: 0,
                    }}
                >
                    {title}
                </h3>
            </div>

            <p
                style={{
                    color: '#666',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    margin: 0,
                    paddingLeft: '34px',
                }}
            >
                {description}
            </p>
        </div>
    );

    return (
        <PeeruLayout activeLink="features">

            {/* PAGE HEADER */}
            <h4
                style={{
                    color: ACCENT_COLOR,
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginTop: '70px',
                    marginBottom: '12px',
                }}
            >
                Platform Capabilities
            </h4>

            <h1
                style={{
                    color: PRIMARY_TEXT_COLOR,
                    fontSize: '25px',
                    fontWeight: 800,
                    lineHeight: '1.2',
                    marginTop: '25px',
                    marginBottom: '10px',
                }}
            >
                Features
            </h1>

            <p
                style={{
                    fontSize: '16px',
                    lineHeight: '1.7',
                    opacity: 0.8,
                    maxWidth: '700px',
                    marginBottom: '40px',
                    color: 'black',
                }}
            >
                Peeru provides powerful features to help students improve their assignments
                through structured peer review and meaningful collaboration.
            </p>

    {/* FEATURE LIST */}
    <div
    style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '22px',
        maxWidth: '720px',
        color: 'black',
    }}
    >
    {[
        {
        title: 'Upload Assignments Easily',
        desc: 'Upload your assignments in seconds. Peeru supports formats such as PDF and DOCX so students can share their work quickly and conveniently.',
        },
        {
        title: 'Peer Review System',
        desc: 'Receive objective and constructive feedback from fellow students to help improve the quality of your assignments before submission.',
        },
        {
        title: 'Rating & Feedback System',
        desc: 'Reviewers can provide structured comments and ratings based on clarity, writing structure, and creativity.',
        },
        {
        title: 'Gamification',
        desc: 'Gamification motivates students to actively review assignments and engage through points, levels, and leaderboards.',
        },
        {
        title: 'Earn Rewards',
        desc: 'Earn rewards in the form of points or cash by becoming a helpful and trusted reviewer.',
        },
    ].map((item, index) => (
        <div
        key={index}
        style={{
            backgroundColor: '#ffffff',
            padding: '22px 26px',
            borderRadius: '14px',
            borderLeft: '5px solid #4DF3C8',
            boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)';
        }}
        >
        <h3
            style={{
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '6px',
            }}
        >
            {index + 1}. {item.title}
        </h3>

        <p
            style={{
            fontSize: '16px',
            lineHeight: '1.6',
            opacity: 0.85,
            margin: 0,
            }}
        >
            {item.desc}
        </p>
        </div>
    ))}
    </div>


        </PeeruLayout>
    );
};

export default FeaturesPage;
