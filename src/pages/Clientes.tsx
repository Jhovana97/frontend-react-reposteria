import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getClientes } from "../api/clientes.api";
import { data } from "react-router-dom";

// Datos simulados con contexto de pastelería
const MOCK_CLIENTES = [
    { id: 1, nombre: "Lucía Fernández", email: "lucia.f@gmail.com", pedidosRealizados: 12, favorito: "Pastel de Red Velvet", nivel: "VIP" },
    { id: 2, nombre: "Roberto Gómez", email: "rober_bakery@outlook.com", pedidosRealizados: 3, favorito: "Cheesecake de Maracuyá", nivel: "Frecuente" },
    { id: 3, nombre: "Carmen Ruiz", email: "carmen.pasteles@yahoo.com", pedidosRealizados: 1, favorito: "Macarons de Lavanda", nivel: "Nuevo" },
    { id: 4, nombre: "Daniel Sosa", email: "dan_sweet@gmail.com", pedidosRealizados: 25, favorito: "Tarta de Chocolate Amargo", nivel: "VIP" },
];

function Clientes() {
    const [clientes, setClientes] = useState<any[]>([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState<any | null>(null);
    
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        async function fetchClientes() {
            const res = await getClientes();
            console.log(res.data);
            setClientes(res.data); // Usa datos reales o simulados si falla la API
        }
        fetchClientes();
    }, []);

    return (
        <Layout>
            {/* Encabezado con Estilo */}
            <div className="mb-8 border-b border-pink-100 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="text-pink-500 font-semibold tracking-widest uppercase text-sm">Nuestra Comunidad</span>
                    <h1 className="text-4xl font-extrabold text-pink-900 mt-1">Amantes del Dulce </h1>
                    <p className="text-rose-400 mt-2">Listado de clientes que endulzan nuestro día a día.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg shadow-pink-200 transition-all transform hover:scale-105">
                        Registrar Cliente
                    </button>
                </div>
            </div>

            {/* Grid de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clientes.map((c) => (
                    <div key={c.id} className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50 hover:shadow-xl transition-shadow relative overflow-hidden group">

                        {/* Decoración de fondo de la tarjeta */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50"></div>

                        <div className="relative">
                            {/* Badge de Nivel */}
                            <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4 inline-block shadow-sm
                ${c.nivel === 'VIP' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                    c.nivel === 'Frecuente' ? 'bg-pink-100 text-pink-700 border border-pink-200' :
                                        'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                {c.nivel}
                            </span>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-300 flex items-center justify-center text-white text-xl font-bold shadow-inner">
                                    {c.nombre.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800 leading-tight">{c.nombre}</h2>
                                    <p className="text-sm text-gray-400">{c.email}</p>
                                </div>
                            </div>

                            <div className="space-y-3 border-t border-dashed border-pink-100 pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 italic">Favorito:</span>
                                    <span className="font-semibold text-rose-600">{c.favorito}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 italic">Pedidos:</span>
                                    <span className="bg-pink-50 text-pink-600 font-bold px-2 rounded">{c.pedidosRealizados}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setClienteSeleccionado(c);
                                    setMostrarModal(true);
                                }}
                                className="text-xs font-bold py-2 px-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-colors"
                            >
                                Ver Pedidos
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {mostrarModal && clienteSeleccionado && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative">

                        {/* Botón cerrar */}
                        <button
                            onClick={() => setMostrarModal(false)}
                            className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
                        >
                            ✕
                        </button>

                        {/* Contenido */}
                        <h2 className="text-xl font-bold text-pink-700 mb-4">
                            Pedidos de {clienteSeleccionado.nombre}
                        </h2>

                        {/* Aquí luego puedes mapear pedidos reales */}
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">
                                (Aquí mostrarás los pedidos del cliente)
                            </p>

                            <div className="bg-pink-50 p-3 rounded-lg">
                                Pedido torta 
                            </div>

                            <div className="bg-pink-50 p-3 rounded-lg">
                                🎂 Pedido chocolate 2
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Clientes;