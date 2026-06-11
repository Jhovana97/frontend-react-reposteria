import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-pink-300 text-white px-6 py-4 flex justify-between items-center shadow-md">
            {/* Logo más grande pero contenido en el nav */}
            <div className="flex items-center">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDopBnIcSH3i4CKVKVqVTW7rGk9TW-L5ioEQ&s"
                        alt="Dulce Eventos"
                        className="w-full h-full object-cover scale-150"
                    />
                </div>
            </div>

            <ul className="flex gap-6">
                <li>
                    <Link to="/dashboard" className="font-bold hover:text-pink-100 transition-colors">Dashboard</Link>
                </li>
                <li>
                    <Link to="/productos" className="font-bold hover:text-pink-100 transition-colors">Productos</Link>
                </li>
                <li>
                    <Link to="/pedidos" className="font-bold hover:text-pink-100 transition-colors">Pedidos</Link>
                </li>
                <li>
                    <Link to="/clientes" className="font-bold hover:text-pink-100 transition-colors">Clientes</Link>
                </li>
            </ul>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
                className="bg-white text-pink-500 px-4 py-2 rounded-lg font-bold hover:bg-pink-50 transition-all active:scale-95"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;