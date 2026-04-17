import Layout from "../components/Layout";

// Datos mejorados con gradientes y sombras personalizadas
const stats = [
    { 
        title: "Ventas Totales", 
        value: "Bs. 12,340", 
        color: "from-emerald-400 to-teal-500", 
        shadow: "shadow-emerald-200",
        icon: "💰", 
        percentage: "+12.5%" 
    },
    { 
        title: "Pedidos Hoy", 
        value: "320", 
        color: "from-orange-400 to-amber-500", 
        shadow: "shadow-orange-200",
        icon: "🥐", 
        percentage: "+5 hoy" 
    },
    { 
        title: "Nuevos Clientes", 
        value: "89", 
        color: "from-pink-400 to-rose-500", 
        shadow: "shadow-pink-200",
        icon: "✨", 
        percentage: "Nuevo récord" 
    },
];

const actividades = [
    { id: 1, desc: "Pedido #1234 realizado", hora: "Hace 5 min", tipo: "pedido", emoji: "" },
    { id: 2, desc: "Nuevo cliente registrado", hora: "Hace 12 min", tipo: "cliente", emoji: "👤" },
    { id: 3, desc: "Venta completada", hora: "Hace 1 hora", tipo: "venta", emoji: "" },
];

function Dashboard() {
    return (
        <Layout>
            {/* Header con un toque más dinámico */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 tracking-tight">
                        ¡Buen día, Chef! 
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Tu pastelería está brillando hoy. Aquí los detalles:
                    </p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-white border border-slate-200 px-4 py-2 rounded-2xl text-sm font-bold text-slate-600 shadow-sm">
                        📅 {new Date().toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Cards de Estadísticas con Gradientes Vivos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-gradient-to-br ${stat.color} p-7 rounded-[2.5rem] shadow-2xl ${stat.shadow} transition-all hover:-translate-y-2 duration-300 relative overflow-hidden group`}
                    >
                        <div className="relative z-10 text-white">
                            <div className="flex justify-between items-center mb-4">
                                <span className="bg-white/20 backdrop-blur-md p-3 rounded-2xl text-2xl">
                                    {stat.icon}
                                </span>
                                <span className="text-xs font-black bg-black/10 px-2 py-1 rounded-lg uppercase tracking-tighter">
                                    {stat.percentage}
                                </span>
                            </div>
                            <h2 className="text-sm font-bold uppercase tracking-[0.1em] opacity-90">{stat.title}</h2>
                            <p className="text-4xl font-black mt-1 drop-shadow-sm">{stat.value}</p>
                        </div>
                        
                        {/* Círculos decorativos de fondo */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-black/5 rounded-full blur-2xl"></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sección de Resumen - Ocupa 2 columnas en LG */}
                <div className="lg:col-span-2 bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[3rem] border border-slate-50 relative overflow-hidden group">
                    {/* Efecto de luz ambiental en la esquina */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] -mr-32 -mt-32 opacity-60"></div>
                    
                    <div className="relative z-10">
                        <div className="h-14 w-14 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100">
                            <span className="text-2xl">datos</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-4">
                            Resumen de <span className="text-indigo-600">rendimiento</span>
                        </h2>
                        {/* <p className="text-slate-500 leading-relaxed mb-8 max-w-md text-lg">
                            Tu negocio ha crecido un <span className="text-emerald-500 font-bold underline decoration-2 underline-offset-4">12%</span> esta semana. 
                            La <span className="text-slate-800 font-bold text-lg italic">Torta de Tres Leches</span> sigue siendo la favorita de tus clientes.
                        </p> */}
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

                {/* Actividad Reciente - Más colorida y estilizada */}
                <div className="bg-slate-900 p-8 shadow-2xl rounded-[3rem] text-white">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold">Actividad</h2>
                        <span className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full uppercase tracking-widest">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                            En vivo
                        </span>
                    </div>
                    <div className="space-y-6">
                        {actividades.map((act) => (
                            <div key={act.id} className="flex items-start gap-4 group cursor-pointer">
                                <div className="h-12 w-12 shrink-0 bg-white/10 rounded-2xl flex items-center justify-center text-xl group-hover:bg-white/20 transition-colors border border-white/5">
                                    {act.emoji}
                                </div>
                                <div className="flex-1 border-b border-white/5 pb-4">
                                    <p className="text-sm font-bold group-hover:text-indigo-300 transition-colors">
                                        {act.desc}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1 font-medium italic">
                                        {act.hora}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-bold transition-all border border-white/5">
                        Ver todo el historial
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;