import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon, 
  SunIcon, 
  MoonIcon,
  UserCircleIcon
} from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { MdDashboard } from 'react-icons/md';

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

// Auth Button Component for consistent styling
const AuthButton = ({ to, variant = 'primary', children, className = '' }) => {
  const baseStyle = "px-3 py-1.5 rounded-lg text-sm font-medium transition duration-300 ease-in-out hover:scale-105 active:scale-95 transform";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm hover:shadow-md",
    secondary: "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
  };

  return (
    <Link
      to={to}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
};

const NavItem = ({ to, children, className = '' }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out
        ${isActive 
          ? 'bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-300' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-400'}
        ${className}
      `}
    >
      {children}
    </NavLink>
  );
};

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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-3"
            >
              <img 
                src="/logo.svg" 
                alt="UtilityPro Logo" 
                className="h-10 w-10 transition-transform duration-300 hover:scale-110" 
              />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                UtilityPro
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              <NavItem to="/" end>Home</NavItem>
              <NavItem to="/services">Services</NavItem>
              <NavItem to="/about">About</NavItem>
              <NavItem to="/contact">Contact</NavItem>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Authentication Buttons */}
            <div className="flex items-center space-x-3">
              {!isAuthenticated ? (
                <AuthButton to="/login" variant="primary">
                  Login
                </AuthButton>
              ) : (
                <>
                  <Tooltip text="Dashboard">
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) => `
                        px-3 py-2 rounded-md text-sm font-medium transition duration-300
                        ${isActive 
                          ? 'bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-300' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800'}
                      `}
                    >
                      Dashboard
                    </NavLink>
                  </Tooltip>

                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition duration-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mobile-menu bg-white dark:bg-gray-900 shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <NavItem to="/" end className="block w-full">Home</NavItem>
              <NavItem to="/services" className="block w-full">Services</NavItem>
              <NavItem to="/about" className="block w-full">About</NavItem>
              <NavItem to="/contact" className="block w-full">Contact</NavItem>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <ThemeToggle />
                  {!isAuthenticated ? (
                    <AuthButton to="/login" variant="primary">
                      Login
                    </AuthButton>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
