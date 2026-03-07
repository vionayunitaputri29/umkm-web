import React from "react";

const WhatsAppButton = () => {
    const handleWhatsAppClick = (e) => {
        e.preventDefault();
        alert("Terima kasih telah berkunjung! Ini adalah website demo portfolio. Fitur chat WhatsApp nyata tidak diaktifkan demi privasi.");
    };

    return (
        <div
            className="whatsapp-float"
            onClick={handleWhatsAppClick}
            style={{ cursor: 'pointer' }}
            title="Hubungi kami (Demo)"
            aria-label="Chat via WhatsApp (Demo)"
            role="button"
            tabIndex="0"
            onKeyDown={(e) => { if (e.key === 'Enter') handleWhatsAppClick(e); }}
        >
            <div className="whatsapp-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30" style={{ color: 'white' }} aria-hidden="true">
                    <path d="M12.031 6.172c-2.32 0-4.591.391-6.738 1.166l-.16.059-1.543-.532a.375.375 0 00-.472.472l.532 1.543-.059.16C2.816 11.2 2.425 13.471 2.425 15.791c0 5.305 4.315 9.62 9.62 9.62 5.305 0 9.62-4.315 9.62-9.62.001-5.305-4.314-9.619-9.634-9.619z" />
                </svg>
            </div>
            <span className="whatsapp-text">Chat via WhatsApp</span>
        </div>
    );
};

export default WhatsAppButton;