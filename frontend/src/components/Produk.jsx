import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";
import "./Produk.css";

function Produk({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Semua");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products");
                setProducts(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filtered = products.filter(p =>
        (filter === "Semua" || p.category === filter) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="loading" style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Memuat Menu Digital...</div>;

    return (
        <section id="produk" className="produk-section">
            <div className="container">
                <div className="section-header">
                    <h1>Menu Terpilih</h1>

                    {/* FITUR: Kolom Pencarian */}
                    <div className="search-container" style={{ margin: '20px 0', textAlign: 'center' }}>
                        <input
                            type="text"
                            placeholder="Cari kopi atau makanan..."
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                padding: '12px 25px',
                                borderRadius: '30px',
                                width: '100%',
                                maxWidth: '400px',
                                border: '2px solid #cfa670',
                                background: '#1a1a1a',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div className="filter-buttons">
                        {["Semua", "Kopi", "Non-Kopi", "Snack"].map(cat => (
                            <button key={cat} onClick={() => setFilter(cat)} className={filter === cat ? "active" : ""}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="produk-grid">
                    <AnimatePresence>
                        {filtered.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -10 }}
                                key={item._id}
                                className={`produk-card ${!item.isAvailable ? 'out-of-stock' : ''}`}
                            >
                                <div className="produk-img" style={{ position: 'relative' }}>
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        style={{
                                            filter: item.isAvailable ? 'none' : 'grayscale(100%) blur(2px)',
                                            transition: '0.3s'
                                        }}
                                    />
                                    {!item.isAvailable && (
                                        <div className="stock-label" style={{
                                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                            background: 'rgba(255,0,0,0.8)', color: 'white', padding: '5px 15px', borderRadius: '5px', fontWeight: 'bold'
                                        }}>HABIS</div>
                                    )}
                                </div>
                                <div className="produk-detail">
                                    <h4>{item.name}</h4>
                                    <p className="price">{item.price}</p>
                                    <button
                                        disabled={!item.isAvailable}
                                        className="btn-pesan"
                                        onClick={() => onAddToCart(item)}
                                        style={{ background: item.isAvailable ? '#cfa670' : '#444' }}
                                    >
                                        {item.isAvailable ? "Tambah Ke Pesanan" : "Stok Kosong"}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
                {filtered.length === 0 && <p style={{ color: 'gray', textAlign: 'center' }}>Menu tidak ditemukan...</p>}
            </div>
        </section>
    );
}

export default Produk;
