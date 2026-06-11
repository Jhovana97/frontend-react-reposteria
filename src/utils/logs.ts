
export const saveLog = async (
    email: string,
    estado: "EXITOSO" | "FALLIDO",
    evento: "INGRESO" | "SALIDA"
) => {
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    // 🌐 obtener IP (simple API pública)
    let ip = "";
    try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        ip = data.ip;
    } catch {
        ip = "NO_IP";
    }

    const newLog = {
        usuario: email,
        estado,
        evento, // 👈 INGRESO o SALIDA
        fecha: new Date().toLocaleString(),
        ip, // 👈 opcional pero recomendado
        browser: navigator.userAgent, // 👈 navegador
    };

    logs.push(newLog);

    localStorage.setItem("logs", JSON.stringify(logs));

    console.log("🔥 LOG COMPLETO:", newLog);
};