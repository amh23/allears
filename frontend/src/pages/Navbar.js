import { useState } from "react";
import useScreenSize from "../util/useScreenSize";

const Navbar = ({ menuItems = [] }) => {
  const { width } = useScreenSize();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state on click
  };
  return (
    <nav className="fixed  w-full h-24  bg-white shadow-sm p-4  flex items-center justify-between flex-wrap z-50">
      <div className="flex  items-center justify-start space-x-4">
        <img src="logo1.png" alt="Logo" className="h-8 w-8 md:h-10 md:w-10 " />
        <span className="font-semibold text-sm md:text-lg">All Ears</span>
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
          class="absolute text-sm  bg-blue-200  text-slate-700 rounded-sm shadow-lg top-8 right-8 "
          >
            <button
              id="btnClose"
              onClick={toggleMenu}
              className="absolute mt-0 pb-3 top-1 right-3"
            >
              <i className="fa-solid fa-close text-xl"></i>
            </button>

            {menuItems.map((item) => (
              <div key={item.id}
                  class="hover:text-slate-800  hover:font-semibold px-10 py-2"
                  >
                <a
                  href={item.link} 
                >
                  {item.name}
                </a>
              </div>
            ))}
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
      <div className="hidden sm:flex items-center space-x-4 mt-4 md:mt-0">
        <div className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 bg-blue-500 text-white rounded-full">
          <span className="text-sm md:text-base">U</span>
        </div>
        <span className="font-semibold text-sm md:text-lg">User Name</span>
      </div>
    </nav>
  );
};

export default Navbar;
