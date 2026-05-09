import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/users/me'); 
                    // /me usually returns just the user object
                    setUser(res.data);
                } catch (error) {
                    console.error("Token verification failed:", error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/users/login', { email, password });
        console.log("Backend Login Response:", res.data); // Check your browser console!

        localStorage.setItem('token', res.data.token);
        
        // FIX: If your backend nests the user data under 'user', use res.data.user.
        // If it sends it flat alongside the token, use res.data.
        const userData = res.data.user ? res.data.user : res.data;
        setUser(userData);
    };

    const register = async (username, email, password) => {
        const res = await api.post('/users/register', { username, email, password });
        console.log("Backend Register Response:", res.data); // Check your browser console!

        localStorage.setItem('token', res.data.token);
        
        // FIX: Apply the same logic here to ensure consistency
        const userData = res.data.user ? res.data.user : res.data;
        setUser(userData); 
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};