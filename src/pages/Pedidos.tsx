import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getPedidos } from "../api/pedidos.api";

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        async function load() {
            const res = await getPedidos();
            setPedidos(res.data);
        }
        load();
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl mb-4">Pedidos</h1>

            {pedidos.map((p: any) => (
                <div key={p.id} className="border p-3 mb-2 rounded">
                    Pedido #{p.id} - Total: Bs. {p.total}
                </div>
            ))}
        </Layout>
    );
}

export default Pedidos;