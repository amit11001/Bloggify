import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);

    // Wait for the auth check to finish before rendering routes
    if (loading) return <div className="text-center mt-20 text-gray-500">Verifying session...</div>;

    // If no user is logged in, redirect to the login page
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;