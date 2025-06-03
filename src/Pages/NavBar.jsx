import React, { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar } from '../Slices/SideBarSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isSideBarOpen);
  const { isLoggedIn, name } = useSelector((state) => state.auth);
  const profileImageUrl = localStorage.getItem("profileImageUrl");

  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const getInitial = () => (name?.charAt(0).toUpperCase() || "U");

  return (
    <header className="flex justify-between items-center px-6 py-3 md:px-20 shadow border-b dark:bg-slate-900 dark:text-white transition-all duration-300 bg-white">
      {/* Left section */}
      <div className="flex items-center gap-4">
        {/* Sidebar toggle */}
        <button
          className="hidden md:flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-700 dark:to-slate-800 hover:scale-105 transition"
          onClick={() => dispatch(toggleSideBar())}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <MenuOpenIcon sx={{ color: "white" }} /> : <MenuIcon sx={{ color: "white" }} />}
        </button>

        {/* App name with gradient */}
        <h1 className="text-3xl font-bold font-sans tracking-wide bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text select-none">
          FinSync
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-slate-700 dark:to-slate-800 hover:scale-110 transition"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        {/* Profile or initial */}
        {isLoggedIn && (
          <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold shadow-inner ring-1 ring-slate-300 dark:ring-slate-700">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="User profile"
                className="h-full w-full object-cover"
              />
            ) : (
              getInitial()
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
