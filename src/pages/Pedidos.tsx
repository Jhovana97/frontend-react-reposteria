import { useEffect, useState } from "react";
import Layout from "../components/Layout";

// Extendemos los datos simulados con estados y decoraciones
const MOCK_PEDIDOS = [
    {
        id: "ORD-001",
        cliente: "Juan Pérez",
        fecha: "2026-04-10",
        hora: "14:30",
        total: 120,
        estado: "En Horno", // En Horno, Listo, Entregado
        items: [
            { nombre: "Torta de Tres Leches", cantidad: 2, precio: 30, url: "https://coconut.com.bo/wp-content/uploads/2024/01/torta-clasica-de-tres-leches1.jpg" },
            { nombre: "Refresco Maracuyá", cantidad: 3, precio: 20, url: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" }
        ]
    },
    {
        id: "ORD-002",
        cliente: "María López",
        fecha: "2026-04-11",
        hora: "09:15",
        total: 80,
        estado: "Listo",
        items: [
            { nombre: "Torta de Bodas Mini", cantidad: 1, precio: 60, url: "https://coconut.com.bo/wp-content/uploads/2024/01/torta-clasica-de-tres-leches1.jpg" },
            { nombre: "Papas Fritas XL", cantidad: 1, precio: 20, url: "https://cdn-icons-png.flaticon.com/512/1046/1046786.png" }
        ]
    }
];

function Pedidos() {
    const [pedidos, setPedidos] = useState<any[]>([]);

    useEffect(() => {
        setPedidos(MOCK_PEDIDOS);
    }, []);

    // Función para el color de los estados
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'En Horno': return 'bg-orange-100 text-orange-600 border-orange-200';
            case 'Listo': return 'bg-green-100 text-green-600 border-green-200';
            default: return 'bg-blue-100 text-blue-600 border-blue-200';
        }
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto">
                {/* Encabezado */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Comandas de Hoy </h1>
                        <p className="text-slate-500 font-medium italic">"El secreto está en el tiempo de horneado"</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
                        <div className="text-center"><p className="text-xs text-slate-400">Pendientes</p><p className="font-bold text-orange-500">5</p></div>
                        <div className="w-[1px] bg-slate-100"></div>
                        <div className="text-center"><p className="text-xs text-slate-400">Listos</p><p className="font-bold text-green-500">12</p></div>
                    </div>
                </div>

                {/* Grid de Pedidos */}
                <div className="grid gap-8">
                    {pedidos.map((p) => (
                        <div key={p.id} className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-100/50 border border-slate-50 overflow-hidden flex flex-col md:flex-row">

                            {/* Lado Izquierdo: Info del Cliente */}
                            <div className="md:w-1/3 bg-slate-50/50 p-8 border-r border-dashed border-slate-200">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ID: {p.id}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(p.estado)}`}>
                                        ● {p.estado}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-800 mb-1">{p.cliente}</h2>
                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                                    <span className="bg-white px-2 py-1 rounded-md shadow-sm"> {p.fecha}</span>
                                    <span className="bg-white px-2 py-1 rounded-md shadow-sm">⏰ {p.hora}</span>
                                </div>

                                <div className="mt-auto">
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Total a cobrar</p>
                                    <p className="text-3xl font-black text-indigo-600">Bs. {p.total.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Lado Derecho: Items */}
                            <div className="md:w-2/3 p-8">
                                <h3 className="text-xs font-black uppercase text-slate-400 mb-4 tracking-tighter">Detalle de Productos</h3>
                                <div className="space-y-4">
                                    {p.items.map((item: any, i: number) => (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="relative">
                                                <img
                                                    src={item.url}
                                                    className="w-16 h-16 object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform"
                                                />
                                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                                    {item.cantidad}
                                                </span>
                                            </div>

                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-700">{item.nombre}</h4>
                                                <p className="text-sm text-slate-400">Precio unitario: Bs. {item.precio}</p>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-black text-slate-600">Bs. {item.precio * item.cantidad}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Botones de acción */}
                                <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-2xl shadow-lg shadow-green-100 transition-all">
                                        Marcar como Listo
                                    </button>
                                    {/* <button className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-3 rounded-2xl transition-all">
                                        Ticket
                                    </button> */}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Pedidos;