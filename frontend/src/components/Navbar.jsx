import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onLogout, isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <h2 className="nav-logo">Bakul Kopi</h2>

            {/* Tombol Hamburger Menu (Tiga Garis) */}
            <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            {/* Daftar Menu melayang */}
            <ul className={isOpen ? "nav-links active" : "nav-links"}>
                <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                <li><a href="#about" onClick={() => setIsOpen(false)}>Tentang Kami</a></li>
                <li><a href="#menu" onClick={() => setIsOpen(false)}>Menu Favorit</a></li>
                <li><a href="#contact" onClick={() => setIsOpen(false)}>Kontak</a></li>
                <li>
                    {isLoggedIn ? (
                        <button className="logout-btn" onClick={onLogout}>Keluar</button>
                    ) : (
                        <Link to="/login" className="login-btn-nav" onClick={() => setIsOpen(false)} style={{
                            background: "#cfa670", color: "#1a1a1a", padding: "8px 20px", borderRadius: "5px", fontWeight: "bold"
                        }}>Masuk</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;