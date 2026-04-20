import React from 'react';
import Layout from "../components/Layout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
    { title: "Ventas Totales", value: "Bs. 12,340", color: "from-emerald-400 to-teal-500", shadow: "shadow-emerald-200", icon: "💰", percentage: "+12.5%" },
    { title: "Pedidos Hoy", value: "320", color: "from-orange-400 to-amber-500", shadow: "shadow-orange-200", icon: "🥐", percentage: "+5 hoy" },
    { title: "Nuevos Clientes", value: "89", color: "from-pink-400 to-rose-500", shadow: "shadow-pink-200", icon: "✨", percentage: "Nuevo récord" },
];

const dataVentas = [
    { dia: 'Lun', monto: 1200 },
    { dia: 'Mar', monto: 2100 },
    { dia: 'Mie', monto: 1800 },
    { dia: 'Jue', monto: 2400 },
    { dia: 'Vie', monto: 3200 },
    { dia: 'Sab', monto: 4500 },
    { dia: 'Dom', monto: 3900 },
];

function Dashboard() {
    return (
        <Layout>
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                        ¡Buen día, Chef! 👨‍🍳
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
                        <div className="h-14 w-14 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100">
                            <span className="text-2xl">📊</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-4">
                            Resumen de <span className="text-indigo-600">rendimiento</span>
                        </h2>
                        <p className="text-slate-500 leading-relaxed mb-8 max-w-md text-lg">
                            Tu negocio ha crecido un <span className="text-emerald-500 font-bold uppercase underline decoration-2 underline-offset-4">12%</span> esta semana.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95">
                                Descargar Reporte PDF
                            </button>
                            <button className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                                Ver analíticas
                            </button>
                        </div>
                    </div>
                </div>

                {/* LADO DERECHO: AQUÍ SE CAMBIÓ LA ACTIVIDAD POR EL GRÁFICO */}
                <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Ventas Semanales</h2>
                        <span className="text-[10px] font-black text-indigo-400 bg-indigo-400/10 px-3 py-1.5 rounded-full uppercase tracking-widest">
                            Tendencia
                        </span>
                    </div>
                    
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dataVentas}>
                                <defs>
                                    <linearGradient id="colorMontoDark" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                {/* Ocultamos líneas para que se vea minimalista sobre el fondo oscuro */}
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                                <XAxis 
                                    dataKey="dia" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#94a3b8', fontSize: 10}} 
                                />
                                <YAxis hide={true} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                                    itemStyle={{ color: '#818cf8' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="monto" 
                                    stroke="#818cf8" 
                                    strokeWidth={3}
                                    fill="url(#colorMontoDark)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-slate-400 mt-4 italic text-center">
                        Desempeño basado en ingresos diarios
                    </p>
                </div>

            </div>
        </Layout>
    );
}

export default Dashboard;