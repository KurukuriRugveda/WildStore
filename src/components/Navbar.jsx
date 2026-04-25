import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
    const { totalItems } = useCart();
    const { wishlist } = useWishlist();
    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) navigate(`/shop?search=${search}`);
    };

    const iconBtn = { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', position: 'relative', padding: '4px 8px' };
    const badge = { position: 'absolute', top: -4, right: -2, background: '#e63946', color: 'white', fontSize: 10, fontWeight: 700, borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' };

    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white', borderBottom: '1px solid #f0f0f0', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
                <Link to="/" style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>WildStore</Link>
                <nav style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['/', '/shop', '/shop?category=Dresses', '/shop?category=Tops', '/shop?category=Shoes', '/shop?category=Accessories'].map((path, i) => (
                        <Link key={i} to={path} style={{ fontSize: 13, fontWeight: 500, color: '#333', textTransform: 'uppercase', letterSpacing: 0.8, transition: 'color 0.2s' }}
                            onMouseEnter={e => e.target.style.color = '#e63946'}
                            onMouseLeave={e => e.target.style.color = '#333'}
                        >{['Home', 'Shop', 'Dresses', 'Tops', 'Shoes', 'Accessories'][i]}</Link>
                    ))}
                </nav>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', border: '1px solid #e9ecef', borderRadius: 2, overflow: 'hidden' }}>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ border: 'none', outline: 'none', padding: '6px 12px', fontSize: 13, width: 140 }} />
                        <button type="submit" style={{ background: '#1a1a2e', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer' }}>🔍</button>
                    </form>
                    <Link to="/wishlist"><button style={iconBtn}>🤍<span style={{ ...badge, background: '#2a9d8f' }}>{wishlist.length}</span></button></Link>
                    <Link to="/cart"><button style={iconBtn}>🛍<span style={badge}>{totalItems}</span></button></Link>
                </div>
            </div>
        </header>
    );
}