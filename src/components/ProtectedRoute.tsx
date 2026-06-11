import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    // si no hay token -> login
    if (!token) {
        return <Navigate to="/" />;
    }

    // si hay token -> deja pasar
    return <Outlet />;
};

export default ProtectedRoute;