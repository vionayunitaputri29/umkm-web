import "./Hero.css";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Kedai Kopi</h1>
                <p>Nikmati kopi terbaik dari biji kopi pilihan ☕</p>

                {/* Tombol diarahkan ke ID "menu" di halaman yang sama */}
                <a href="#menu">
                    <button className="btn-pesan-hero" aria-label="Pesan Kopi Sekarang">Pesan Sekarang Juga</button>
                </a>
            </div>
        </section>
    );
}

export default Hero;