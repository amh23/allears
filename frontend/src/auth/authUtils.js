/**
 * Utility functions for user authentication actions
 */

/**
 * Handles user logout by clearing the token from localStorage
 * and redirecting to the login page
 */
export const handleLogout = () => {
    try {
        // Remove token from localStorage
        localStorage.removeItem('token');
        
        // Redirect to login page
        window.location.href = '/login';
        
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error);
        // Still redirect even if there's an error clearing storage
        window.location.href = '/login';
    }
};

/**
 * Checks if user is authenticated by verifying token exists
 * @returns {boolean} True if user has a valid token
 */
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

/**
 * Gets the user's initials from their name for display in avatar
 * @param {string} name - User's full name
 * @returns {string} User's initials (max 2 characters)
 */
export const getUserInitials = (name) => {
    if (!name) return 'U';
    
    const nameParts = name.trim().split(' ');
    if (nameParts.length >= 2) {
        // Return first letter of first name and first letter of last name
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else {
        // Return first two letters of the single name
        return name.substring(0, 2).toUpperCase();
    }
};