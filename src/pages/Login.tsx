import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth.api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await loginRequest({ email, password });

            localStorage.setItem("token", res.data.access_token);

            navigate("/dashboard"); // 🔥 redirección
        } catch (error) {
            console.error("Error login", error);
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-4">
            <h1 className="text-2xl font-bold">Login</h1>

            <input
                className="border p-2"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="border p-2"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                onClick={handleLogin}
                className="bg-pink-500 text-white px-4 py-2 rounded"
            >
                Iniciar sesión
            </button>
        </div>
    );
}

export default Login;