import { Navigate, Outlet } from "react-router-dom";
import { getRoleFromToken } from "./roleHelper";

const ProtectedRoute = ({ allowRoles }) => {
  const role = getRoleFromToken();
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
