import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Function to verify token and restore session
    const verifyToken = async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            setIsLoading(false);
            return false;
        }

        try {
            // Verify token with backend
            const response = await axios.get('/auth/verify-token', {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

            // If verification successful, set user and authentication state
            if (response.data.user) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return true;
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            // Clear token if verification fails
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }

        return false;
    };

    // Check token on initial load
    useEffect(() => {
        verifyToken();
    }, []);

    const register = async (username, email, password) => {
        try {
            console.log('Attempting registration:', { 
                username,
                email,
                timestamp: new Date().toISOString() 
            });

            const response = await axios.post('/auth/register', { 
                username,
                email, 
                password 
            });

            console.log('Registration successful:', {
                userId: response.data.user.id,
                username: response.data.user.username,
                email: response.data.user.email,
                timestamp: new Date().toISOString()
            });

            // Store token and user info
            localStorage.setItem('token', response.data.token);
            
            // Set user state
            setUser(response.data.user);
            setIsAuthenticated(true);

            return response.data.user;

        } catch (error) {
            console.error('Registration error:', {
                errorMessage: error.response?.data?.message || error.message,
                errorDetails: error.response?.data?.details,
                errorStatus: error.response?.status,
                timestamp: new Date().toISOString()
            });

            // Detailed error handling
            if (error.response) {
                // The request was made and the server responded with a status code
                switch (error.response.status) {
                    case 400:
                        throw new Error(error.response.data.message || 'Invalid registration data');
                    case 409:
                        throw new Error(error.response.data.message || 'User already exists');
                    case 500:
                        throw new Error('Server error. Please try again later.');
                    default:
                        throw new Error('An unexpected error occurred');
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                throw new Error('No response from server. Please check your connection.');
            } else {
                // Something happened in setting up the request
                console.error('Error setting up registration request:', error.message);
                throw new Error('Error preparing registration request');
            }
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            
            console.log('Login Response:', {
                tokenPresent: !!response.data.token,
                userPresent: !!response.data.user,
                tokenLength: response.data.token?.length
            });

            // Validate token
            if (!response.data.token) {
                throw new Error('No authentication token received');
            }

            // Store token in localStorage
            localStorage.setItem('token', response.data.token);

            // Update auth context
            setUser(response.data.user);
            setIsAuthenticated(true);

            return response.data;
        } catch (error) {
            console.error('Login Error:', {
                message: error.response?.data?.message || error.message,
                status: error.response?.status,
                responseData: error.response?.data
            });

            // Clear any existing token
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);

            // Throw error for component to handle
            throw error;
        }
    };

    const logout = () => {
        console.log('Logging out:', { 
            userId: user?.id, 
            timestamp: new Date().toISOString() 
        });

        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            isLoading, 
            register,
            login, 
            logout,
            setUser 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
