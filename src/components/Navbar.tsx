import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>Dulce Eventos</h2>

            <ul style={styles.menu}>
                <li>Inicio</li>
                <li>Servicios</li>
                <li>Productos</li>
                <li>Contacto</li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#ffb6c1",
    },
    logo: {
        color: "#fff",
    },
    menu: {
        display: "flex",
        listStyle: "none",
        gap: "20px",
        color: "#fff",
        cursor: "pointer",
    },
};

export default Navbar;