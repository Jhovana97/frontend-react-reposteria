import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth.api";
import { useForm } from "react-hook-form"
import { saveLog } from "../utils/logs";
import { useEffect, useState } from "react";


type FormData = {
    email: string;
    password: string;
};

const Login = () => {

    const [captchaCode, setCaptchaCode] = useState("");
    const [inputCaptcha, setInputCaptcha] = useState("");
    const [captchaError, setCaptchaError] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const code = Math.floor(1000 + Math.random() * 9000);
        setCaptchaCode(code.toString());
    };

    const onSubmit = async (data: FormData) => {
        console.log("Datos del formulario:", data);
        //validacio captcha
        if (inputCaptcha !== captchaCode) {
            console.log("Captcha incorrecto");
            setCaptchaError(true);
            return;
        }

        try {

            setCaptchaError(false);

            const response = await loginRequest(data);

            console.log("Respuesta del servidor:", response.data);

            // guardar token
            localStorage.setItem(
                "token",
                response.data.access_token
            );

            //  LOG EXITOSO
            await saveLog(data.email, "EXITOSO", "INGRESO");

            console.log("Login exitoso");

            // redirigir
            navigate("/dashboard");

        } catch (error) {
            console.error("Error al iniciar sesión:", error);

            //  LOG FALLIDO
            await saveLog(data.email, "FALLIDO", "INGRESO");
        }
    };
    return (
        <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-100 via-slate-50 to-indigo-100">

            <div className="w-full max-w-md p-8 mx-4 bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center">

                <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-3xl flex items-center justify-center text-4xl shadow-lg shadow-pink-200 mb-6 animate-bounce-slow">
                    .
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                        ¡Hola de nuevo!
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Ingresa a tu panel de repostería
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">

                    {/* Email */}
                    <div className="group">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4 mb-1 block">
                            Correo Electrónico
                        </label>
                        <input
                            className="w-full bg-slate-50 border-2 border-transparent group-hover:border-pink-100 focus:border-pink-400 focus:bg-white p-4 rounded-2xl outline-none transition-all duration-300 font-medium text-slate-700"
                            placeholder="chef@pasteleria.com"
                            {...register("email", {
                                required: "El email es obligatorio",
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1 ml-2">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="group">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4 mb-1 block">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="w-full bg-slate-50 border-2 border-transparent group-hover:border-pink-100 focus:border-pink-400 focus:bg-white p-4 rounded-2xl outline-none transition-all duration-300 font-medium text-slate-700"
                            placeholder="••••••••"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1 ml-2">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* CAPTCHA */}
                    <div className="group">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4 mb-1 block">
                            Captcha
                        </label>

                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-4 py-2 bg-slate-100 rounded-xl font-bold tracking-widest text-pink-500">
                                {captchaCode}
                            </span>

                            <button
                                type="button"
                                onClick={generateCaptcha}
                                className="text-xs text-pink-500 hover:underline"
                            >
                                Recargar
                            </button>
                        </div>

                        <input
                            className={`w-full bg-slate-50 border-2 p-4 rounded-2xl outline-none transition-all duration-300 font-medium text-slate-700
    ${captchaError ? "border-red-500 focus:border-red-500" : "border-transparent focus:border-pink-400"}`}
                            placeholder="Ingresa el captcha"
                            value={inputCaptcha}
                            onChange={(e) => {
                                setInputCaptcha(e.target.value);
                                setCaptchaError(false); // limpia error al escribir
                            }}
                        />
                        {captchaError && (
                            <p className="text-red-500 text-sm mt-1 ml-2 font-medium">
                                Captcha incorrecto
                            </p>
                        )}
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-pink-200 hover:shadow-pink-300 hover:-translate-y-1 active:scale-95 transition-all duration-300 uppercase tracking-widest"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <p className="mt-8 text-sm text-slate-400 font-medium">
                    ¿Olvidaste tu contraseña?{" "}
                    <span className="text-pink-500 cursor-pointer hover:underline">
                        Recuperar
                    </span>
                </p>
            </div>

            <div className="absolute top-20 right-[20%] w-32 h-32 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-[20%] w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
    );
};

export default Login;