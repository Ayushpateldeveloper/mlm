import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HomeIcon, 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';

// Tooltip Component
const Tooltip = ({ children, text }) => {
  return (
    <div className="relative group">
      {children}
      <div className="
        absolute z-10 p-2 top-full left-1/2 transform -translate-x-1/2 mt-2
        bg-gray-800 text-white text-xs rounded-md
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        pointer-events-none
        whitespace-nowrap
      ">
        {text}
      </div>
    </div>
  );
};

// Professional Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div 
      className="relative inline-flex items-center cursor-pointer"
      onClick={toggleTheme}
    >
      <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner transition-colors duration-300 ease-in-out">
        <div 
          className={`
            absolute top-0.5 left-0.5 w-6 h-6 bg-white dark:bg-gray-600 rounded-full shadow-md transform transition-transform duration-300 ease-in-out
            ${theme === 'dark' ? 'translate-x-full' : 'translate-x-0'}
          `}
        >
          {theme === 'dark' ? (
            <MoonIcon className="w-5 h-5 m-0.5 text-blue-500 dark:text-blue-300" />
          ) : (
            <SunIcon className="w-5 h-5 m-0.5 text-yellow-500" />
          )}
        </div>
      </div>
      <span className="ml-3 text-sm text-gray-600 dark:text-gray-300 hidden sm:inline">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
    </div>
  );
};

const DashboardNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Add scroll and click outside event listeners to close mobile menu
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { 
      name: 'Dashboard', 
      icon: HomeIcon, 
      path: '/dashboard' 
    },
    { 
      name: 'Profile', 
      icon: UserCircleIcon, 
      path: '/profile' 
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Title */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="UtilityPro Logo" 
                className="h-10 mr-2 transition-transform duration-300 hover:scale-110" 
              />
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400 transition-colors">
                UtilityPro
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  text-gray-600 dark:text-gray-300 
                  hover:text-blue-600 dark:hover:text-blue-400 
                  px-3 py-2 rounded-md flex items-center 
                  transition duration-300 ease-in-out 
                  hover:bg-blue-50 dark:hover:bg-gray-800
                  ${location.pathname === item.path 
                    ? 'bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-blue-300' 
                    : ''}
                `}
              >
                <item.icon className="h-5 w-5 mr-2 opacity-75" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile View */}
            <div className="flex items-center space-x-2 sm:hidden">
              {/* Theme Toggle for Mobile */}
              <ThemeToggle />

              {/* Visit Website Button */}
              <Tooltip text="Visit Website">
                <button
                  onClick={() => window.location.href = '/'}
                  className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  <GlobeAltIcon className="h-5 w-5" />
                </button>
              </Tooltip>

              {/* Logout Button */}
              <Tooltip text="Logout">
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </Tooltip>

              {/* Hamburger Menu */}
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Visit Website Link */}
              <Tooltip text="Visit Website">
                <Link
                  to="/"
                  className="flex items-center text-sm font-medium text-blue-600 bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-md border border-blue-600/30 dark:border-blue-400/30 px-4 py-2 transition duration-300 ease-in-out"
                >
                  <GlobeAltIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Visit Website
                </Link>
              </Tooltip>

              {/* Logout Button */}
              <Tooltip text="Logout">
                <button
                  onClick={handleLogout}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out
                    flex items-center gap-2
                    bg-red-100 dark:bg-gray-800 text-red-700 dark:text-red-300
                    hover:bg-red-200 dark:hover:bg-red-900 hover:scale-105 active:scale-95 transform shadow-sm hover:shadow-md
                  `}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Logout
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium
                    ${location.pathname === item.path 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800'}
                  `}
                >
                  <item.icon className="h-5 w-5 mr-2 inline-block opacity-75" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;
