import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { getClientes } from "../api/clientes.api";
import { getProductos } from "../api/productos.api";
//sirve para contar el total de productos en el pedido, para mostrarlo en el boton de nuevo pedido y en el encabezado del dashboard
import { useMemo } from "react";


type PedidoForm = {
    clienteId: number;
    fecha: string;
    fecha_entrega: string;
};

function Pedidos() {
    const { register, handleSubmit } = useForm<PedidoForm>();

    const [pedidos, setPedidos] = useState<any[]>([]);
    const [mostrarCrear, setMostrarCrear] = useState(false);

    const [clientes, setClientes] = useState<any[]>([]);
    const [productos, setProductos] = useState<any[]>([]);

    const [detalles, setDetalles] = useState<any[]>([]);
    const [productoId, setProductoId] = useState("");
    const [cantidad, setCantidad] = useState(1);

    


    useEffect(() => {
    async function cargarDatos() {
        try {
            const pedidosRes = await fetch(
                "http://localhost:3000/pedidos"
            );

            const pedidosData =
                await pedidosRes.json();

            console.log(JSON.stringify(pedidosData, null, 2));

            setPedidos(pedidosData);

            const clientesRes =
                await getClientes();

            setClientes(clientesRes.data);

            const productosRes =
                await getProductos();

            setProductos(productosRes.data);

        } catch (error) {
            console.error(error);
        }
    }

    cargarDatos();
}, []);
// console.log(clientes);
// console.log(productos);

//funciion o variable para calcular el total del pedido, se actualiza cada vez que se agrega un producto al pedido
const total = useMemo(() => {
    return detalles.reduce((acc, item) => {
        return acc + item.precio * item.cantidad;
    }, 0);
}, [detalles]);

const agregarProducto = () => {

    const producto = productos.find(
        (p: any) => p.id === Number(productoId)
    );

    if (!producto) return;

    setDetalles([
        ...detalles,
        {
            productoId: producto.id,
            nombre: producto.nombre,
            cantidad,
            precio: Number(producto.precio),
        },
    ]);

    setProductoId("");
    setCantidad(1);
};
//funcion para elminar producot del total 

const eliminarProducto = (index: number) => {
    setDetalles(
        detalles.filter((_, i) => i !== index)
    );
};

const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
        case "pendiente":
            return "bg-orange-100 text-orange-600 border-orange-200";

        case "entregado":
            return "bg-green-100 text-green-600 border-green-200";

        case "cancelado":
            return "bg-red-100 text-red-600 border-red-200";

        default:
            return "bg-blue-100 text-blue-600 border-blue-200";
    }
};

const onSubmit = async (data: any) => {

    if (!data.clienteId) {
        alert("Seleccione un cliente");
        return;
    }

    if (detalles.length === 0) {
        alert("Agregue al menos un producto");
        return;
    }

    if (
        new Date(data.fecha_entrega) <
        new Date(data.fecha)
    ) {
        alert(
            "La fecha de entrega no puede ser menor a la fecha del pedido"
        );
        return;
    }

    try {

        const payload = {
            clienteId: Number(data.clienteId),
            fecha: data.fecha,
            fecha_entrega: data.fecha_entrega,
            detalles: detalles,
            total: total
        };

        const res = await fetch("http://localhost:3000/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok)
            throw new Error("Error al guardar pedido");

        const newPedido = await res.json();

        // actualizar lista
        setPedidos([...pedidos, newPedido]);

        // limpiar modal
        setDetalles([]);

        setMostrarCrear(false);

    } catch (error) {
        console.error(error);
    }
};

//funcion para marcar o cambiar el estado del pedido 
const marcarComoListo = async (id: number) => {
    try {

        const res = await fetch(
            `http://localhost:3000/pedidos/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    estado: "entregado"
                })
            }
        );

        if (!res.ok) {
            throw new Error("Error al actualizar");
        }

        setPedidos(
            pedidos.map((pedido) =>
                pedido.id === id
                    ? { ...pedido, estado: "entregado" }
                    : pedido
            )
        );

    } catch (error) {
        console.error(error);
    }
};

    return (
        <Layout>
            <div className="max-w-5xl mx-auto">

                {/* Encabezado */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                            Comandas de Hoy
                        </h1>

                        <p className="text-slate-500 font-medium italic">
                            "El secreto está en el tiempo de horneado"
                        </p>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex gap-4">

                        <button
                            onClick={() => setMostrarCrear(true)}
                            className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold"
                        >
                            Nuevo Pedido
                        </button>

                        <div className="text-center">
                            <p className="text-xs text-slate-400">
                                Pedidos
                            </p>

                            <p className="font-bold text-indigo-500">
                                {pedidos.length}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Grid de Pedidos */}
                <div className="grid gap-8">

                    {pedidos.map((p) => (

                        <div
                            key={p.id}
                            className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-100/50 border border-slate-50 overflow-hidden flex flex-col md:flex-row"
                        >

                            {/* Cliente */}
                            <div className="md:w-1/3 bg-slate-50/50 p-8 border-r border-dashed border-slate-200">

                                <div className="flex justify-between items-start mb-4">

                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        ID: ORD-{String(p.id).padStart(3, "0")}
                                    </span>

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(
                                            p.estado
                                        )}`}
                                    >
                                        ● {p.estado}
                                    </span>

                                </div>

                                <h2 className="text-2xl font-bold text-slate-800 mb-1">
                                    {p.cliente?.nombre}
                                </h2>

                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">

                                    <span className="bg-white px-2 py-1 rounded-md shadow-sm">
                                        {new Date(
                                            p.fecha
                                        ).toLocaleDateString()}
                                    </span>

                                    <span className="bg-white px-2 py-1 rounded-md shadow-sm">
                                        ⏰{" "}
                                        {new Date(
                                            p.fecha
                                        ).toLocaleTimeString()}
                                    </span>

                                    <div className="mt-3">
                                        <p className="text-xs text-slate-400 uppercase font-bold">
                                            Entrega
                                        </p>

                                        <p className="font-semibold text-slate-700">
                                            {new Date(p.fecha_entrega).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                                        Total a cobrar
                                    </p>

                                    <p className="text-3xl font-black text-indigo-600">
                                        Bs. {Number(p.total).toFixed(2)}
                                    </p>
                                </div>

                            </div>

                            {/* Productos */}
                            <div className="md:w-2/3 p-8">

                                <h3 className="text-xs font-black uppercase text-slate-400 mb-4 tracking-tighter">
                                    Detalle de Productos
                                </h3>

                                <div className="space-y-4">

                                    {p.detalles?.map(
                                        (item: any, i: number) => (

                                            <div
                                                key={i}
                                                className="flex items-center gap-4 group"
                                            >

                                                <div className="relative">

                                                    <img
                                                        src="https://coconut.com.bo/wp-content/uploads/2024/01/torta-clasica-de-tres-leches1.jpg"
                                                        className="w-16 h-16 object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform"
                                                    />

                                                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                                        {item.cantidad}
                                                    </span>

                                                </div>

                                                <div className="flex-1">

                                                    <h4 className="font-bold text-slate-700">
                                                        {item.producto?.nombre}
                                                    </h4>

                                                    <p className="text-sm text-slate-400">
                                                        Precio unitario: Bs.{" "}
                                                        {item.precio}
                                                    </p>

                                                </div>

                                                <div className="text-right">

                                                    <p className="font-black text-slate-600">
                                                        Bs.{" "}
                                                        {(
                                                            Number(
                                                                item.precio
                                                            ) *
                                                            item.cantidad
                                                        ).toFixed(2)}
                                                    </p>

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>

                                {/* Botones */}
                                <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                                    {/* se agrego fucnionalidad al boton */}
                                    <button onClick={() => marcarComoListo(p.id)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-2xl shadow-lg shadow-green-100 transition-all">
                                        Marcar como Listo
                                    </button>

                                    <button
                                        className="px-6 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-2xl transition-all"
                                        onClick={() =>
                                            window.open(
                                                `http://localhost:3000/pedidos/${p.id}/pdf`
                                            )
                                        }
                                    >
                                        PDF
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {mostrarCrear && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-[600px] rounded-3xl p-6 shadow-xl space-y-4"
        >

            <h2 className="text-2xl font-bold mb-4">
                Nuevo Pedido
            </h2>

            {/* CLIENTE */}
            <select
                className="w-full border p-2 rounded mb-3"
                {...register("clienteId")}
            >
                <option value="">Seleccionar cliente</option>
                {clientes.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.nombre}
                    </option>
                ))}
            </select>

            {/* FECHA */}
            <input
                type="datetime-local"
                className="w-full border p-2 rounded mb-3"
                {...register("fecha")}
            />

            {/* FECHA ENTREGA */}
            <input
                type="datetime-local"
                className="w-full border p-2 rounded mb-3"
                {...register("fecha_entrega")}
            />

            <hr />

            {/* PRODUCTOS */}
            <div className="flex gap-2 mb-3">

                <select
                    value={productoId}
                    onChange={(e) => setProductoId(e.target.value)}
                    className="flex-1 border p-2 rounded"
                >
                    <option value="">Producto</option>
                    {productos.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.nombre}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min={1}
                    value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    className="w-20 border p-2 rounded"
                />

                <button
                    type="button"
                    onClick={agregarProducto}
                    className="bg-indigo-600 text-white px-3 rounded"
                >
                    +
                </button>

            </div>

            {/* DETALLES */}
            <div className="max-h-40 overflow-auto border rounded p-2">

                {detalles.map((d, i) => (
                    <div key={i} className="flex justify-between items-center border-b py-2">
                        <span>
                            {d.nombre} x {d.cantidad}
                        </span>
                        <div className="flex items-center gap-3">
                            <span>
                                Bs {(d.precio * d.cantidad).toFixed(2)}
                            </span>
                            <button type="button"
                                onClick={() => eliminarProducto(i)}
                                className="bg-red-500 text-white px-2 py-1 rounded">
                                ✕
                            </button>
                        </div>
                    </div>
                ))}

            </div>

            {/* TOTAL */}
            <div className="p-3 bg-slate-100 rounded-xl">
                <p className="text-sm text-slate-500">
                    Total del pedido
                </p>

                <p className="text-2xl font-bold text-indigo-600">
                    Bs {total.toFixed(2)}
                </p>
            </div>

            {/* BOTONES */}
            <div className="flex justify-end gap-2">

                <button
                    type="button"
                    onClick={() => {
                        setMostrarCrear(false);
                        setDetalles([]);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Guardar Pedido
                </button>

            </div>

        </form>

    </div>
)}
        </Layout>
    );
}

export default Pedidos;