import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onLogout, isLoggedIn, cartCount, onOpenCart }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <h2 className="nav-logo">Kedai Kopi</h2>

            <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            <ul className={isOpen ? "nav-links active" : "nav-links"}>
                <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                <li><a href="#about" onClick={() => setIsOpen(false)}>Tentang</a></li>
                <li><a href="#produk" onClick={() => setIsOpen(false)}>Menu</a></li>

                {/* TOMBOL KERANJANG DI NAVBAR */}
                <li>
                    <button onClick={() => { onOpenCart(); setIsOpen(false); }} style={{
                        background: 'transparent', border: '1px solid #cfa670', color: '#cfa670',
                        padding: '5px 15px', borderRadius: '20px', cursor: 'pointer', position: 'relative'
                    }}>
                        📝 Daftar Pesanan
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute', top: '-10px', right: '-10px',
                                background: 'red', color: 'white', borderRadius: '50%',
                                padding: '2px 7px', fontSize: '12px'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                </li>

                <li>
                    {isLoggedIn ? (
                        <button className="logout-btn" onClick={onLogout}>Keluar</button>
                    ) : (
                        <Link to="/login" className="login-btn-nav" onClick={() => setIsOpen(false)}>Masuk</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;