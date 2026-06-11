import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Productos from "../pages/Productos";
import Pedidos from "../pages/Pedidos";
import Clientes from "../pages/Clientes";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                {/* pública */}
                <Route path="/" element={<Login />} />

                {/* protegidas */}
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/productos"
                        element={<Productos />}
                    />

                    <Route
                        path="/pedidos"
                        element={<Pedidos />}
                    />

                    <Route
                        path="/clientes"
                        element={<Clientes />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}