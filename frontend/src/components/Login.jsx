import React, { useState } from "react";

function Login({ onLogin }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ambil data user yang sudah terdaftar dari localStorage
        const registeredUsers = JSON.parse(localStorage.getItem("users") || "[]");

        if (isRegister) {
            // Logika Registrasi
            if (password !== confirmPassword) {
                alert("Password dan Konfirmasi Password tidak cocok!");
                return;
            }

            // Cek apakah username sudah ada
            const userExists = registeredUsers.find(u => u.username === username);
            if (userExists) {
                alert("Username sudah terdaftar! Gunakan username lain.");
                return;
            }

            // Simpan user baru
            const newUser = { username, password, email };
            const updatedUsers = [...registeredUsers, newUser];
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            alert("Registrasi berhasil! Sekarang Anda bisa masuk.");
            setIsRegister(false); // Pindah ke halaman login
            setUsername(username); // Memudahkan user untuk langsung login
            setPassword("");
            setConfirmPassword("");
        } else {
            // Logika Login
            // 1. Cek Admin Hardcoded (tetap ada sebagai backup)
            if (username === "admin" && password === "kopi123") {
                onLogin();
                return;
            }

            // 2. Cek ke daftar user yang registrasi dari localStorage
            const user = registeredUsers.find(u => u.username === username && u.password === password);
            if (user) {
                onLogin();
            } else {
                alert("Username atau Password salah!");
            }
        }
    };

    return (
        <div style={{
            height: "100vh", display: "flex", justifyContent: "center",
            alignItems: "center", background: "#e6eaf8", color: "#1a1a3b",
            fontFamily: "'Inter', sans-serif"
        }}>
            <div style={{
                background: "white", padding: "40px", borderRadius: "24px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.05)", width: "380px", textAlign: "center"
            }}>
                <h1 style={{ color: "#1a1a3b", marginBottom: "30px", fontWeight: "700", fontSize: "28px" }}>
                    {isRegister ? "Daftar Akun" : "Selamat Datang"}
                </h1>
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", padding: "14px 16px", marginBottom: "16px", borderRadius: "12px", border: "1px solid #e0e0e0", boxSizing: "border-box", fontSize: "14px" }}
                            required
                        />
                    )}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: "100%", padding: "14px 16px", marginBottom: "16px", borderRadius: "12px", border: "1px solid #e0e0e0", boxSizing: "border-box", fontSize: "14px" }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: "100%", padding: "14px 16px", marginBottom: "16px", borderRadius: "12px", border: "1px solid #e0e0e0", boxSizing: "border-box", fontSize: "14px" }}
                        required
                    />
                    {isRegister && (
                        <input
                            type="password"
                            placeholder="Konfirmasi Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ width: "100%", padding: "14px 16px", marginBottom: "16px", borderRadius: "12px", border: "1px solid #e0e0e0", boxSizing: "border-box", fontSize: "14px" }}
                            required
                        />
                    )}

                    {!isRegister && (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", fontSize: "13px" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                                <input type="checkbox" /> Ingat Saya
                            </label>
                            <a href="#" style={{ color: "#5851db", textDecoration: "none", fontWeight: "500" }}>Lupa Password?</a>
                        </div>
                    )}

                    <button type="submit" style={{
                        width: "100%", padding: "14px", background: "#5851db", color: "white",
                        border: "none", borderRadius: "12px", fontWeight: "600", fontSize: "16px", cursor: "pointer",
                        transition: "background 0.3s"
                    }}>
                        {isRegister ? "Daftar Sekarang" : "Masuk Sekarang"}
                    </button>
                </form>

                <div style={{ marginTop: "24px", fontSize: "14px", color: "#4a4a4a" }}>
                    {isRegister ? (
                        <p>Sudah punya akun? <span onClick={() => { setIsRegister(false); setUsername(""); setPassword(""); }} style={{ color: "#5851db", cursor: "pointer", fontWeight: "600", marginLeft: "4px" }}>Masuk</span></p>
                    ) : (
                        <p>Belum punya akun? <span onClick={() => { setIsRegister(true); setUsername(""); setPassword(""); }} style={{ color: "#5851db", cursor: "pointer", fontWeight: "600", marginLeft: "4px" }}>Daftar</span></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
