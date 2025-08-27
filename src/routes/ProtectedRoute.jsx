import { Navigate, Outlet } from "react-router-dom";
import { getToken, isTokenExpired, removeLocalVariables } from "../utility/auth.utility";

const ProtectedRoute = () => {
    const token = getToken();

    if (!token || isTokenExpired(token)) {
        removeLocalVariables();
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />; // safe to render protected content
};

export default ProtectedRoute;
