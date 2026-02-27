import "./Footer.css";

function Footer() {
    return (
        <footer id="contact" className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h2>KEDAI KOPI</h2>
                    <p>Tempat ternyaman untuk menikmati seduhan kopi asli nusantara.</p>
                </div>
                <div className="footer-section">
                    <h3>Kontak</h3>
                    <p>
                        WA: <a href="https://wa.me/6283181580035" target="_blank" rel="noopener noreferrer">0831-8158-0035</a>
                    </p>
                </div>
                <div className="footer-section">
                    <h3>Sosial Media</h3>
                    <div className="social-links">
                        {/* Link Instagram dan Tiktok Aktif */}
                        <a href="https://www.instagram.com/vionayunita29_" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.tiktok.com/@_silent._5" target="_blank" rel="noopener noreferrer">Tik Tok</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Kedai Kopi. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
