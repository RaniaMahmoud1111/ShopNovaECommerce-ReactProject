import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, token } = useAuth();

  // If no user or no token, redirect to login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
