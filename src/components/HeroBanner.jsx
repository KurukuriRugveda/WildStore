import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroBanner() {
    const navigate = useNavigate();
    return (
        <section style={{
            background: 'linear-gradient(135deg, #fff5f5 0%, #fce4ec 50%, #f3e5f5 100%)',
            padding: '80px 0', marginBottom: 60, position: 'relative', overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(230,57,70,0.06)' }} />
            <div style={{ position: 'absolute', bottom: -60, left: 100, width: 250, height: 250, borderRadius: '50%', background: 'rgba(42,157,143,0.06)' }} />
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
                <div>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: '#e63946', textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Trending Items</span>
                    <h1 style={{ fontSize: 54, lineHeight: 1.1, marginBottom: 20, color: '#1a1a2e' }}>Women's Latest<br /><span style={{ color: '#e63946' }}>Fashion Sale</span></h1>
                    <p style={{ fontSize: 16, color: '#6c757d', marginBottom: 12 }}>Starting at <strong style={{ color: '#e63946' }}>30% off</strong></p>
                    <p style={{ fontSize: 15, color: '#6c757d', marginBottom: 32, lineHeight: 1.7, maxWidth: 400 }}>Discover the season's most coveted styles. From flowy dresses to sharp blazers — your perfect look awaits.</p>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <button className="btn-primary" onClick={() => navigate('/shop')}>Shop Now</button>
                        <button className="btn-outline" onClick={() => navigate('/shop?category=Dresses')}>Explore Dresses</button>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {['https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&q=80',
                        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80',
                        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80',
                        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&q=80'
                    ].map((src, i) => (
                        <img key={i} src={src} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: i === 0 ? '60px 8px 8px 8px' : i === 3 ? '8px 8px 60px 8px' : 8, filter: 'contrast(1.05)' }} />
                    ))}
                </div>
            </div>
        </section>
    );
}