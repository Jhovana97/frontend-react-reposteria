//import React from 'react';
import Layout from "../components/Layout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { getClientes } from "../api/clientes.api";


function Dashboard() {

    const [clientes, setClientes] = useState<any[]>([]);
    const [pedidos, setPedidos] = useState<any[]>([]);

    useEffect(() => {
        async function cargarDatos() {
            try {

                const clientesRes =
                    await getClientes();

                setClientes(clientesRes.data);

                const pedidosRes = await fetch(
                    "https://backend-nest-gestionar-pasteleria.onrender.com/pedidos"
                );

                const pedidosData =
                    await pedidosRes.json();

                setPedidos(pedidosData);

            } catch (error) {
                console.error(error);
            }
        }

        cargarDatos();
    }, []);



    const ventasTotales = pedidos.reduce(
        (acc, pedido) =>
            acc + Number(pedido.total),
        0
    );

    const pendientes = pedidos.filter(
        p => p.estado === "pendiente"
    ).length;

    const entregados = pedidos.filter(
        p => p.estado === "entregado"
    ).length;

    const cancelados = pedidos.filter(
        p => p.estado === "cancelado"
    ).length;

    const dataVentas = [
        {
            estado: "Pendientes",
            cantidad: pendientes
        },
        {
            estado: "Entregados",
            cantidad: entregados
        },
        {
            estado: "Cancelados",
            cantidad: cancelados
        }
    ];

    const stats = [
        {
            title: "Ventas Totales",
            value: `Bs. ${ventasTotales.toFixed(2)}`,
            color: "from-emerald-400 to-teal-500",
            shadow: "shadow-emerald-200",
            icon: "💰",
            percentage: "Total"
        },
        {
            title: "Pedidos",
            value: pedidos.length,
            color: "from-orange-400 to-amber-500",
            shadow: "shadow-orange-200",
            icon: "🥐",
            percentage: "Registrados"
        },
        {
            title: "Clientes",
            value: clientes.length,
            color: "from-pink-400 to-rose-500",
            shadow: "shadow-pink-200",
            icon: "✨",
            percentage: "Activos"
        }
    ];

    return (
        <Layout>
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                        ¡Buen día, Chef!
                    </h1>
                    <p className="text-slate-500 font-medium">Gestiona tu repostería con datos en tiempo real.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {stats.map((stat, index) => (
                    <div key={index} className={`bg-gradient-to-br ${stat.color} p-7 rounded-[2.5rem] shadow-2xl ${stat.shadow} text-white`}>
                        <div className="flex justify-between items-center mb-4">
                            <span className="bg-white/20 p-3 rounded-2xl text-2xl">{stat.icon}</span>
                            <span className="text-xs font-black bg-black/10 px-2 py-1 rounded-lg">{stat.percentage}</span>
                        </div>
                        <h2 className="text-xs font-bold uppercase opacity-80">{stat.title}</h2>
                        <p className="text-4xl font-black">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LADO IZQUIERDO: SE MANTIENE EL RESUMEN Y LOS BOTONES */}
                <div className="lg:col-span-2 bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[3rem] border border-slate-50 relative overflow-hidden group">

                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] -mr-32 -mt-32 opacity-60"></div>

                    <div className="relative z-10">

                        <div className="h-14 w-14 bg-gradient-to-tr from-pink-500 to-rose-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-100">
                            <span className="text-2xl">📦</span>
                        </div>

                        <h2 className="text-3xl font-black text-slate-800 mb-4">
                            Pedidos <span className="text-pink-500">recientes</span>
                        </h2>

                        <p className="text-slate-500 leading-relaxed mb-8 max-w-md text-lg">
                            Aquí puedes ver los últimos pedidos registrados en tu sistema de repostería.
                        </p>

                        {/* LISTA DE PEDIDOS */}
                        <div className="space-y-3 mb-8">
                            {pedidos.slice(0, 3).map((pedido, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl"
                                >
                                    <div>
                                        <p className="font-bold text-slate-700">
                                            Pedido #{pedido.id}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            {pedido.cliente?.nombre || "Cliente"}
                                        </p>
                                    </div>

                                    <span className={`text-xs font-bold px-3 py-1 rounded-full
                        ${pedido.estado === "entregado"
                                            ? "bg-emerald-100 text-emerald-600"
                                            : pedido.estado === "pendiente"
                                                ? "bg-amber-100 text-amber-600"
                                                : "bg-red-100 text-red-600"
                                        }`}
                                    >
                                        {pedido.estado}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* LADO DERECHO: AQUÍ SE CAMBIÓ LA ACTIVIDAD POR EL GRÁFICO */}
                <div className="bg-slate-900 p-6 rounded-[3rem] text-white shadow-2xl border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Estado de Pedidos</h2>
                        <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-3 py-1.5 rounded-full uppercase tracking-widest">
                            Tendencia
                        </span>
                    </div>

                    <div className="h-[260px] w-full -mb-2 overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={dataVentas}
                                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                                height={300}
                            >
                                <defs>
                                    <linearGradient id="colorMontoDark" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />

                                <XAxis
                                    dataKey="estado"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                                    height={40}
                                />

                                <YAxis hide={true} />

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: 'none',
                                        borderRadius: '12px'
                                    }}
                                    itemStyle={{ color: '#818cf8' }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="cantidad"
                                    stroke="#818cf8"
                                    strokeWidth={3}
                                    fill="url(#colorMontoDark)"
                                    dot={{ fill: "#818cf8", strokeWidth: 2, r: 3 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 italic text-center">
                        Distribución actual de pedidos por estado. Mantente al tanto de tu producción.
                    </p>
                </div>

            </div>
        </Layout>
    );
}

export default Dashboard;