import React, { useState, useEffect } from "react";
import api from "../api";
import "./AdminDashboard.css";

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", img: "", description: "" });

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await api.post("/products", form);
            alert("Berhasil menambah menu!");
            setForm({ name: "", price: "", img: "", description: "" });
            fetchProducts();
        } catch (err) { alert("Gagal Simpan!"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Hapus kopi ini?")) {
            await api.delete(`/products/${id}`);
            fetchProducts();
        }
    };

    return (
        <div className="admin-container" style={{ padding: '100px 20px' }}>
            <h1>Dashboard Admin</h1>
            <form onSubmit={handleSave} className="admin-form">
                <input placeholder="Nama Kopi" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <input placeholder="Harga (Contoh: Rp 15.000)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
                <input placeholder="URL Gambar Produk" value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} required />
                <button type="submit">Tambah Menu Baru</button>
            </form>
            <div className="admin-list">
                {products.map(p => (
                    <div key={p._id} className="admin-item">
                        <span>{p.name} - {p.price}</span>
                        <button onClick={() => handleDelete(p._id)}>Hapus</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;