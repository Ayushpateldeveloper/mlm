import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
const AuthContext = createContext(null);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Validate token with backend
  const validateToken = async (token) => {
    try {
      console.log('Attempting to validate token:', token);
      
      const response = await axios.get('http://localhost:5000/api/auth/validate', {
        headers: { 
          'Authorization': `Bearer ${token}` 
        }
      });

      console.log('Token validation response:', response.data);
      return response.data.valid === true;
    } catch (error) {
      console.error('Token validation failed:', error.response?.data || error.message);
      return false;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      console.log('Attempting login for:', email);
      
      const response = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });

      console.log('Login response:', response.data);

      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('authToken', response.data.token);
        
        // Set user data and authentication state
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        return { 
          success: true, 
          token: response.data.token,
          user: response.data.user 
        };
      }

      return { 
        success: false, 
        message: 'Login failed' 
      };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setIsAuthenticated(false);
      return { 
        success: false, 
        message: error.response?.data?.message || 'An unexpected error occurred' 
      };
    }
  };

  // Logout function
  const logout = () => {
    // Remove token and user data
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Check token on app load
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('authToken');
      
      console.log('Checking stored token:', token);
      
      setIsLoading(true);

      if (token) {
        try {
          // Validate token with backend
          const isValid = await validateToken(token);
          
          console.log('Token validation result:', isValid);
          
          if (isValid) {
            // Fetch user data if token is valid
            try {
              const response = await axios.get('http://localhost:5000/api/auth/me', {
                headers: { 
                  'Authorization': `Bearer ${token}` 
                }
              });
              
              console.log('User data fetched:', response.data);
              
              setUser(response.data.user);
              setIsAuthenticated(true);
            } catch (error) {
              console.error('Failed to fetch user data:', error.response?.data || error.message);
              logout();
            }
          } else {
            // Invalid token, logout
            console.log('Token is invalid, logging out');
            logout();
          }
        } catch (error) {
          console.error('Token validation error:', error);
          logout();
        }
      } else {
        console.log('No token found');
        setIsAuthenticated(false);
      }
      
      // Finished loading
      setIsLoading(false);
    };

    checkToken();
  }, []);

  // Context value
  const contextValue = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
