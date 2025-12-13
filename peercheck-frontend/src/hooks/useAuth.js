// src/hooks/useAuth.js

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        // This helpful error message directs you to wrap the app in AuthProvider
        throw new Error('useAuth must be used within an AuthProvider');
    }

    // Now, context is guaranteed to be the value object from the Provider
    return context;
}