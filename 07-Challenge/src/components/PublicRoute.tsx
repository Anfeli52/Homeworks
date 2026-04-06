import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PublicRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Cargando sesion...</p>;
    }

    if (user) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};
