import React, { useState, useEffect } from "react";
import "./Menu.css";

function Menu() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    // Ambil data dari Backend (API)
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
                console.error("Gagal mengambil data:", err);
                setProducts(defaultProducts); // Tampilkan default jika server mati
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Sedang memuat menu...</div>;

    return (
        <section id="menu" className="menu">
            <div className="section-title">
                <h3 style={{ color: '#cfa670' }}>Pilihan Terbaik</h3>
                <h1 style={{ color: 'white' }}>Menu Favorit</h1>
            </div>

            <div className="menu-grid">
                {products.map(product => (
                    <div key={product.id || product._id} className="menu-card">
                        <div className="menu-img">
                            <img src={product.img} alt={product.name} />
                        </div>
                        <div className="menu-info">
                            <h4>{product.name}</h4>
                            <p>{product.price}</p>
                            <button className="btn-order" onClick={() => setSelectedProduct(product)}>
                                Pesan Sekarang
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form Pesanan */}
            {selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Form Pemesanan</h2>
                        <p>Menu: <strong>{selectedProduct.name}</strong></p>
                        <form className="order-form" onSubmit={(e) => {
                            e.preventDefault();
                            alert(`Pesanan ${selectedProduct.name} berhasil dikirim!`);
                            setSelectedProduct(null);
                        }}>
                            <input type="text" placeholder="Nama Anda" required />
                            <input type="number" placeholder="Jumlah" min="1" required />
                            <div className="modal-buttons">
                                <button type="submit" className="confirm-btn">Kirim</button>
                                <button type="button" className="cancel-btn" onClick={() => setSelectedProduct(null)}>Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Menu;