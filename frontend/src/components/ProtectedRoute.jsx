import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute component that verifies authentication status via stored token.
 * Optionally validates user role against allowedRoles.
 * Redirects unauthenticated users to /login and unauthorized users to /dashboard.
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    let user = null;
    try {
      user = userStr ? JSON.parse(userStr) : null;
    } catch {
      user = null;
    }

    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children ? children : <Outlet />;
}
