import React, { useState } from "react";

function Admin() {
    const [products, setProducts] = useState([
        { id: 1, name: "Espresso", price: "Rp 15.000", category: "Kopi" }
    ]);

    const addProduct = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const newProd = {
            id: Date.now(),
            name: fd.get("name"),
            price: "Rp" + fd.get("price"),
            category: fd.get("category")
        };
        setProducts([...products, newProd]);
        alert("Produk Berhasil Ditambahkan!");
    };

    return (
        <div style={{ padding: '100px 20px', color: 'white'}}>
            <h1>Dashboard Admin 🛠️</h1>
            <form onSubmit={addProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px'}}>
                <input name="name" placeholder="Nama Produk" required style={{ padding: '10px'}} />
                <input name="price" placeholder="Harga (15000)" type="number" required style={{ padding: '10px'}} />
                <select name="category" style={{ padding: '10px'}}>
                    <option>Kopi</option>
                    <option>Non-Kopi</option>
                    <option>Snack</option>
                </select>
                <button type="submit" style={{ padding: '10px', background: 'cfa670'}}>Tambah Produk</button>
            </form>

            <h2 style={{ marginTop: '40px'}}>Daftar Produk Aktif</h2>
            <ul>
                {products.map(p => (
                    <li key={p.id}>{p.name} - {p.price} ({p.category})</li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;