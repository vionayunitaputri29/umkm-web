import React, { useState, useEffect } from "react";

function RiwayatPesanan() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem("riwayat_pesanan") || "[]");
        setOrders(savedOrders);
    }, []);

    const hapusSemua = () => {
        if (window.confirm("Hapus semua riwayat pesanan Anda?")) {
            localStorage.removeItem("riwayat_pesanan");
            setOrders([]);
        }
    };

    return (
        <div style={{ padding: "100px 20px", background: "#0a0a0a", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                    <h1 style={{ color: "#cfa670", fontSize: "32px" }}>📜 Riwayat Pesanan Saya</h1>
                    {orders.length > 0 && (
                        <button onClick={hapusSemua} style={{ background: "#ff4757", color: "white", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Hapus Semua</button>
                    )}
                </div>

                {orders.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "50px", background: "#151515", borderRadius: "15px", border: "1px dashed #333" }}>
                        <p style={{ color: "#888", fontSize: "18px" }}>Belum ada riwayat pesanan.</p>
                        <a href="/#produk" style={{ color: "#cfa670", display: "inline-block", marginTop: "15px" }}>Pesan kopi sekarang →</a>
                    </div>
                ) : (
                    <div style={{ display: "grid", gap: "20px" }}>
                        {orders.map((item, index) => (
                            <div key={index} style={{ background: "#151515", padding: "20px", borderRadius: "15px", border: "1px solid #222", position: "relative" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                                    <span style={{ color: "#cfa670", fontWeight: "700", fontSize: "18px" }}>{item.product}</span>
                                    <span style={{ color: "#888", fontSize: "13px" }}>{item.waktu}</span>
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "14px", color: "#ccc" }}>
                                    <p>👤 <strong>{item.name}</strong></p>
                                    <p>☕ <strong>{item.qty} Cup</strong> ({item.sugar})</p>
                                    <p>🪑 <strong>{item.table}</strong></p>
                                    <p>💳 <strong>{item.payment}</strong></p>
                                </div>
                                <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #222", fontSize: "20px", fontWeight: "700", color: "#cfa670" }}>
                                    Total: Rp {item.total.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RiwayatPesanan;