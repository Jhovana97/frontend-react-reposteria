import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getProductos } from "../api/productos.api";

function Productos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        async function load() {
            const res = await getProductos();
            setProductos(res.data);
        }
        load();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl mb-4">Productos</h1>

            <div className="grid grid-cols-3 gap-4">
                {productos.map((p: any) => (
                    <div key={p.id} className="border p-4 rounded shadow">
                        <h2>{p.nombre}</h2>
                        <p>Bs. {p.precio}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Productos;