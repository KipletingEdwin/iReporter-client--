import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Show loading state while checking auth
  if (loading) return <div className="text-center p-10">Loading...</div>;

  // Redirect to login if not authenticated
  return isAuthenticated ? children : <Navigate to="/login" />;
}
