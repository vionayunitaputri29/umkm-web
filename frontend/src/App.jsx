import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Produk from "./components/Produk";
import RiwayatPesanan from "./components/RiwayatPesanan";
import Footer from "./components/Footer";
import GalleryAndTestimonials from "./components/GalleryAndTestimonials";
import Cart from "./components/Cart";

// IMPORT KOMPONEN BARU
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // State untuk Login
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Fungsi Tambah ke Pesanan
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id && item.name === product.name);
            if (existingItem) {
                return prevItems.map(item =>
                    (item.id === product.id && item.name === product.name)
                        ? { ...item, qty: (item.qty || 1) + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, qty: 1 }];
        });
        alert(`${product.name} berhasil ditambahkan! 📝`);
    };

    const updateQty = (index, delta) => {
        setCartItems(prevItems => prevItems.map((item, i) =>
            i === index ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } : item
        ));
    };

    const removeFromCart = (index) => {
        const newCart = [...cartItems];
        newCart.splice(index, 1);
        setCartItems(newCart);
    };

    const handleCheckout = () => {
        const phone = "6283181580035";
        let message = `Halo Admin *KEDAI KOPI*, saya mau pesan:\n\n`;
        cartItems.forEach((item, index) => {
            message += `${index + 1}. *${item.name}* (${item.qty}x) - ${item.price}\n`;
        });
        const total = cartItems.reduce((acc, item) => acc + (parseInt(item.price.replace(/[^0-9]/g, "")) * (item.qty || 1)), 0);
        message += `\n*Total Tagihan: Rp ${total.toLocaleString()}*`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
        setCartItems([]);
        setIsCartOpen(false);
    };

    return (
        <Router>
            <div className="App">
                <Navbar
                    cartCount={cartItems.reduce((acc, item) => acc + (item.qty || 1), 0)}
                    onOpenCart={() => setIsCartOpen(true)}
                />

                <Routes>
                    {/* Halaman Utama */}
                    <Route path="/" element={
                        <>
                            <Hero />
                            <About />
                            <Produk onAddToCart={addToCart} />
                            <GalleryAndTestimonials />
                        </>
                    } />

                    {/* Halaman Login */}
                    <Route path="/login" element={
                        <Login onLogin={() => setIsLoggedIn(true)} />
                    } />

                    {/* Halaman Admin (Hanya bisa dibuka jika sudah login) */}
                    <Route path="/admin" element={
                        isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />
                    } />

                    <Route path="/riwayat" element={<RiwayatPesanan />} />
                </Routes>

                <Footer />

                {isCartOpen && (
                    <Cart
                        cartItems={cartItems}
                        onRemove={removeFromCart}
                        onUpdateQty={updateQty}
                        onCheckout={handleCheckout}
                        onClose={() => setIsCartOpen(false)}
                    />
                )}
            </div>
        </Router>
    );
}

export default App;