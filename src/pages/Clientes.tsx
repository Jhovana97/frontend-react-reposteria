import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getClientes } from "../api/clientes.api";

function Clientes() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        async function load() {
            const res = await getClientes();
            setClientes(res.data);
        }
        load();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl mb-4">Clientes</h1>

            {clientes.map((c: any) => (
                <div key={c.id} className="border p-3 mb-2 rounded">
                    {c.nombre} - {c.email}
                </div>
            ))}
        </Layout>
    );
}

export default Clientes;