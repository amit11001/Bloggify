// src/services/api.js
import axios from 'axios';
import('dotenv').config

const baseurl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: `${baseurl}/api`
});

// Automatically attach JWT token to headers if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;