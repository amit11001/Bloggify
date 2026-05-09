// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/'); // Redirect to home on success
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Welcome Back</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        required 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        required 
                    />
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;