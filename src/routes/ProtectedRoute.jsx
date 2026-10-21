import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Renders children only for a signed-in user whose token was verified by the API.
// MainLayout loads the profile (GET /auth/me) once; if that fails the token is
// cleared and this guard redirects to the login page.
export default function ProtectedRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return children;
}
