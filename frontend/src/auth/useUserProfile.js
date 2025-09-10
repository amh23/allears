// ===========================================
// USER PROFILE HOOK
// ===========================================
// Custom hook to manage user profile data from backend API
// Handles authentication, loading states, and error management for local development

import { useState, useEffect } from 'react';
import { useToken } from './useToken';
import config from '../config';

/**
 * Custom hook to manage user profile data
 * Fetches user profile information from the backend API
 * Optimized for local development with detailed logging and error handling
 * 
 * @returns {Object} { userProfile, loading, error }
 */
export const useUserProfile = () => {
    const [token] = useToken();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch user profile from backend API
        const fetchUserProfile = async () => {
            // Reset error state at the start
            setError(null);
            
            // If no token exists, clear user profile and exit
            if (!token) {
                setUserProfile(null);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                // Get backend URL from configuration
                const backendUrl = config.backendUrl;
                
                // Log API call in development mode for debugging
                if (config.enableLogging) {
                    console.log('📞 Fetching user profile from:', `${backendUrl}/api/user/profile`);
                }
                
                // Make authenticated API request to backend
                const response = await fetch(`${backendUrl}/api/user/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    // Add timeout for better local development experience
                    signal: AbortSignal.timeout(config.apiTimeout || 10000)
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserProfile(data.user);
                    
                    // Log success in development mode
                    if (config.enableLogging) {
                        console.log('✅ User profile fetched successfully:', data.user.name);
                    }
                } else {
                    // Handle error responses - but don't clear userProfile if it's just a network issue
                    const errorData = await response.json().catch(() => ({}));
                    setError(errorData.message || 'Failed to fetch user profile');
                    // Don't set userProfile to null here - let JWT data be the fallback
                }
            } catch (err) {
                // Handle network errors, timeouts, and other exceptions
                let errorMessage = 'Network error occurred while fetching user profile';
                
                // Provide specific error messages for common local development issues
                if (err.name === 'AbortError') {
                    errorMessage = 'Request timeout - please check your connection';
                } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
                    errorMessage = 'Cannot connect to backend - please check if server is running';
                }
                
                setError(errorMessage);
                
                // Enhanced error logging for local development
                if (config.enableLogging) {
                    console.error('❌ Network Error Details:', {
                        name: err.name,
                        message: err.message,
                        backendUrl: config.backendUrl,
                        timestamp: new Date().toISOString()
                    });
                    console.log('💡 Local Development Tips:');
                    console.log(`   1. Make sure backend is running: cd backend && npm run dev`);
                    console.log(`   2. Backend should be available at: ${config.backendUrl}`);
                    console.log(`   3. Check backend health: ${config.backendUrl}/health`);
                }
                
                // Don't clear userProfile here - JWT data will serve as fallback
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [token]); // Re-fetch when token changes

    return { userProfile, loading, error };
};