import React from "react";

const WhatsAppButton = () => {
    const phoneNumber = "6283181580035";

    const message = "Halo Bakul Kopi, saya tertarik untuk pesan website ini!";
    const whatsappUrl = `https://wa.me/${6283181580035}?text=${encodeURIComponent(message)}`;

    return (
        <a href={whatsappUrl} className="whatsapp-float" target="_blank" rel="noopener noreferrer" title="Hubungi kami di WhatsApp">
            <div className="whatsapp-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30" style={{ color: 'white' }}>
                    <path d="M12.031 6.172c-2.32 0-4.591.391-6.738 1.166l-.16.059-1.543-.532a.375.375 0 00-.472.472l.532 1.543-.059.16C2.816 11.2 2.425 13.471 2.425 15.791c0 5.305 4.315 9.62 9.62 9.62 5.305 0 9.62-4.315 9.62-9.62.001-5.305-4.314-9.619-9.634-9.619z" />
                </svg>
            </div>
            <span className="whatsapp-text">Chat via WhatsApp</span>
        </a>
    );
};

export default WhatsAppButton;