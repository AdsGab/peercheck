import React, { useState, useEffect } from 'react';
import loginPageIMG from "../assets/loginPageIMG.jpg"; 

// --- 1. CONSTANTS ---
const ACCENT_COLOR = '#4DF3C8';
const DARK_BG = '#1e2025'; 
const CARD_BG = '#ffffff'; 
const INPUT_BG = '#e8e8e8'; 
const OVERLAY_COLOR = 'rgba(29, 29, 29, 0.7)'; 

// --- 2. SVG ICON ---
const GoogleIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    style={{ width: '20px', height: '20px', marginRight: '10px' }}
  >
    <path d="M12.000 4.750c1.884 0 3.528.665 4.877 1.944l3.125-3.125C17.653 1.488 14.934.5 12.000.5c-2.934 0-5.653.988-7.978 2.923l3.125 3.125C8.472 5.415 10.116 4.750 12.000 4.750z" fill="#F4B400"/>
    <path d="M4.022 9.750c-.17.58-.266 1.185-.266 1.815 0 .63.096 1.235.266 1.815l-3.125 3.125c-.482-1.094-.766-2.327-.766-3.715 0-1.388.284-2.621.766-3.715L4.022 9.750z" fill="#DB4437"/>
    <path d="M12.000 19.250c-1.636 0-3.197-.611-4.409-1.748l-3.125 3.125c2.325 1.935 5.044 2.923 7.534 2.923 2.871 0 5.617-.968 7.542-2.923l-3.125-3.125c-1.212 1.137-2.773 1.748-4.409 1.748z" fill="#0F9D58"/>
    <path d="M19.978 14.250c.17-.58.266-1.185-.266 1.815 0-.63-.096-1.235-.266-1.815l3.125-3.125c.482 1.094.766 2.327.766 3.715 0 1.388-.284 2.621-.766 3.715L19.978 14.250z" fill="#4285F4"/>
  </svg>
);

// --- 3. STYLES ---
const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Inter, sans-serif',
    width: '100vw', 
    minHeight: '100vh', 
    margin: 0, 
    padding: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black', 
    backgroundImage: `url(${loginPageIMG})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  leftSide: {
    flex: 1,
    position: 'relative',
    height: '100vh',
    backgroundColor: OVERLAY_COLOR, 
    display: 'flex',
    flexDirection: 'column',
    // FIX: Center content vertically first
    justifyContent: 'center', 
    padding: '60px',
    boxSizing: 'border-box',
  },
  logo: {
    position: 'absolute',
    top: '30px',
    left: '30px', 
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  contentBlock: {
    color: 'white',
    maxWidth: '80%',
    // FIX: Pull the content down from the center point
    marginTop: '150px', 
    marginBottom: '0', 
  },
  subtitle: {
    color: ACCENT_COLOR,
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '15px',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#ccc',
  },
  rightSide: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    height: '100vh', 
    backgroundColor: OVERLAY_COLOR, 
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: CARD_BG,
    borderRadius: '25px', 
    padding: '50px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)', 
    display: 'flex',
    flexDirection: 'column',
    gap: '25px', 
    boxSizing: 'border-box',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '25px', 
    color: '#333',
  },
  input: {
    padding: '18px 16px', 
    borderRadius: '12px',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    backgroundColor: INPUT_BG, 
    fontSize: '16px',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)', 
    color: '#444', 
  },
  buttonBase: {
    padding: '16px 16px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    textAlign: 'center',
    height: '55px', 
  },
};


// --- 4. COMPONENT ---
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isMobile = window.innerWidth <= 1024;

  // CRITICAL FIX: Ensure global body margin/padding is zeroed out
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = 'black'; 
    return () => {
        document.body.style.margin = '';
        document.body.style.padding = '';
        document.body.style.backgroundColor = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const MOCK_EMAIL = 'user@example.com';
    const MOCK_PASSWORD = 'password123';

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
            console.log("Login successful!");
        } else {
            setError(`Invalid credentials. Try: ${MOCK_EMAIL} / ${MOCK_PASSWORD}`);
        }
    } catch (e) {
        setError("An unexpected error occurred during login.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div style={{ ...styles.container, flexDirection: isMobile ? 'column' : 'row' }}>
      
      {/* LEFT SIDE: Hero Content */}
      <div 
        style={{ 
          ...styles.leftSide, 
          width: isMobile ? '100%' : '60%', 
          height: isMobile ? '250px' : '100vh',
        }}
      >
        {/* LOGO POSITIONED ABSOLUTELY from the top-left corner */}
        <div style={styles.logo}>
          <span style={{ color: ACCENT_COLOR }}>Hi!</span> Peers
        </div>
        
        {/* Content Block: Uses margin-top to achieve desired low position */}
        <div style={styles.contentBlock}>
          <h4 style={styles.subtitle}>Upload - Review - Feedback</h4>
          <h1 style={styles.title}>
            Make sure to have good Quality assignments-<br />
            <span>Peer Review Solutions</span>
          </h1>
          <p style={styles.description}>
            The best student website for student to manage their school assignment quality with single website.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div 
        style={{ 
          ...styles.rightSide, 
          width: isMobile ? '100%' : '40%',
          height: isMobile ? 'auto' : '100vh', 
        }}
      >
        <div style={styles.loginCard}>
          <h2 style={styles.formTitle}>Welcome Back!</h2>

          {/* Input Fields */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          
          {/* Forgot Password Container */}
          <div style={{ textAlign: 'right', marginTop: '-15px', marginBottom: '5px' }}>
            <a 
              href="/forgot" 
              style={{ 
                fontSize: '14px', color: '#666', textDecoration: 'none', fontWeight: '500',
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={loading}
            style={{ 
              ...styles.buttonBase,
              backgroundColor: loading ? '#666' : 'black',
              color: 'white',
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div style={{ position: 'relative', textAlign: 'center', margin: '5px 0', height: '14px' }}>
            {/* Horizontal Line */}
            <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', height: '1px', backgroundColor: '#ccc', zIndex: 0 }}></div>
            {/* 'Or' Text */}
            <span style={{ position: 'relative', zIndex: 1, backgroundColor: CARD_BG, padding: '0 10px', fontSize: '14px', color: '#888', fontWeight: '500' }}>Or</span>
          </div>


          {/* Google Button */}
          <button 
            type="button" 
            style={{ 
              ...styles.buttonBase,
              backgroundColor: 'black',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GoogleIcon />
            Continue With Google
          </button>

          {/* Sign Up Link */}
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginTop: '10px' }}>
            <span style={{ color: '#666', fontWeight: '500' }}>Didn’t Have Account? </span>
            <a 
              href="/register" 
              style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}
            > 
              Sign Up Here
            </a>
          </p>

          {/* Error Message */}
          {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px', padding: '10px', backgroundColor: 'rgba(255, 0, 0, 0.1)', borderRadius: '5px' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;