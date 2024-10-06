import axios from 'axios';

const authApi = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = (email: string, password: string) =>
    authApi.post('/login', { email, password });

export const register = (name: string, email: string, password: string) =>
    authApi.post('/register', { name, email, password });

export const logout = () => authApi.post('/logout');

// export const getUserProfile = () => authApi.get('/user');

export const changePassword = async (data: { current_password: string, new_password: string }) => {
    const token = localStorage.getItem('token'); 
    return authApi.post('/change-password', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default authApi;