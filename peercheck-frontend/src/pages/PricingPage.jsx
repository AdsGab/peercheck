import React from 'react';
import PeeruLayout from '../components/PeeruLayout';

{/*Sprint3*/}
const PricingCard = ({
  title,
  features,
  buttonText,
  cardColor,
  textColor,
  isPremium,
}) => {
  const BUTTON_BG_DARK = '#2C2C2C';

  const cardStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '420px',
    height: '520px',
    backgroundColor: cardColor,
    borderRadius: '26px',
    padding: '50px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    boxShadow: isPremium
      ? '0 18px 45px rgba(77,243,200,0.45)'
      : '0 12px 30px rgba(0,0,0,0.25)',
    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
  };

  const featureStyle = {
    fontSize: '18px',
    fontWeight: 600,
    color: textColor,
    marginBottom: '22px',
    lineHeight: '1.5',
    display: 'flex',
    alignItems: 'flex-start',
    opacity: 0.95,
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = isPremium
          ? '0 28px 60px rgba(77,243,200,0.6)'
          : '0 20px 45px rgba(0,0,0,0.35)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = cardStyle.boxShadow;
      }}
    >
      {/* PREMIUM BADGE */}
      {isPremium && (
        <div
          style={{
            position: 'absolute',
            top: '18px',
            right: '22px',
            backgroundColor: 'white',
            color: cardColor,
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          Most Popular
        </div>
      )}

      <h2
        style={{
          fontSize: '30px',
          fontWeight: 800,
          color: textColor,
          marginBottom: '40px',
          letterSpacing: '0.5px',
          textAlign: 'center',
        }}
      >
        {title}
      </h2>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
        {features.map((feature, index) => (
          <li key={index} style={featureStyle}>
            <span style={{ marginRight: '10px', fontSize: '20px' }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        style={{
          backgroundColor: isPremium ? 'white' : BUTTON_BG_DARK,
          color: isPremium ? cardColor : textColor,
          padding: '14px 36px',
          borderRadius: '50px',
          fontSize: '16px',
          fontWeight: 700,
          border: 'none',
          marginTop: 'auto',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          opacity: 0.95,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.opacity = '0.95';
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

const PricingPage = () => {
  const ACCENT_COLOR = '#4DF3C8';
  const DARK_COLOR = '#2C2C2C';

  return (
    <PeeruLayout activeLink="pricing" hideRightBlock>
      {/* HEADER */}
      <h1
        style={{
          fontSize: '25px',
          fontWeight: 800,
          marginTop: '50px',
          marginBottom: '16px',
          color: 'black',
        }}
      >
        Pricing Plans
      </h1>

      <p
        style={{
          fontSize: '16px',
          opacity: 0.8,
          maxWidth: '700px',
          marginBottom: '48px',
          color: 'black',
        }}
      >
        Choose a plan that fits your needs. Upgrade anytime to unlock more
        reviews and premium features.
      </p>

      {/* PRICING CARDS */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <PricingCard
          title="Basic"
          features={[
            'Upload assignments',
            'Receive limited peer reviews',
            'Basic feedback access',
          ]}
          buttonText="You Are Here"
          cardColor={DARK_COLOR}
          textColor="white"
          isPremium={false}
        />

        <PricingCard
          title="Premium"
          features={[
            'Unlimited peer reviews',
            'Priority reviewers',
            'Earn more points',
            'Exchange points for cash',
          ]}
          buttonText="Upgrade Now"
          cardColor={ACCENT_COLOR}
          textColor={DARK_COLOR}
          isPremium={true}
        />
      </div>
    </PeeruLayout>
  );
};

export default PricingPage;
