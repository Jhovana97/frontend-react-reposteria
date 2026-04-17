import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-pink-300 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <img 
                src="https://scontent.flpb1-1.fna.fbcdn.net/v/t39.30808-6/488648712_1211373790851270_6031118923942219852_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=YtVLfC9U_pgQ7kNvwHgnpkN&_nc_oc=Adov2ovqmClFZYDr-5SU2cuidGL928pc4pvS-I3eqJz85BQBO_SNIIL5EU__LT9TkXQ0MldtO41DG6mxD_MgzZf6&_nc_zt=23&_nc_ht=scontent.flpb1-1.fna&_nc_gid=5ik8q3Yu181fSTYpuATjyg&_nc_ss=7a389&oh=00_Af12WvT_MaJAlDI7YFnaCrRMp0DeOlFhHMgdVp1c_-NpiQ&oe=69E2534D" 
                alt="Dulce Eventos" 
                className="h-18 w-16 rounded-full object-cover"
            />

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