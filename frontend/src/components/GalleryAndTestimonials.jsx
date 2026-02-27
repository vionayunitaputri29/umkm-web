/* KODE UNTUK GALERI & TESTIMONI */
import React from "react";

const GalleryAndTestimonials = () => {
    const reviews = [
        { name: "Andi", text: "Suasananya tenang banget, cocok buat nongki dan nugas!", star: 5 },
        { name: "Siti", text: "Cappuccino nya juara, rasanya pas tidak terlalu manis.", star: 5 },
        { name: "Budi", text: "Konsep kedainya modern tapi tetap terasa hangat.", star: 4 }
    ];

    return (
        <section id="gallery" style={{ padding: '80px 20px', backgroundColor: '#0b0b0b', color: 'white' }}>
            {/* BAGIAN FOTO CAFE (LOOK) */}
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h3 style={{ color: '#cfa670', letterSpacing: '2px' }}>SUASANA</h3>
                <h1 style={{ fontSize: '2.5rem' }}>Eksplorasi Kedai</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
                    {/* Gambar simulasi dari internet agar terlihat profesional */}
                    <img src="https://www.pinhome.id/info-area/wp-content/uploads/2022/06/5-Coffee-Shops-Kekinian-di-Jakarta-Timur4-1024x751.jpg" alt="Cafe 1" style={{ width: '100%', borderRadius: '15px' }} />
                    <img src="https://www.pinhome.id/info-area/wp-content/uploads/2022/06/picture-1636086244-1024x752.jpg" alt="Cafe 2" style={{ width: '100%', borderRadius: '15px' }} />
                    <img src="https://www.pinhome.id/info-area/wp-content/uploads/2022/06/80622b546ed84a5518a62da203f30499-1024x768.jpg" alt="Cafe 3" style={{ width: '100%', borderRadius: '15px' }} />
                </div>
            </div>

            {/* BAGIAN PENILAIAN (TESTIMONI) */}
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
                <h3 style={{ color: '#cfa670' }}>PENILAIAN</h3>
                <h1>Apa Kata Customer Kami?</h1>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '25px', marginTop: '30px' }}>
                    {reviews.map((r, i) => (
                        <div key={i} style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '20px', width: '300px', border: '1px solid #333' }}>
                            <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"{r.text}"</p>
                            <h4 style={{ color: '#cfa670' }}>- {r.name}</h4>
                            <div style={{ color: '#f1c40f' }}>{'⭐'.repeat(r.star)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GalleryAndTestimonials;