import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">Bloggify</Link>
                <div className="space-x-6 flex items-center">
                    <Link to="/" className="text-gray-600 hover:text-black font-medium transition">Home</Link>
                    
                    {user ? (
                        <>
                            <Link to="/create" className="text-gray-600 hover:text-black font-medium transition">Write</Link>
                            <span className="text-sm text-gray-300">|</span>
                            <span className="text-gray-900 font-semibold">Hi, {user.username}</span>
                            <button 
                                onClick={handleLogout} 
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-black font-medium transition">
                                Login
                            </Link>
                            <Link to="/register" className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-md font-medium transition">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;