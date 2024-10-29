// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If authenticated, redirect to homepage
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children; // If not authenticated, return the children components
};

export default ProtectedRoute;
