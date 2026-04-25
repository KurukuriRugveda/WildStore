import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer style={{ background: '#1a1a2e', color: '#adb5bd', marginTop: 80, padding: '60px 0 30px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, marginBottom: 40 }}>
                    <div>
                        <h3 style={{ color: 'white', fontSize: 24, marginBottom: 12 }}>WildStore</h3>
                        <p style={{ fontSize: 14, lineHeight: 1.8 }}>Your destination for the latest fashion trends. Quality meets style.</p>
                    </div>
                    {[
                        { title: 'Shop', links: [['All Products', '/shop'], ['Dresses', '/shop?category=Dresses'], ['Tops', '/shop?category=Tops'], ['Shoes', '/shop?category=Shoes']] },
                        { title: 'Help', links: [['FAQ', '#'], ['Shipping Policy', '#'], ['Returns', '#'], ['Track Order', '#']] },
                        { title: 'Company', links: [['About Us', '#'], ['Careers', '#'], ['Blog', '#'], ['Contact', '#']] },
                    ].map(col => (
                        <div key={col.title}>
                            <h4 style={{ color: 'white', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>{col.title}</h4>
                            <ul style={{ listStyle: 'none' }}>
                                {col.links.map(([label, to]) => (
                                    <li key={label} style={{ marginBottom: 8 }}>
                                        <Link to={to} style={{ fontSize: 14, color: '#adb5bd', transition: 'color 0.2s' }}
                                            onMouseEnter={e => e.target.style.color = '#e63946'}
                                            onMouseLeave={e => e.target.style.color = '#adb5bd'}
                                        >{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div style={{ borderTop: '1px solid #2d2d4e', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                    <p>© 2026 WildStore. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: 16 }}>
                        {['Visa', 'Mastercard', 'PayPal', 'UPI'].map(m => (
                            <span key={m} style={{ background: '#2d2d4e', padding: '3px 10px', borderRadius: 3, fontSize: 12 }}>{m}</span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}