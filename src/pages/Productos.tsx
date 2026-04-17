import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function Productos() {
    const data = [
        {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvEMSAJVo8wkXD7YmTa61eCufWNqAMMuxdjg&s",
            "id": 1,
            "nombre": "Torta Clásica Tres Leches",
            "precio": 10.0,
            "categoria": "Más Vendido"
        },
        {
            "url": "https://coconut.com.bo/wp-content/uploads/2024/01/torta-clasica-de-tres-leches1.jpg",
            "id": 2, // Corregido ID para evitar errores de key
            "nombre": "Torta de Bodas Premium",
            "precio": 60.0,
            "categoria": "Especialidades"
        },
        {
            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6uLDqfdWzy7IrQJmJ7EbdGX2bGWeAN1j0MA&s",
            "id": 3,
            "nombre": "Torta de Bodas Real",
            "precio": 60.0,
            "categoria": "Especialidades"
        },
        {
            "url": "https://coconut.com.bo/wp-content/uploads/2024/01/torta-clasica-de-tres-leches1.jpg",
            "id": 4,
            "nombre": "Torta de Bodas Blanca",
            "precio": 60.0,
            "categoria": "Especialidades"
        },
        {
            "url": "https://coconut.com.bo/wp-content/uploads/2024/01/torta-clasica-de-tres-leches1.jpg",
            "id": 5,
            "nombre": "Torta nupcial Fantasía",
            "precio": 60.0,
            "categoria": "Especialidades"
        }
    ];

    return (
        <Layout>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-amber-900">Menú de Creaciones </h1>
                    <p className="text-amber-700/60 font-medium">Nuestros productos horneados con amor.</p>
                </div>
                <div className="hidden md:block">
                    <button className="bg-amber-800 text-white px-6 py-2 rounded-full hover:bg-amber-900 transition-all font-bold">
                        Añadir Nuevo Producto
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {data.map((p: any) => (
                    <div key={p.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-amber-100/50 border border-amber-50 hover:-translate-y-2 transition-all duration-300">
                        
                        {/* Contenedor de Imagen */}
                        <div className="relative h-56 overflow-hidden">
                            <img 
                                src={p.url} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                alt={p.nombre}
                            />
                            {/* Overlay de gradiente para legibilidad */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-amber-800 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-sm">
                                {p.categoria || 'Pastelería'}
                            </span>
                        </div>

                        {/* Contenido */}
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-slate-800 mb-2 capitalize leading-tight">
                                {p.nombre}
                            </h2>
                            
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Precio</span>
                                    <span className="text-2xl font-black text-amber-600">
                                        Bs. {p.precio.toFixed(2)}
                                    </span>
                                </div>
                                
                                <button className="h-10 w-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors">
                                    <span className="text-xl"></span>
                                </button>
                            </div>
                        </div>

                        {/* Pie de tarjeta con info extra */}
                        <div className="px-6 py-3 bg-amber-50/50 border-t border-amber-50 flex justify-center">
                            <span className="text-[10px] font-bold text-amber-800/40 tracking-widest uppercase italic">
                                Receta Artesanal
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Productos;