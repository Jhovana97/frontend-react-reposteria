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
            navigate("/dashboard");
        } catch (error) {
            console.error("Error login", error);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-100 via-slate-50 to-indigo-100">
            
            {/* Tarjeta de Login */}
            <div className="w-full max-w-md p-8 mx-4 bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center">
                
                {/* Logo o Icono Decorativo */}
                <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-3xl flex items-center justify-center text-4xl shadow-lg shadow-pink-200 mb-6 animate-bounce-slow">
                    .
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                        ¡Hola de nuevo!
                    </h1>
                    <p className="text-slate-500 font-medium">Ingresa a tu panel de repostería</p>
                </div>

                <div className="w-full space-y-4">
                    {/* Input Email */}
                    <div className="group">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4 mb-1 block">
                            Correo Electrónico
                        </label>
                        <input
                            className="w-full bg-slate-50 border-2 border-transparent group-hover:border-pink-100 focus:border-pink-400 focus:bg-white p-4 rounded-2xl outline-none transition-all duration-300 font-medium text-slate-700"
                            placeholder="chef@pasteleria.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Input Password */}
                    <div className="group">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4 mb-1 block">
                            Contraseña
                        </label>
                        <input
                            className="w-full bg-slate-50 border-2 border-transparent group-hover:border-pink-100 focus:border-pink-400 focus:bg-white p-4 rounded-2xl outline-none transition-all duration-300 font-medium text-slate-700"
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Botón de Acción */}
                    <button
                        onClick={handleLogin}
                        className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-pink-200 hover:shadow-pink-300 hover:-translate-y-1 active:scale-95 transition-all duration-300 uppercase tracking-widest"
                    >
                        Iniciar Sesión
                    </button>
                </div>

                {/* Footer Decorativo */}
                <p className="mt-8 text-sm text-slate-400 font-medium">
                    ¿Olvidaste tu contraseña? <span className="text-pink-500 cursor-pointer hover:underline">Recuperar</span>
                </p>
            </div>

            {/* Elementos decorativos de fondo (opcional) */}
            <div className="absolute top-20 right-[20%] w-32 h-32 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-[20%] w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
    );
}

export default Login;