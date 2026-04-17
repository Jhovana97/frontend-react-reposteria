import API from "./axios";

// obtener todos
export const getProductos = () => API.get("/productos");

// obtener uno
export const getProducto = (id: number) => API.get(`/productos/${id}`);

// crear
export const createProducto = (data: any) =>
    API.post("/productos", data);

// actualizar
export const updateProducto = (id: number, data: any) =>
    API.patch(`/productos/${id}`, data);

// eliminar
export const deleteProducto = (id: number) =>
    API.delete(`/productos/${id}`);