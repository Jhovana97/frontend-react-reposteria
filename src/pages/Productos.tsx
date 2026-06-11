import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getCategorias } from "../api/categorias.api";
import { getProductos, createProducto, updateProducto, deleteProducto, } from "../api/productos.api";
import { useForm } from "react-hook-form";

type ProductoForm = {
    nombre: string;
    descripcion: string;
    precio: string;
    estado: string;
    tipo: string;
    categoriaId: number;
};

function Productos() {
    const [productos, setProductos] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);
    const [mostrarCrear, setMostrarCrear] = useState(false);

    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] =
        useState<any>(null);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<ProductoForm>();

    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        reset: resetEdit,
    } = useForm<ProductoForm>();

    useEffect(() => {
        async function cargarDatos() {
            try {
                const categoriasRes =
                    await getCategorias();

                setCategorias(
                    categoriasRes.data
                );

                const productosRes =
                    await getProductos();

                setProductos(
                    productosRes.data
                );
            } catch (error) {
                console.error(error);
            }
        }

        cargarDatos();
    }, []);

    const onSubmit = async (
        data: ProductoForm
    ) => {
        try {
            await createProducto({
                ...data,
                categoriaId: Number(
                    data.categoriaId
                ),
            });

            const productosRes =
                await getProductos();

            setProductos(
                productosRes.data
            );

            reset();

            setMostrarCrear(false);
        } catch (error) {
            console.error(error);
        }
    };

    const onEdit = async (
        data: ProductoForm
    ) => {
        try {
            await updateProducto(
                productoSeleccionado.id,
                {
                    ...data,
                    categoriaId: Number(
                        data.categoriaId
                    ),
                }
            );

            const productosRes =
                await getProductos();

            setProductos(
                productosRes.data
            );

            setMostrarEditar(false);

            resetEdit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-amber-900">Menú de Creaciones </h1>
                    <p className="text-amber-700/60 font-medium">Nuestros productos horneados con amor.</p>
                </div>
                <div className="hidden md:block">
                    <button
                        onClick={() => setMostrarCrear(true)}
                        className="bg-amber-800 text-white px-6 py-2 rounded-full hover:bg-amber-900 transition-all font-bold"
                    >
                        Añadir Nuevo Producto
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {productos.map((p: any) => (
                    <div key={p.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-amber-100/50 border border-amber-50 hover:-translate-y-2 transition-all duration-300">

                        {/* Contenedor de Imagen */}
                        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">

                            <span className="text-6xl">
                                {p.tipo === "torta" && "🎂"}
                                {p.tipo === "pan" && "🥖"}
                                {p.tipo === "postre" && "🍰"}
                                {!p.tipo && "🧁"}
                            </span>

                            {/* categoría */}
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-amber-800 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-sm">
                                {p.categoria?.nombre}
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
                                        Bs. {Number(p.precio).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex gap-2">

                                    <button
                                        onClick={() => {
                                            setProductoSeleccionado(p);

                                            resetEdit({
                                                nombre: p.nombre,
                                                descripcion: p.descripcion,
                                                precio: p.precio,
                                                estado: p.estado,
                                                tipo: p.tipo,
                                                categoriaId: p.categoria?.id,
                                            });

                                            setMostrarEditar(true);
                                        }}
                                        className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white"
                                    >
                                        editar
                                    </button>

                                    <button
                                        onClick={async () => {
                                            const ok = confirm(
                                                `¿Eliminar ${p.nombre}?`
                                            );

                                            if (!ok) return;

                                            await deleteProducto(p.id);

                                            const productosRes =
                                                await getProductos();

                                            setProductos(productosRes.data);
                                        }}
                                        className="h-10 w-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white"
                                    >
                                        🗑️
                                    </button>

                                </div>
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

            {mostrarCrear && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-xl">

                        <h2 className="text-2xl font-bold text-amber-700 mb-4">
                            Nuevo Producto
                        </h2>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <input
                                placeholder="Nombre"
                                className="w-full border p-3 rounded-xl"
                                {...register("nombre")}
                            />

                            <textarea
                                placeholder="Descripción"
                                className="w-full border p-3 rounded-xl"
                                {...register("descripcion")}
                            />

                            <input
                                type="number"
                                step="0.01"
                                placeholder="Precio"
                                className="w-full border p-3 rounded-xl"
                                {...register("precio")}
                            />

                            <select
                                className="w-full border p-3 rounded-xl"
                                {...register("categoriaId")}
                            >
                                <option value="">
                                    Seleccione categoría
                                </option>

                                {categorias.map((cat: any) => (
                                    <option
                                        key={cat.id}
                                        value={cat.id}
                                    >
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>

                            <input
                                placeholder="Estado"
                                defaultValue="activo"
                                className="w-full border p-3 rounded-xl"
                                {...register("estado")}
                            />

                            <input
                                placeholder="Tipo"
                                className="w-full border p-3 rounded-xl"
                                {...register("tipo")}
                            />

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-amber-600 text-white py-3 rounded-xl"
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

            {mostrarEditar && productoSeleccionado && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-xl">

                        <h2 className="text-2xl font-bold text-blue-700 mb-4">
                            Editar Producto
                        </h2>

                        <form
                            onSubmit={handleSubmitEdit(onEdit)}
                            className="space-y-4"
                        >
                            <input
                                className="w-full border p-3 rounded-xl"
                                {...registerEdit("nombre")}
                            />

                            <textarea
                                className="w-full border p-3 rounded-xl"
                                {...registerEdit("descripcion")}
                            />

                            <input
                                className="w-full border p-3 rounded-xl"
                                {...registerEdit("precio")}
                            />

                            <select
                                className="w-full border p-3 rounded-xl"
                                {...registerEdit("categoriaId")}
                            >
                                {categorias.map((cat: any) => (
                                    <option
                                        key={cat.id}
                                        value={cat.id}
                                    >
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>

                            <input
                                className="w-full border p-3 rounded-xl"
                                {...registerEdit("estado")}
                            />

                            <input
                                className="w-full border p-3 rounded-xl"
                                {...registerEdit("tipo")}
                            />

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
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

        </Layout>
    );
}

export default Productos;