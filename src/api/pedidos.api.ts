import API from "./axios";

// obtener todos
export const getPedidos = () => API.get("/pedidos");

// obtener uno
export const getPedido = (id: number) => API.get(`/pedidos/${id}`);

// crear
export const createPedido = (data: any) =>
    API.post("/pedidos", data);

// actualizar
export const updatePedido = (id: number, data: any) =>
    API.patch(`/pedidos/${id}`, data);

// eliminar
export const deletePedido = (id: number) =>
    API.delete(`/pedidos/${id}`);