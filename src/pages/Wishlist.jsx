import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
    const { wishlist } = useWishlist();
    const navigate = useNavigate();

    if (wishlist.length === 0) return (
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
            <p style={{ fontSize: 60 }}>🤍</p>
            <h2 style={{ marginTop: 20, marginBottom: 12 }}>Your wishlist is empty</h2>
            <p style={{ color: '#6c757d', marginBottom: 28 }}>Save your favourite items here.</p>
            <button className="btn-primary" onClick={() => navigate('/shop')}>Explore Products</button>
        </div>
    );

    return (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
            <h1 className="section-title" style={{ marginBottom: 8 }}>My Wishlist</h1>
            <p className="section-subtitle">{wishlist.length} saved items</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
                {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}