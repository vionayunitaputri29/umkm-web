import React, { useState } from "react";
import "./Cart.css";

function Cart({ cartItems, onRemove, onUpdateQty, onClose }) {
    // Menghitung total harga semua item di keranjang
    const totalHarga = cartItems.reduce((acc, item) => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ""));
        return acc + (price * (item.qty || 1));
    }, 0);

    const hasDrink = cartItems.some(item => item.category === "Kopi" || item.category === "Non-Kopi");
    const hasSnack = cartItems.some(item => item.category === "Snack");

    const handleCheckout = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const customer = {
            name: formData.get("name"),
            table: formData.get("table"),
            sugar: formData.get("sugar") || "-",
            size: formData.get("size") || "-",
            sauce: formData.get("sauce") || "-",
            payment: formData.get("payment"),
            note: formData.get("note") || "-"
        };

        // Format pesan WhatsApp untuk BANYAK item
        const phone = "6283181580035";
        let detailPesanan = "";
        cartItems.forEach((item, index) => {
            detailPesanan += `${index + 1}. *${item.name}* (${item.qty} pcs) - Rp ${(parseInt(item.price.replace(/[^0-9]/g, "")) * item.qty).toLocaleString()}\n`;
        });

        const message = `Halo Admin *KEDAI KOPI*, ada pesanan baru! ☕

*--- DATA PELANGGAN ---*
*Nama:* ${customer.name}
*Meja:* ${customer.table}
${hasDrink ? `*Gula:* ${customer.sugar}\n*Ukuran:* ${customer.size}\n` : ""}${hasSnack ? `*Saus:* ${customer.sauce}\n` : ""}*Bayar:* ${customer.payment}

*--- DAFTAR PESANAN ---*
${detailPesanan}
*Total Tagihan: Rp ${totalHarga.toLocaleString()}*

*Catatan:* ${customer.note}

_Mohon segera diproses ya, terima kasih!_`;

        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, "_blank");
    };

    return (
        <div className="cart-overlay">
            <div className="cart-modal fade-in">
                <div className="cart-header">
                    <h2>Daftar Pesanan 📝</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="cart-body">
                    {cartItems.length === 0 ? (
                        <p className="empty-msg">Belum ada pesanan. Yuk pilih menu favoritmu! ☕</p>
                    ) : (
                        <>
                            {/* List Item di Daftar Pesanan */}
                            <div className="cart-items-list">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        <img src={item.img} alt={item.name} />
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <p>{item.price}</p>

                                            {/* KONTROL JUMLAH (DIPERBARUI) */}
                                            <div className="qty-control" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '5px' }}>
                                                <button type="button" onClick={() => onUpdateQty(index, -1)} style={{ background: '#444', border: 'none', color: 'white', width: '25px', height: '25px', borderRadius: '5px', cursor: 'pointer' }}>-</button>
                                                <span style={{ color: '#cfa670', fontWeight: 'bold' }}>{item.qty || 1}</span>
                                                <button type="button" onClick={() => onUpdateQty(index, 1)} style={{ background: '#cfa670', border: 'none', color: '#1a1a1a', width: '25px', height: '25px', borderRadius: '5px', cursor: 'pointer' }}>+</button>
                                            </div>
                                        </div>
                                        <button className="btn-remove" onClick={() => onRemove(index)} style={{ marginLeft: 'auto' }}>Hapus</button>
                                    </div>
                                ))}
                            </div>

                            {/* Form Data Pelanggan (Pindahan dari Produk.jsx) */}
                            <form className="cart-form" onSubmit={handleCheckout}>
                                <h3>Data Pemesan</h3>
                                <div className="input-group">
                                    <label>Nama Anda</label>
                                    <input name="name" type="text" placeholder="Masukkan nama" required />
                                </div>
                                <div className="input-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div className="input-group">
                                        <label>Pilih Meja</label>
                                        <select name="table" required>
                                            <option value="Meja 01">Meja 01</option>
                                            <option value="Meja 02">Meja 02</option>
                                            <option value="Meja 03">Meja 03</option>
                                            <option value="Takeaway">Bawa Pulang</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label>Metode Pembayaran</label>
                                        <select name="payment" required>
                                            <option value="Tunai">Tunai (Kasir)</option>
                                            <option value="QRIS">QRIS / E-Wallet</option>
                                            <option value="Transfer">Transfer Bank</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="cart-options-grid" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                    gap: '10px',
                                    marginTop: '15px'
                                }}>
                                    {hasDrink && (
                                        <>
                                            <div className="input-group">
                                                <label>Ukuran Gelas</label>
                                                <select name="size" required>
                                                    <option value="Regular">Regular</option>
                                                    <option value="Small">Small</option>
                                                    <option value="Large">Large</option>
                                                </select>
                                            </div>
                                            <div className="input-group">
                                                <label>Level Gula</label>
                                                <select name="sugar" required>
                                                    <option value="Normal">Normal</option>
                                                    <option value="Less Sugar">Less Sugar</option>
                                                    <option value="No Sugar">No Sugar</option>
                                                </select>
                                            </div>
                                        </>
                                    )}
                                    {hasSnack && (
                                        <div className="input-group">
                                            <label>Pilihan Saus</label>
                                            <select name="sauce" required>
                                                <option value="Original">Original</option>
                                                <option value="Saus Sambal">Saus Sambal</option>
                                                <option value="Mayonnaise">Mayonnaise</option>
                                                <option value="Cheese Sauce">Cheese Sauce</option>
                                            </select>
                                        </div>
                                    )}
                                </div>

                                <div className="input-group" style={{ marginTop: '15px' }}>
                                    <label>Catatan (Opsional)</label>
                                    <input name="note" type="text" placeholder="Contoh: Esnya banyakan" />
                                </div>

                                <div className="cart-footer">
                                    <div className="total-box">
                                        <span>Total Tagihan:</span>
                                        <strong>Rp {totalHarga.toLocaleString()}</strong>
                                    </div>
                                    <button type="submit" className="btn-checkout">Pesan via WhatsApp</button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;