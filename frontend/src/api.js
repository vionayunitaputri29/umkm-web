import axios from 'axios';

const api = axios.create({
    baseURL: "https://umkm-web.onrender.com/api"
});

// Otomatis tempelkan token ke setiap request jika user sudah login
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['X-auth-token'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;