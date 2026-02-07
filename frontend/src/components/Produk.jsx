import React, { useState, useEffect } from "react";
import "./Produk.css";

function Produk() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fungsi untuk mengambil data dari Backend
    useEffect(() => {
        const defaultProducts = [
            { id: 1, name: "Espresso", price: "Rp 15.000", img: "https://tse3.mm.bing.net/th/id/OIP.XRnMPKM91AMMyh1NOrg4eAHaEJ?pid=Api&P=0&h=180" },
            { id: 2, name: "Cappuccino", price: "Rp 25.000", img: "https://tse3.mm.bing.net/th/id/OIP.rhbU05ivjztzkjDs_pUrUgHaFj?pid=Api&P=0&h=180" },
            { id: 3, name: "Latte Art", price: "Rp 28.000", img: "https://tse3.mm.bing.net/th/id/OIP.peG0_R13Qc4fxoWkyzf46AHaE8?pid=Api&P=0&h=180" },
            { id: 4, name: "Cold Brew", price: "Rp 22.000", img: "https://tse4.mm.bing.net/th/id/OIP.wHJ7vQY6_J96rrWwMxrzMQAAAA?pid=Api&P=0&h=180" },
        ];

        fetch("http://localhost:5000/api/products")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts(defaultProducts);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal memuat produk:", err);
                setProducts(defaultProducts); // Tampilkan default jika server mati
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Memuat Menu...</div>;

    return (
        <section id="produk" className="produk-section">
            <div className="container">
                <div className="section-header">
                    <h3>Menu Kami</h3>
                    <h1>Produk Unggulan</h1>
                </div>

                <div className="produk-grid">
                    {products.map((item) => (
                        <div key={item._id || item.id} className="produk-card">
                            <div className="produk-badge">Best Seller</div>
                            <div className="produk-img">
                                <img src={item.img} alt={item.name} />
                            </div>
                            <div className="produk-detail">
                                <h4>{item.name}</h4>
                                <p className="price">{item.price}</p>
                                <button
                                    className="btn-pesan"
                                    onClick={() => setSelectedProduct(item)}
                                >
                                    Pesan Sekarang
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Form Pesanan */}
            {selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Form Pemesanan</h2>
                        <p>Konfirmasi pesanan untuk: <strong>{selectedProduct.name}</strong></p>
                        <form className="order-form" onSubmit={(e) => {
                            e.preventDefault();
                            alert(`Pesanan ${selectedProduct.name} telah terkirim!`);
                            setSelectedProduct(null);
                        }}>
                            <input type="text" placeholder="Nama Anda" required />
                            <input type="number" placeholder="Jumlah (Cup)" min="1" required />
                            <textarea placeholder="Catatan (Contoh: Less Sugar)"></textarea>
                            <div className="modal-actions">
                                <button type="submit" className="btn-confirm">Kirim Pesan</button>
                                <button type="button" className="btn-cancel" onClick={() => setSelectedProduct(null)}>Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Produk;