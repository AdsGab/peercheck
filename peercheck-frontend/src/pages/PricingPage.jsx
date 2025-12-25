import React, { useState } from 'react';
import PeeruLayout from '../components/PeeruLayout';
import { createPortal } from 'react-dom';

const PricingCard = ({
  title,
  features,
  buttonText,
  cardColor,
  textColor,
  isPremium,
  onButtonClick,
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
    display: 'flex',
    alignItems: 'flex-start',
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
          textAlign: 'center',
        }}
      >
        {title}
      </h2>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
        {features.map((feature, index) => (
          <li key={index} style={featureStyle}>
            <span style={{ marginRight: '10px' }}>✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onButtonClick}
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
          transition: 'transform 0.25s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

{/*Sprint4*/}
const PricingPage = () => {
  const ACCENT_COLOR = '#4DF3C8';
  const DARK_COLOR = '#2C2C2C';

  const [showConfirm, setShowConfirm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.65)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
  };

  const modalStyle = {
    backgroundColor: '#F8F9FA',
    padding: '32px',
    borderRadius: '18px',
    width: '340px',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
    animation: 'scaleIn 0.3s ease',
    backdropFilter: 'blur(8px)', // tambahan
  };

  const primaryButton = {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '14px',
    width: '100%',
    marginBottom: '14px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '15px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const secondaryButton = {
    backgroundColor: 'transparent',
    color: '#666',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '6px',
  };

 const paymentButton = {
    backgroundColor: '#fff',
    color: '#222',
    border: '1px solid #E0E0E0',
    borderRadius: '14px',
    padding: '14px',
    width: '100%',
    marginBottom: '12px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '15px',
    textAlign: 'left',
    display: 'flex',               
    alignItems: 'center',
    gap: '14px',
    transition: 'all 0.25s ease',
  };

  return (
    <PeeruLayout activeLink="pricing" hideRightBlock>
      <h1
        style={{
          fontSize: '26px',
          fontWeight: 800,
          marginTop: '35px',
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
          marginBottom: '35px',
          color: 'black',
        }}
      >
        Choose a plan that fits your needs. Upgrade anytime to unlock more
        reviews and premium features.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <PricingCard
          title="Basic"
          features={[
            'Upload assignments',
            'Receive limited peer reviews',
            'Basic feedback access',
          ]}
          buttonText="Get Started"
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
          isPremium
          onButtonClick={() => setShowConfirm(true)}
        />
      </div>
{/*Sprint4*/}
      {showConfirm &&
        createPortal(
          <div style={overlayStyle}>
            <div style={modalStyle}>
              <h3
                style={{
                  marginBottom: '16px',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#111',
                }}
              >
                Rp 15.000 <span style={{ fontWeight: 500 }}>/ month</span>
              </h3>

              <div
                style={{
                  height: '1px',
                  backgroundColor: '#E0E0E0',
                  margin: '16px 0 20px',
                }}
              />

              <button
                style={primaryButton}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 25px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => {
                  setShowConfirm(false);
                  setShowPayment(true);
                }}
              >
                Pilih Pembayaran
              </button>

              <button
                style={secondaryButton}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#666';
                }}
                onClick={() => setShowConfirm(false)}
              >
                Batal
              </button>
            </div>
          </div>,
          document.body
        )}

        {showPayment &&
          createPortal(
            <div style={overlayStyle}>
              <div style={{ ...modalStyle, width: '360px' }}>
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '18px',
                    color: '#111',
                    textAlign: 'center',
                  }}
                >
                  Choose Payment Method
                </h3>

                {[
                    {
                      name: 'Shopee Pay',
                      logo: 'data:image/png;base64,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',
                    },
                    {
                      name: 'Indomaret / Alfamart',
                      logo: 'data:image/png;base64,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',
                    },
                    {
                      name: 'Google Play',
                      logo: 'data:image/png;base64,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',
                    },
                    {
                      name: 'Bank Transfer',
                      logo: 'data:image/png;base64,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',
                    },
                    {
                      name: 'QRIS',
                      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAAABAQGEhIT09PRoaGi2traPj4/39/d9fX3BwcFhYWGmpqaYmJjU1NTn5+cdHR1ISEhcXFyVlZW5ubno6Og8PDzMzMwODg5UVFSLi4tnZ2cXFxdxcXHu7u4lJSU2NjYuLi7Z2dmioqKurq5NTU3GxsZCQkLTH8O5AAAEZElEQVR4nO3ci3KiMBgF4EQUL1isivdLW7Xb93/DRVESkj8QMBWl5+vMtkMROZwIiHQZAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA1xZODDqzulfNkYAbfIzqXjVHAt6iE26bk5Bvd1PCsV33qjkSJ9zVvQ6/K07YrXsdftffSXjoeqnrS3Do5fJ7l7lm3fzZCP3D5ZGHvjQpSlZnXXph3j/LhB/SbvQn2Y1+mw4kV/5lrtCwL85zujxyIE/qXya1yy+LT+0S9jhv3fBxknAiJhE4f0sSvufORj7SvyaUJqUJSy/szTphfGBsJf+kCcWkFvGzSKj8hphZ/iYlFJNEhxaLIVYDHaLDnI2HDp+ow+YnFMVjlDaoQx3ZoZXKHRYt+I4OV/Saqh1u7RJW77DAHWdtC18V9cVst4TtSJuNEAXyI0t0yLlX8ASH6h0STnqHltbiCUp1yHlU5mkI5RIOKyf0Kif070h3ljNKCUN9lFryKo9Sdwmb2mF//jlkD+hwXbnDe1+H+9nsfM2C6nDhR6lBO02odGi3L/WDyh3euy+9ohJmrmIsTAlDy8NhbcdDkVAbpRNp8cswTaiM0qc/L83pMD5r+xifzTMJ1Q6f/bw0t0PuzfaxcNncDpOLxaNlcztcEwmb1SGV8HU7bH5CapQmr8N9g0fp1+rsu9XcDokjvmDXIXUaktdhAacdZq5iJGdtRzphzpYm3T57Ijssiuiww9O6m5omk0IxpbteaB3yrbaR+XzaVa0Ppg6ZNm+W96W/97ijQztyh3w85WqH78ZPMIkOi+xX93ToIuHP5ZWq7A+Ghke6TLgPw4KVtnwHbEgohiRjb+pAvb3sqITaKLVISI7S+Fk3hQlddBgnZMelsj/gy6MpobMOu5wHhQmlDsvc0qZ2mDktuG1n8l2qyw6tEorN8hPOFKNZcuNFeyRppwkzHSYDNbOl6d0B1eEoXzh20yElvYohdNOE2Q6TC8fKliY6qnTEd9OhZcKpqcNri5ktTdyX5PKIXzIhdUJIXInKSchOt92NWMxOvRXQ5XlpuVFKkBMquw9qlDJyd9NXIrp8b/H4DuMWt8rGj1vcN6lDxny9xUkm4qt3mJ352tRGjvjwDp0nZIOltkudS6dLLz9KGXlcXImIrz9KY9G7dtCYp5+kPL7D81dL+ib9LH8yo3coZlYTsig9Lra0iAPpN1KHOatBrpllQlZ0R4W5w6U016e2XF+/GeVzkSYU7ryD1iLhYNfJsekcTB2Odhsxm6cv+F+gLizYJafxofSbTfI2udfZqHMXCSLLhKzXzsVMHTJ5rh6xYOPCqEfmr4R5zWwSWqESPgWnCZVR+hzQobVn7bAdNKfDfZ/aoX4vm9PhyHCzZ6sxHY6MpyYdJ8uvP+F+avjzp6mbv5esf5T+tvo7/G3o8PX9iYRCI/+6NlqJ/3RhZfhYEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoJr/XKhvV7l91VUAAAAASUVORK5CYII=',
                    },
                    {
                      name: 'Debit Card',
                      logo: 'https://cdn-icons-png.flaticon.com/512/633/633611.png',
                    }].map((method, index) => (
                  <button
                    key={index}
                    style={{
                      ...paymentButton,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                    }}
                    onClick={() => {
                      setShowPayment(false);
                      setShowSuccess(true);
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.boxShadow =
                        '0 8px 20px rgba(0,0,0,0.12)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <img
                      src={method.logo}
                      alt={method.name}
                      style={{
                        width: '24px',
                        height: '24px',
                        objectFit: 'contain',
                      }}
                    />
                    {method.name}
                  </button>
                ))}

                <button
                  style={secondaryButton}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#666';
                  }}
                  onClick={() => setShowPayment(false)}
                >
                  Batal
                </button>
              </div>
            </div>,
            document.body
          )}

        {showSuccess &&
          createPortal(
            <div style={overlayStyle}>
              <div
                style={{
                  ...modalStyle,
                  width: '320px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#4DF3C8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px',
                    boxShadow: '0 8px 20px rgba(77,243,200,0.45)',
                  }}
                >
                <span
                  style={{
                    fontSize: '26px',
                    lineHeight: 1,
                  }}
                >
                ✓
                </span>
                </div>
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 800,
                    marginBottom: '8px',
                    color: '#111',
                  }}
                >
                  Payment Successful
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    opacity: 0.75,
                    marginBottom: '22px',
                    color : 'black',
                    fontWeight : 'bold'
                  }}
                >
                  Your premium plan is now active.
                </p>

                <button
                  style={primaryButton}
                  onClick={() => {
                    setShowSuccess(false);
                    setShowConfirm(false);
                    setShowPayment(false);
                  }}
                >
                  OK
                </button>
              </div>
            </div>,
            document.body
          )
        }
    </PeeruLayout>
  );
};

export default PricingPage;
