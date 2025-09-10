// ===========================================
// AUTHENTICATION UTILITIES
// ===========================================
// Utility functions for user authentication actions in local development
// Provides logout, authentication checks, and user avatar utilities

/**
 * Utility functions for user authentication actions
 */

/**
 * Handles user logout by clearing the token from localStorage
 * and redirecting to the login page
 * Optimized for local development with detailed logging
 */
export const handleLogout = () => {
    try {
        // Log logout action in development
        if (process.env.NODE_ENV === 'development') {
            console.log('🚪 Logging out user...');
        }
        
        // Remove token from localStorage
        localStorage.removeItem('token');
        
        // Dispatch storage event to notify other components of token removal
        // This ensures all components using useToken hook will update immediately
        window.dispatchEvent(new Event('storage'));
        
        // Log successful logout in development
        if (process.env.NODE_ENV === 'development') {
            console.log('✅ User logged out successfully');
            console.log('🔄 Redirecting to login page...');
        }
        
        // Redirect to login page
        window.location.href = '/login';
        
    } catch (error) {
        console.error('❌ Error during logout:', error);
        // Still redirect even if there's an error clearing storage
        window.location.href = '/login';
    }
};

/**
 * Checks if user is authenticated by verifying token exists in localStorage
 * Enhanced for local development with detailed logging
 * 
 * @returns {boolean} True if user has a valid token
 */
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const hasToken = !!token;
    
    // Log authentication status in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`🔐 Authentication check: ${hasToken ? 'Authenticated' : 'Not authenticated'}`);
        if (hasToken) {
            try {
                // Decode and log token info (without exposing sensitive data)
                const payload = JSON.parse(atob(token.split('.')[1]));
                console.log(`👤 User ID: ${payload.id}, Email: ${payload.email}`);
            } catch (e) {
                console.warn('⚠️  Invalid token format detected');
            }
        }
    }
    
    return hasToken;
};

/**
 * Gets the user's initials from their name for display in avatar
 * Enhanced with better error handling for local development
 * 
 * @param {string} name - User's full name
 * @returns {string} User's initials (max 2 characters)
 */
export const getUserInitials = (name) => {
    // Handle undefined, null, or non-string values
    if (!name || typeof name !== 'string') {
        if (process.env.NODE_ENV === 'development') {
            console.warn('⚠️  getUserInitials: Invalid name provided:', name);
        }
        return 'U'; // Default fallback
    }
    
    const trimmedName = name.trim();
    
    // Handle empty string after trimming
    if (!trimmedName) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('⚠️  getUserInitials: Empty name after trimming');
        }
        return 'U';
    }
    
    // Split name into parts and filter out empty strings
    const nameParts = trimmedName.split(' ').filter(part => part.length > 0);
    
    let initials;
    
    if (nameParts.length >= 2) {
        // Return first letter of first name and first letter of last name
        initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else {
        // Return first two letters of the single name
        initials = trimmedName.substring(0, 2).toUpperCase();
    }
    
    // Log initials generation in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`🆔 Generated initials "${initials}" for name "${trimmedName}"`);
    }
    
    return initials;
};