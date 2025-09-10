// ===========================================
// USER AUTHENTICATION HOOK
// ===========================================
// Custom hook to extract and manage user data from JWT tokens
// Optimized for local development with enhanced error handling

import { useState, useEffect } from "react";
import { useToken  } from "./useToken";

/**
 * Custom hook to extract user information from JWT token
 * Provides immediate authentication state without API calls
 * Enhanced for local development with detailed logging
 * 
 * @returns {Object|null} User object with id, email, name, etc. or null if not authenticated
 */
export const useUser = () => {
    const [token] = useToken();

    /**
     * Safely extracts and parses JWT token payload
     * Enhanced error handling for local development
     * 
     * @param {string} token - JWT token string
     * @returns {Object|null} Parsed user data or null if invalid
     */
    const getPayloadFromToken = token => {
        try {
            if (!token || typeof token !== 'string') {
                if (process.env.NODE_ENV === 'development') {
                    console.warn('⚠️ getPayloadFromToken: Invalid token type:', typeof token);
                }
                return null;
            }

            // Split token into parts (header.payload.signature)
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                if (process.env.NODE_ENV === 'development') {
                    console.warn('⚠️ getPayloadFromToken: Invalid token format - expected 3 parts, got:', tokenParts.length);
                }
                return null;
            }

            // Decode the payload (middle part)
            const encodedPayload = tokenParts[1];
            const payload = JSON.parse(atob(encodedPayload));
            
            // Ensure we have at least basic user information with fallbacks
            const userData = {
                id: payload.id,
                email: payload.email,
                // Handle potential name variations and provide fallbacks
                name: payload.name || payload.email?.split('@')[0] || 'User',
                // Handle typo in backend (isVerfied vs isVerified)
                isVerified: payload.isVerified || payload.isVerfied || false,
                // Include any additional payload data
                ...payload
            };
            
            // Log successful token parsing in development
            if (process.env.NODE_ENV === 'development') {
                console.log('✅ JWT token parsed successfully:', {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    isVerified: userData.isVerified
                });
            }
            
            return userData;
            
        } catch (error) {
            // Enhanced error logging for local development
            if (process.env.NODE_ENV === 'development') {
                console.error('❌ Error parsing JWT token:', {
                    error: error.message,
                    tokenLength: token?.length,
                    tokenPreview: token?.substring(0, 20) + '...',
                });
                console.log('💡 This might indicate:');
                console.log('   1. Corrupted token in localStorage');
                console.log('   2. Token from different environment');
                console.log('   3. Expired or malformed token');
                console.log('   Try clearing localStorage and logging in again');
            }
            return null;
        }
    }

    const [user, setUser] = useState(() => {
        if(!token)  return null;
        return getPayloadFromToken(token);
    });

    useEffect(() => {
        if(!token){
            setUser(null);
        } else { 
            setUser(getPayloadFromToken(token));
        }
    },[token]);

    return user;
}