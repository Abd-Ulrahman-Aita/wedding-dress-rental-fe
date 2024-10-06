import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Your Laravel API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to set the Authorization header dynamically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            delete config.headers['Authorization'];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API methods
export const getDresses = () => api.get('/dresses');
export const getDressDetail = (id: string) => api.get(`/dresses/${id}`);
export const reserveDress = (data: { dress_id: string; start_date: string; end_date: string }) => api.post('/reservations', data);
export const getUserReservations = () => api.get('/user/reservations');

export default api;