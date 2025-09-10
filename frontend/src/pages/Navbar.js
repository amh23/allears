import { useState, useEffect, useRef } from "react";
import useScreenSize from "../util/useScreenSize";
import { useUser } from "../auth/useUser";
import { useUserProfile } from "../auth/useUserProfile";
import { handleLogout, getUserInitials } from "../auth/authUtils";

const Navbar = ({ menuItems = [] }) => {
  const { width } = useScreenSize();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Use useUser for immediate authentication state from JWT token
  const user = useUser();
  
  // Use useUserProfile for additional profile data from backend (optional)
  const { userProfile, loading } = useUserProfile();
  
  // Determine which user data to display (prefer userProfile, fallback to JWT user data)
  const displayUser = userProfile || user;
  const isLoggedIn = !!user; // User is logged in if JWT token exists and is valid
  
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state on click
  };

  // Toggle user dropdown menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Handle logout action
  const onLogout = () => {
    handleLogout();
  };
  return (
    <nav className="fixed  w-full h-24  bg-white shadow-sm p-4  flex items-center justify-between flex-wrap z-50">
      <div className="flex  items-center justify-start space-x-4 md:px-8 sm:px-4">
        <img src="logo1.png" alt="Logo" className="h-8 w-8 md:h-10 md:w-10 " />
        <span className="font-semibold text-slate-600 text-sm md:text-lg">All Ears</span>
      </div>
        {width < 640 && !isMenuOpen &&  ( // Show hamburger menu on small screen
            <button
              id="btnToggle"
              onClick={toggleMenu}
              className="block md:hidden absolute top-7 right-10"
            >
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
        )}

        {width < 640 && isMenuOpen &&  ( // Show menu when hamburger menu is clicked
          <div 
          class="absolute text-sm  bg-slate-100 text-slate-700 rounded-sm shadow-lg shadow-slate-300 top-8 right-8 "
          >
            <button
              id="btnClose"
              onClick={toggleMenu}
              className="absolute mt-0  pb-3 top-1 right-1"
            >
              <i className="fa-solid fa-close text-l"></i>
            </button>

            {/* User info in mobile menu */}
            {isLoggedIn && displayUser && (
              <div className="px-4 py-3 border-b border-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center h-8 w-8 bg-blue-500 text-white rounded-full">
                    <span className="text-sm font-semibold">
                      {getUserInitials(displayUser.name)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{displayUser.name}</p>
                    <p className="text-xs text-gray-500">{displayUser.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu items */}
            {menuItems.map((item) => (
              <div key={item.id}
                  class="hover:text-slate-800  hover:font-semibold hover:bg-blue-300 focus:bg-blue-100 px-5 py-2"
                  >
                <a
                  href={item.link} 
                >
                  {item.name}
                </a>
              </div>
            ))}
            
            {/* Logout button in mobile menu */}
            {isLoggedIn && (
              <div className="border-t border-gray-300 mt-2 pt-2">
                <button
                  onClick={onLogout}
                  className="w-full text-left px-5 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <i className="fa-solid fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) }
      <div className="hidden md:flex flex-grow max-w-xs sm:max-w-sm md:max-w-md mx-4 mt-4 md:mt-0 w-full md:w-auto">
        <div className="relative">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md pl-10"
            placeholder="Search..."
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            src="../../public/logo1.png"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M18.7 10.9a7.8 7.8 0 11-15.6 0 7.8 7.8 0 0115.6 0z"
            />
          </svg>
        </div>
      </div>
      {/* User Profile Section - Right side */}
      <div className="hidden sm:flex items-center space-x-4 mt-4 md:mt-0 relative" ref={userMenuRef}>
        {loading && !user ? (
          // Loading state - only show when there's no JWT user data yet
          <div className="flex items-center space-x-2">
            <div className="animate-pulse bg-gray-300 rounded-full h-8 w-8 md:h-10 md:w-10"></div>
            <div className="animate-pulse bg-gray-300 rounded h-4 w-20"></div>
          </div>
        ) : isLoggedIn && displayUser ? (
          // User is logged in
          <div className="flex items-center space-x-3">
            {/* User Avatar with initials */}
            <div className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                 onClick={toggleUserMenu}>
              <span className="text-sm md:text-base font-semibold">
                {getUserInitials(displayUser.name)}
              </span>
            </div>
            
            {/* User Name */}
            <span className="font-semibold text-sm text-slate-600 md:text-lg cursor-pointer hover:text-slate-800 transition-colors"
                  onClick={toggleUserMenu}>
              {displayUser.name}
            </span>
            
            {/* Dropdown Arrow */}
            <button onClick={toggleUserMenu} className="text-slate-500 hover:text-slate-700">
              <i className={`fa-solid fa-chevron-${isUserMenuOpen ? 'up' : 'down'} text-sm`}></i>
            </button>
            
            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-50">
                {/* User Info Header */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{displayUser.name}</p>
                  <p className="text-xs text-gray-500">{displayUser.email}</p>
                </div>
                
                {/* Menu Items */}
                <div className="py-1">
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      // Add profile navigation logic here if needed
                    }}
                  >
                    <i className="fa-solid fa-user text-gray-500"></i>
                    <span>Profile</span>
                  </button>
                  
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      // Add settings navigation logic here if needed
                    }}
                  >
                    <i className="fa-solid fa-cog text-gray-500"></i>
                    <span>Settings</span>
                  </button>
                  
                  <hr className="my-1" />
                  
                  {/* Logout Button */}
                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    onClick={onLogout}
                  >
                    <i className="fa-solid fa-sign-out-alt text-red-500"></i>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // User not logged in - show login/signup buttons
          <div className="flex items-center space-x-3">
            <a href="/login" className="text-sm text-slate-600 hover:text-slate-800 font-medium">
              Login
            </a>
            <a href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
              Sign Up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
