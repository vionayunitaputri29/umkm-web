import "./Footer.css";

function Footer() {
    return (
        <footer id="contact" className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h2>BAKUL KOPI</h2>
                    <p>Tempat ternyaman untuk menikmati seduhan kopi asli nusantara.</p>
                </div>
                <div className="footer-section">
                    <h3>Kontak</h3>
                    <p>Jl. Kenangan No. 12</p>
                    <p>WA: 0812-3456-7890</p>
                    <p>Email: Bakul@kopi.com</p>
                </div>
                <div className="footer-section">
                    <h3>Sosial Media</h3>
                    <div className="social-links">
                        <a href="#">Instagram</a>
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Bakul Kopi. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
