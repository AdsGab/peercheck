// src/pages/AboutPage.jsx

import React from "react";
import PeeruLayout from "../components/PeeruLayout"; 

const AboutPage = () => {
    
    const ACCENT_COLOR = '#4DF3C8'; 
    const PRIMARY_TEXT_COLOR = '#000000ff';
    
    return (
        <PeeruLayout activeLink="about"> 

{/*Sprint 3*/}
  {/* ABOUT PEERU */}

  <h1
    style={{
      color: PRIMARY_TEXT_COLOR,
      fontSize: '25px',
      fontWeight: 800,
      lineHeight: '1.2',
      marginBottom: '24px',
    }}
  >
    About Peeru
  </h1>

  <p
    style={{
      color: PRIMARY_TEXT_COLOR,
      fontSize: '16px',
      lineHeight: '1.7',
      marginBottom: '18px',
      maxWidth: '700px',
    }}
  >
    <strong>Peeru</strong> is a collaborative academic platform built for
    <span style={{ borderBottom: `3px solid ${ACCENT_COLOR}`, marginLeft: 4 }}>
    students who want to improve the quality of their assignments
    through peer feedback.
    </span>
  </p>

  <p
    style={{
      color: PRIMARY_TEXT_COLOR,
      fontSize: '16px',
      lineHeight: '1.7',
      opacity: 0.8,
      maxWidth: '700px',
      marginBottom: '36px',
    }}
  >
    We believe that learning doesn’t stop at submission — it grows through
    constructive reviews, shared insights, and collaboration.
  </p>

  {/* HOW IT WORKS */}
  <h2
    style={{
      color: 'black',
      fontSize: '25px',
      fontWeight: 800,
      marginBottom: '10px',
    }}
  >
    How it works?
  </h2>

  <p
    style={{
      fontSize: '16px',
      opacity: 0.75,
      marginBottom: '32px',
      maxWidth: '600px',
      color: 'black',
    }}
  >
    Peeru helps students improve assignments through a structured peer review process.
  </p>

  {/* STEP LIST */}
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
        title: 'Upload Assignment',
        desc: 'Students upload assignments or documents they wish to review before submitting them to lecturers.',
      },
      {
        title: 'Get Peer Reviewer',
        desc: 'Peeru matches relevant reviewers based on field, topic, or experience.',
      },
      {
        title: 'Review or Get Reviewed',
        desc: 'Receive structured feedback or review other students’ work using clear rubrics.',
      },
      {
        title: 'Review Ready',
        desc: 'All feedback is collected and ready to be used for assignment improvement.',
      },
      {
        title: 'Get Points',
        desc: 'Earn points by giving constructive reviews or completing missions on Peeru.',
      },
      {
        title: 'Exchange Points',
        desc: 'Points can be exchanged for additional reviews or other benefits.',
      },
    ].map((step, index) => (
      <div
        key={index}
        style={{
          backgroundColor: '#ffffff',
          padding: '20px 24px',
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
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: '6px',
          }}
        >
          {index + 1}. {step.title}
        </h3>

        <p
          style={{
            fontSize: '15px',
            lineHeight: '1.6',
            opacity: 0.85,
          }}
        >
          {step.desc}
        </p>
      </div>
    ))}
  </div>

</PeeruLayout>

    );
};

export default AboutPage;
