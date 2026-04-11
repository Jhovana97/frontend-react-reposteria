import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-pink-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">Dulce Eventos</h1>

            <ul className="flex gap-6">
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/productos">Productos</Link>
                </li>
                <li>
                    <Link to="/pedidos">Pedidos</Link>
                </li>
                <li>
                    <Link to="/clientes">Clientes</Link>
                </li>
            </ul>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
                className="bg-white text-pink-500 px-3 py-1 rounded"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;