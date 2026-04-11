import Layout from "../components/Layout";

function Dashboard() {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 shadow rounded">Ventas</div>
                <div className="bg-white p-4 shadow rounded">Pedidos</div>
                <div className="bg-white p-4 shadow rounded">Clientes</div>
            </div>
        </Layout>
    );
}

export default Dashboard;