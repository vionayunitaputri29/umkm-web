import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLogin") === "true"
    );

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLogin", "true");
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLogin");
    };

    return (
        <Router>
            <div className="app-container">
                <Navbar onLogout={handleLogout} isLoggedIn={isLoggedIn} />
                <Routes>
                    {/* Halaman Utama */}
                    <Route path="/" element={
                        <>
                            <Hero />
                            <About />
                            <Menu />
                        </>
                    } />

                    {/* Halaman Login */}
                    <Route path="/login" element={
                        isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
                    } />
                </Routes>
                <Footer />
                <WhatsAppButton />
            </div>
        </Router>
    );
}

export default App;