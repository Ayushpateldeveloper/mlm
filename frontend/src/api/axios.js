import axios from 'axios';

// Create an axios instance with base configuration
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
    timeout: 10000,  // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for adding token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Optional: Add silent error tracking or reporting
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., logout user
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
