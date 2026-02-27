import React, { useState, useEffect } from "react";
import "./Produk.css";

function Produk({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState("Semua");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const defaultProducts = [
            { id: 101, name: "Espresso", price: "Rp 15.000", category: "Kopi", img: "https://tse3.mm.bing.net/th/id/OIP.XRnMPKM91AMMyh1NOrg4eAHaEJ?pid=Api&P=0&h=180", rating: 4 },
            { id: 102, name: "Matcha Latte", price: "Rp 25.000", category: "Non-Kopi", img: "https://th.bing.com/th/id/OIP.flBklnuNRn4oS5mqWimvgwHaLH?pid=ImgDetMain", rating: 5 },
            { id: 103, name: "French Fries", price: "Rp 18.000", category: "Snack", img: "https://tse3.mm.bing.net/th/id/OIP.8HOfsUgGi_vKT1lzXtFlhQHaE8?pid=Api&P=0&h=180", rating: 4 },
            { id: 104, name: "Latte", price: "Rp 20.000-25.000", category: "Kopi", img: "https://tse2.mm.bing.net/th/id/OIP.vKO__-thMjsj5FaDPhs-tAHaEK?cb=defcache2&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3", rating: 4.5 },
        ];
        setProducts(defaultProducts);
        setLoading(false);
    }, []);

    // Filter Produk Berdasarkan Kategori
    const filteredProducts = filter === "Semua" ? products : products.filter(p => p.category === filter);

    if (loading) return <div className="loading">Memuat Menu...</div>;

    return (
        <section id="produk" className="produk-section">
            <div className="container">
                <div className="section-header">
                    <h1>Menu Terpilih</h1>

                    {/* Tombol Filter */}
                    <div className="filter-buttons">
                        {["Semua", "Kopi", "Non-Kopi", "Snack"].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={filter === cat ? "active" : ""}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="produk-grid">
                    {filteredProducts.map((item) => (
                        <div key={item.id} className="produk-card fade-in">
                            <div className="produk-img"><img src={item.img} alt={item.name} /></div>
                            <div className="produk-detail">
                                <h4>{item.name}</h4>
                                <div style={{ color: '#cfa670', marginBottom: '10px' }}>{"⭐".repeat(item.rating)}</div> {/* Fitur No. 5 */}
                                <p className="price">{item.price}</p>

                                {/* TOMBOL KERANJANG (Fitur No. 1) */}
                                <button className="btn-pesan" onClick={() => onAddToCart(item)}>
                                    Tambahkan Ke Pesanan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Produk;