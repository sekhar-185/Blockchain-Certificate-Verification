import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;
  if (allowedRole && role !== allowedRole)
    return <Navigate to="/" replace />;

  try {
    jwtDecode(token); // validates token format
    return <Outlet />;
  } catch {
    return <Navigate to="/" replace />;
  }
}
