import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
    timeout: 10000,
    headers:{
        'Content-Type':'application/json',
    },
});

// Request interceptor: automatically injects auth token if they exist
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME)
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: catch global errors (e.g., 401 unauthorized, 500 server errors)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response){
            // example: redirect to login if token expires
            if (error.response.status === 401){
                console.warn('Unauthorized! redirectign to login or wiping token...');
                localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
            }
        }
        return Promise.reject(error)
    }
);

export default apiClient;
