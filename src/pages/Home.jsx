import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { products } from '../data/products';

const services = [
    { icon: '🚚', title: 'Free Shipping', desc: 'On all orders over ₹999' },
    { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
    { icon: '🔒', title: 'Secure Payment', desc: '100% protected checkout' },
    { icon: '💬', title: '24/7 Support', desc: 'Always here to help' },
];

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('All');
    const navigate = useNavigate();

    const newArrivals = products.filter(p => p.isNew).slice(0, 4);
    const trending = products.filter(p => p.trending).slice(0, 4);
    const topPicks = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

    return (
        <div>
            <HeroBanner />
            <div className="container">

                {/* Services */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 70 }}>
                    {services.map(s => (
                        <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', background: '#f8f9fa', borderRadius: 4 }}>
                            <span style={{ fontSize: 28 }}>{s.icon}</span>
                            <div>
                                <h4 style={{ fontFamily: 'DM Sans', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{s.title}</h4>
                                <p style={{ fontSize: 13, color: '#6c757d' }}>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* New Arrivals */}
                <h2 className="section-title">New Arrivals</h2>
                <p className="section-subtitle">Fresh styles just dropped</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, marginBottom: 60 }}>
                    {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
                </div>

                {/* Trending */}
                <h2 className="section-title">Trending Now</h2>
                <p className="section-subtitle">What everyone's wearing</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, marginBottom: 60 }}>
                    {trending.map(p => <ProductCard key={p.id} product={p} />)}
                </div>

                {/* Top Picks */}
                <h2 className="section-title">Top Rated</h2>
                <p className="section-subtitle">Loved by our customers</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, marginBottom: 60 }}>
                    {topPicks.map(p => <ProductCard key={p.id} product={p} />)}
                </div>

                {/* Promo Banner */}
                <div style={{ background: 'linear-gradient(120deg,#1a1a2e,#2d2d4e)', borderRadius: 8, padding: '50px 60px', marginBottom: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                    <div>
                        <p style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#f4a261', marginBottom: 8 }}>Limited Time Offer</p>
                        <h2 style={{ fontSize: 38, marginBottom: 8 }}>Summer Collection</h2>
                        <p style={{ fontSize: 24, fontWeight: 300 }}><span style={{ color: '#e63946', fontWeight: 700 }}>₹999.00</span> <s style={{ fontSize: 16, color: '#adb5bd' }}>₹2,999.00</s></p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 15, color: '#ccc', marginBottom: 20, maxWidth: 300 }}>Shop the full summer collection. Stunning styles at incredible prices.</p>
                        <button className="btn-primary" onClick={() => navigate('/shop')}>Shop the Collection</button>
                    </div>
                </div>

            </div>
        </div>
    );
}