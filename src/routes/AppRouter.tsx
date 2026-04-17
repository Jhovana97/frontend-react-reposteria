import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Productos";
import Pedidos from "../pages/Pedidos";
import Clientes from "../pages/Clientes";

// Ruta protegida
const PrivateRoute = ({ children }: any) => {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/" />;
};

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Login */}
                <Route path="/" element={<Login />} />

                {/* Rutas protegidas */}
                <Route
                    path="/dashboard"
                    element={
                        // <PrivateRoute>
                            <Dashboard />
                        // </PrivateRoute>
                    }
                />

                <Route
                    path="/productos"
                    element={
                        // <PrivateRoute>
                            <Productos />
                        //</PrivateRoute>
                    }
                />

                <Route
                    path="/pedidos"
                    element={
                        //<PrivateRoute>
                            <Pedidos />
                        //</PrivateRoute>
                    }
                />

                <Route
                    path="/clientes"
                    element={
                        // <PrivateRoute>
                            <Clientes />
                        //</PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}