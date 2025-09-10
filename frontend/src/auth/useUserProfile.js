import { useState, useEffect } from 'react';
import { useToken } from './useToken';
import config from '../config';

/**
 * Custom hook to manage user profile data
 * Fetches user profile information from the backend API
 * Returns user profile data and loading state
 */
export const useUserProfile = () => {
    const [token] = useToken();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch user profile from backend
        const fetchUserProfile = async () => {
            if (!token) {
                setUserProfile(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Get backend URL from config
                const backendUrl = config.backendUrl || 'http://localhost:8080';
                
                const response = await fetch(`${backendUrl}/api/user/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserProfile(data.user);
                } else {
                    // Handle error responses
                    const errorData = await response.json();
                    setError(errorData.message || 'Failed to fetch user profile');
                    setUserProfile(null);
                }
            } catch (err) {
                setError('Network error occurred while fetching user profile');
                setUserProfile(null);
                console.error('Error fetching user profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [token]); // Re-fetch when token changes

    return { userProfile, loading, error };
};