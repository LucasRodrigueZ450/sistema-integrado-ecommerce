import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ color: "white" }}>Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
