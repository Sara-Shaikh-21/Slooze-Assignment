import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hasAccess } from '../utils/auth';

interface ProtectedRouteProps {
  requiredRole?: 'manager' | 'storekeeper';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check role access
  if (requiredRole && !hasAccess(requiredRole)) {
    // Redirect to appropriate page based on role
    return <Navigate to={user.role === 'manager' ? '/' : '/products'} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;