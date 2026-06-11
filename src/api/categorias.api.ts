import API from "./axios";

export const getCategorias = () =>
    API.get("/categorias");

const res = await getCategorias();

console.log(res.data);