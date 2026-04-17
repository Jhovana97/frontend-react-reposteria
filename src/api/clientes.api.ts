import API from "./axios";

// obtener todos
export const getClientes = () => API.get("/clientes");

// obtener uno
export const getCliente = (id: number) => API.get(`/clientes/${id}`);

// crear
export const createCliente = (data: any) =>
    API.post("/clientes", data);

// actualizar
export const updateCliente = (id: number, data: any) =>
    API.patch(`/clientes/${id}`, data);

// eliminar
export const deleteCliente = (id: number) =>
    API.delete(`/clientes/${id}`);