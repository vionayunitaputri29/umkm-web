import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react"; // FITUR 3: QR Code
import api from "../api";
import "./AdminDashboard.css";

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [showQR, setShowQR] = useState(false);

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    const toggleStock = async (id) => {
        await api.put(`/products/${id}/toggle`);
        fetchProducts();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Hapus kopi ini?")) {
            await api.delete(`/products/${id}`);
            fetchProducts();
        }
    };

    return (
        <div className="admin-container" style={{ padding: '100px 20px', color: 'white' }}>
            <h1>Dashboard Admin</h1>

            {/* FITUR 3: Tombol QR Code */}
            <button onClick={() => setShowQR(!showQR)} style={{ marginBottom: '20px', background: '#cfa670' }}>
                {showQR ? "Tutup QR Code" : "Lihat QR Code Website"}
            </button>

            {showQR && (
                <div style={{ background: 'white', padding: '20px', display: 'inline-block', borderRadius: '10px', marginBottom: '20px' }}>
                    <QRCodeCanvas value={window.location.origin} size={200} />
                    <p style={{ color: 'black', marginTop: '10px' }}>Scan untuk buka Menu Digital</p>
                </div>
            )}

            <div className="admin-list">
                {products.map(p => (
                    <div key={p._id} className="admin-item" style={{ borderBottom: '1px solid #444', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{p.name} - {p.isAvailable ? "✅ Aktif" : "❌ Habis"}</span>
                        <div>
                            <button onClick={() => toggleStock(p._id)} style={{ marginRight: '10px' }}>
                                {p.isAvailable ? "Set Habis" : "Set Tersedia"}
                            </button>
                            <button onClick={() => handleDelete(p._id)} style={{ background: 'red' }}>Hapus</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;
