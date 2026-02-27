import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Login({ onLogin }) {
    const navigate = useNavigate(); 
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const registeredUsers = JSON.parse(localStorage.getItem("users") || "[]");

        if (isRegister) {
            // LOGIKA DAFTAR
            if (password !== confirmPassword) {
                alert("Password tidak cocok!");
                return;
            }
            const userExists = registeredUsers.find(u => u.username === username);
            if (userExists) {
                alert("Username sudah terdaftar! Silakan pilih 'Masuk'.");
                return;
            }
            const newUser = { username, password, email };
            localStorage.setItem("users", JSON.stringify([...registeredUsers, newUser]));
            alert("Registrasi Berhasil! Silakan Masuk.");
            setIsRegister(false); // Pindah ke mode login otomatis
        } else {
            // LOGIKA MASUK
            // 1. Cek Admin Hardcoded
            if (username === "admin" && password === "KedaiKopi29") {
                onLogin();
                alert("Login Admin Berhasil! ☕");
                navigate("/admin"); // Pindah ke halaman admin
                return;
            }

            // 2. Cek User yang baru didaftarkan (seperti 'vio')
            const user = registeredUsers.find(u => u.username === username && u.password === password);
            if (user) {
                onLogin();
                alert(`Selamat datang kembali, ${username}! ✨`);
                navigate("/"); 
            } else {
                alert("Username atau Password salah!");
            }
        }
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "url('/images/coffe.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            backgroundBlendMode: "overlay",
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(20px)",
                padding: "40px",
                borderRadius: "32px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                width: "380px",
                textAlign: "center"
            }}>
                <h1 style={{ color: "#ffffff", marginBottom: "30px", fontWeight: "700", fontSize: "28px" }}>
                    {isRegister ? "Daftar Akun" : "Selamat Datang"}
                </h1>

                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <div style={{ textAlign: "left", marginBottom: "16px" }}>
                            <label style={{ color: "white", fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "8px" }}>Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.1)", color: "white" }}
                                required
                            />``
                        </div>
                    )}
                    
                    <div style={{ textAlign: "left", marginBottom: "16px" }}>
                        <label style={{ color: "white", fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "8px" }}>Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.1)", color: "white" }}
                            required
                        />
                    </div>

                    <div style={{ textAlign: "left", marginBottom: "16px" }}>
                        <label style={{ color: "white", fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "8px" }}>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.1)", color: "white" }}
                            required
                        />
                    </div>

                    {isRegister && (
                        <div style={{ textAlign: "left", marginBottom: "16px" }}>
                            <label style={{ color: "white", fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "8px" }}>Konfirmasi Password</label>
                            <input
                                type="password"
                                placeholder="Ulangi Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.1)", color: "white" }}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" style={{
                        width: "100%", padding: "14px", background: "#5851db", color: "white",
                        border: "none", borderRadius: "12px", fontWeight: "600", fontSize: "16px", cursor: "pointer",
                        marginTop: "10px"
                    }}>
                        {isRegister ? "Daftar Sekarang" : "Masuk Sekarang"}
                    </button>
                </form>

                <div style={{ marginTop: "24px", fontSize: "14px", color: "white" }}>
                    <p>
                        {isRegister ? "Sudah punya akun?" : "Belum punya akun?"} 
                        <span onClick={() => setIsRegister(!isRegister)} style={{ color: "#cfa670", cursor: "pointer", fontWeight: "700", marginLeft: "5px" }}>
                            {isRegister ? "Masuk" : "Daftar"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
