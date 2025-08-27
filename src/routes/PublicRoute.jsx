import { Navigate, Outlet } from "react-router-dom";
import { getToken, isTokenExpired } from "../utility/auth.utility";

const PublicRoute = () => {
    const token = getToken();

    if (token && !isTokenExpired(token)) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
};

export default PublicRoute;