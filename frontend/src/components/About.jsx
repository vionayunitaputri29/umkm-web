import "./About.css";

function About() {
    return (
        <section id="about" className="about">
            <div className="about-container">
                <div className="about-image">
                    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Coffee Shop" />
                </div>
                <div className="about-info">
                    <h3>Tentang Kami</h3>
                    <h1>Tradisi Kopi</h1>
                    <p>
                        Kami berdedikasi untuk menyajikan kopi terbaik yang bersumber langsung dari petani lokal.
                        Setiap biji kopi dipanggang dengan hati untuk menghasilkan aroma dan rasa yang autentik.
                    </p>
                    <p>
                        Lebih dari sekedar kafe, kami adalah tempat bertemunya cerita dan inspirasi di setiap cangkirnya.
                    </p>
                    <button className="btn-secondary">Selengkapnya</button>
                </div>
            </div>
        </section>
    );
}

export default About;
