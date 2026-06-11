import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {getClientes,createCliente,updateCliente,deleteCliente,  } from "../api/clientes.api";
import { useForm } from "react-hook-form";

type ClienteForm = {
    nombre: string;
    telefono: string;
    direccion: string;
};

function Clientes() {
    const [clientes, setClientes] = useState<any[]>([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState<any | null>(null);

    const [mostrarPedidos, setMostrarPedidos] = useState(false);
    const [mostrarCrear, setMostrarCrear] = useState(false);

    const [mostrarEditar, setMostrarEditar] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ClienteForm>();

    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        reset: resetEdit,
    } = useForm<ClienteForm>();

    const cargarClientes = async () => {
        try {
            const res = await getClientes();
            setClientes(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    const onSubmit = async (data: ClienteForm) => {
        try {
            await createCliente(data);

            await cargarClientes();

            reset();

            setMostrarCrear(false);
        } catch (error) {
            console.error(error);
        }
    };

    const onEdit = async (data: ClienteForm) => {
    try {
        await updateCliente(
            clienteSeleccionado.id,
            data
        );

        await cargarClientes();

        setMostrarEditar(false);

    } catch (error) {
        console.error(error);
    }
};

    return (
        <Layout>
            {/* ENCABEZADO */}
            <div className="mb-8 border-b border-pink-100 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="text-pink-500 font-semibold tracking-widest uppercase text-sm">
                        Nuestra Comunidad
                    </span>

                    <h1 className="text-4xl font-extrabold text-pink-900 mt-1">
                        Clientes de la Pastelería 
                    </h1>

                    <p className="text-rose-400 mt-2">
                        Registro de clientes que realizan pedidos.
                    </p>
                </div>

                <button
                    onClick={() => setMostrarCrear(true)}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg shadow-pink-200 transition-all transform hover:scale-105"
                >
                    Registrar Cliente
                </button>
            </div>

            {/* TOTAL CLIENTES */}
            <div className="mb-6">
                <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm inline-block">
                    <p className="text-sm text-gray-500">
                        Total de Clientes
                    </p>

                    <p className="text-3xl font-extrabold text-pink-600">
                        {clientes.length}
                    </p>
                </div>
            </div>

            {/* TARJETAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clientes.map((c) => (
                    <div
                        key={c.id}
                        className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50 hover:shadow-xl transition-shadow relative overflow-hidden group"
                    >
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50"></div>

                        <div className="relative">
                            <span className="text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-4 inline-block shadow-sm bg-pink-100 text-pink-700 border border-pink-200">
                                Cliente
                            </span>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-300 flex items-center justify-center text-white text-xl font-bold shadow-inner">
                                    {c.nombre?.charAt(0)}
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">
                                        {c.nombre}
                                    </h2>

                                    <p className="text-sm text-gray-400">
                                        Cliente #{c.id}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 border-t border-dashed border-pink-100 pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 italic">
                                        Teléfono:
                                    </span>

                                    <span className="font-semibold text-rose-600">
                                        {c.telefono}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 italic">
                                        Dirección:
                                    </span>

                                    <span className="font-semibold text-slate-600 text-right">
                                        {c.direccion}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 italic">
                                        Pedidos:
                                    </span>

                                    <span className="font-bold text-pink-600">
                                        {c.pedidos?.length || 0}
                                    </span>
                                </div>
                            </div>
{/* boton para tres botones */}
                            <div className="mt-5 flex gap-2">
                                <button
                                    onClick={() => {
                                        setClienteSeleccionado(c);
                                        setMostrarPedidos(true);
                                    }}
                                    className="flex-1 text-xs font-bold py-2 px-4 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-colors"
                                >
                                    Ver Pedidos
                                </button>

                                <button
                                    onClick={() => {
                                        setClienteSeleccionado(c);

                                        resetEdit({
                                            nombre: c.nombre,
                                            telefono: c.telefono,
                                            direccion: c.direccion,
                                        });

                                        setMostrarEditar(true);
                                    }}
                                    className="px-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white"
                                >
                                    editar
                                </button>

                                <button
                                    onClick={async () => {
                                        const ok = confirm(
                                            `¿Eliminar a ${c.nombre}?`
                                        );

                                        if (!ok) return;

                                        try {
                                            await deleteCliente(c.id);

                                            cargarClientes();
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }}
                                    className="px-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white"
                                >
                                    eliminar
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL CREAR CLIENTE */}
            {mostrarCrear && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-xl">
                        <h2 className="text-2xl font-bold text-pink-700 mb-4">
                            Nuevo Cliente
                        </h2>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <input
                                placeholder="Nombre"
                                className="w-full border p-3 rounded-xl"
                                {...register("nombre", {
                                    required: "Nombre requerido",
                                })}
                            />

                            {errors.nombre && (
                                <p className="text-red-500 text-sm">
                                    {errors.nombre.message}
                                </p>
                            )}

                            <input
                                placeholder="Teléfono"
                                className="w-full border p-3 rounded-xl"
                                {...register("telefono", {
                                    required: "Teléfono requerido",
                                })}
                            />

                            {errors.telefono && (
                                <p className="text-red-500 text-sm">
                                    {errors.telefono.message}
                                </p>
                            )}

                            <input
                                placeholder="Dirección"
                                className="w-full border p-3 rounded-xl"
                                {...register("direccion", {
                                    required: "Dirección requerida",
                                })}
                            />

                            {errors.direccion && (
                                <p className="text-red-500 text-sm">
                                    {errors.direccion.message}
                                </p>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-pink-500 text-white py-3 rounded-xl"
                                >
                                    Guardar
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setMostrarCrear(false)}
                                    className="flex-1 bg-gray-200 py-3 rounded-xl"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Modadl editar cliente */}
            {mostrarEditar && clienteSeleccionado && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

                    <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-xl">

                        <h2 className="text-2xl font-bold text-blue-700 mb-4">
                            Editar Cliente
                        </h2>

                        <form
                            onSubmit={handleSubmitEdit(onEdit)}
                            className="space-y-4"
                        >

                            <input
                                className="w-full border p-3 rounded-xl"
                                {...registerEdit("nombre")}
                            />

                            <input
                                className="w-full border p-3 rounded-xl"
                                {...registerEdit("telefono")}
                            />

                            <input
                                className="w-full border p-3 rounded-xl"
                                {...registerEdit("direccion")}
                            />

                            <div className="flex gap-3">

                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 text-white py-3 rounded-xl"
                                >
                                    Guardar
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setMostrarEditar(false)
                                    }
                                    className="flex-1 bg-gray-200 py-3 rounded-xl"
                                >
                                    Cancelar
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}


            {/* MODAL PEDIDOS */}
            {mostrarPedidos && clienteSeleccionado && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-3xl p-6 w-[90%] max-w-lg shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-pink-700">
                                Pedidos de {clienteSeleccionado.nombre}
                            </h2>

                            <button
                                onClick={() => setMostrarPedidos(false)}
                                className="text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {clienteSeleccionado.pedidos?.length > 0 ? (
    <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {clienteSeleccionado.pedidos.map((pedido: any) => (
            <div
                key={pedido.id}
                className="bg-pink-50 p-4 rounded-xl border border-pink-100"
            >
                <div className="flex justify-between mb-3">
                    <h3 className="font-bold text-pink-700">
                        Pedido #{pedido.id}
                    </h3>

                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold">
                        {pedido.estado}
                    </span>
                </div>

                <p>
                    <strong>Fecha:</strong>{" "}
                    {new Date(pedido.fecha).toLocaleDateString()}
                </p>

                <p>
                    <strong>Entrega:</strong>{" "}
                    {new Date(
                        pedido.fecha_entrega
                    ).toLocaleDateString()}
                </p>

                <p>
                    <strong>Total:</strong> Bs. {pedido.total}
                </p>

                <p>
                    <strong>Pagos registrados:</strong>{" "}
                    {pedido.pagos.length}
                </p>

                <div className="mt-3 border-t pt-3">
                    <p className="font-semibold mb-2">
                        Productos:
                    </p>

                    {pedido.detalles.map((detalle: any) => (
                        <div
                            key={detalle.id}
                            className="bg-white rounded-lg p-2 mb-2"
                        >
                            <p>
                                {detalle.producto.nombre}
                            </p>

                            <p className="text-sm text-gray-500">
                                Cantidad: {detalle.cantidad}
                            </p>

                            <p className="text-sm text-gray-500">
                                Precio: Bs. {detalle.precio}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
) : (
                            <p className="text-gray-500">
                                Este cliente no tiene pedidos registrados.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default Clientes;