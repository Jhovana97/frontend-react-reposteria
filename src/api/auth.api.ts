import API from "./axios";

export const loginRequest = (data: {
    email: string;
    password: string;
}) => API.post("/auth/login", data);
export default API;