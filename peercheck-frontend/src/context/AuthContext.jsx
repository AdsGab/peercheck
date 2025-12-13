// src/context/AuthContext.js (Updated)

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// --- 1. Create the Context Object ---
// Export it for use in useContext and useAuth.
export const AuthContext = createContext({
    user: null, // Holds { userId, username, email }
    login: () => {}, // Function to update state after receiving a JWT token
    logout: () => {},
    isAuthenticating: true // New state for loading persistence check
});

// --- 2. The Provider Component ---
export function AuthProvider({ children }) {
    // State to hold decoded user data and loading status
    const [user, setUser] = useState(null); 
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    // Helper function to decode JWT and set user state
    const processToken = (token) => {
        if (!token) {
            setUser(null);
            return;
        }
        try {
            const decoded = jwtDecode(token);
            
            // Check for token expiry
            if (decoded.exp * 1000 < Date.now()) {
                console.warn("JWT expired. Logging out.");
                localStorage.removeItem('token');
                setUser(null);
                return;
            }

            // ⭐ CRITICAL FIX: Map decoded claims to user state.
            // We rely on the backend now including 'name' (Gab) in the payload.
            setUser({
                userId: decoded.sub, 
                username: decoded.name, // This should be 'Gab'
                email: decoded.email,
            });

        } catch (error) {
            console.error("Token processing failed:", error);
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    // ⭐ FIX: Updated login function to accept the token received by LoginPage
    const login = (token) => {
        localStorage.setItem('token', token);
        processToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };
    
    // ⭐ FIX: Effect to check for stored token when the app first loads (Persistence)
    useEffect(() => {
        const token = localStorage.getItem('token');
        processToken(token);
        setIsAuthenticating(false);
    }, []);

    // Return Loading state while checking persistence (prevents flash of content)
    if (isAuthenticating) {
        return <div>Loading authentication state...</div>;
    }

    // The context value now provides the decoded user object and the functions
    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticating }}>
            {children}
        </AuthContext.Provider>
    );
}