import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const { dispatch } = useCart();
    const { toggle, isWishlisted } = useWishlist();

    const addToCart = (e) => {
        e.stopPropagation();
        dispatch({ type: 'ADD_TO_CART', payload: { ...product, size: 'M' } });
    };

    return (
        <div onClick={() => navigate(`/product/${product.id}`)} style={{
            background: 'white', cursor: 'pointer', position: 'relative',
            transition: 'transform 0.2s, box-shadow 0.2s', borderRadius: 2,
            border: '1px solid #f0f0f0',
        }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
                <img src={product.image} alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                {product.badge && (
                    <span style={{
                        position: 'absolute', top: 12, left: 12, background: product.badge === 'New' ? '#2a9d8f' : '#e63946',
                        color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 2
                    }}>{product.badge}</span>
                )}
                <button onClick={e => { e.stopPropagation(); toggle(product); }} style={{
                    position: 'absolute', top: 12, right: 12, background: 'white', border: 'none',
                    width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 18, color: isWishlisted(product.id) ? '#e63946' : '#ccc',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'color 0.2s'
                }}>♥</button>
                <button onClick={addToCart} style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(26,26,46,0.9)',
                    color: 'white', border: 'none', padding: '12px', fontSize: 13, fontWeight: 600,
                    opacity: 0, transition: 'opacity 0.2s', letterSpacing: 0.5, textTransform: 'uppercase'
                }}
                    onMouseEnter={e => e.target.style.opacity = 1}
                    onMouseLeave={e => e.target.style.opacity = 0}
                >Add to Cart</button>
            </div>
            <div style={{ padding: '16px 14px' }}>
                <p style={{ fontSize: 11, color: '#6c757d', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{product.category}</p>
                <h4 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 500, marginBottom: 8, lineHeight: 1.3 }}>{product.name}</h4>
                <StarRating rating={product.rating} reviews={product.reviews} />
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>${product.price}</span>
                    {product.originalPrice && (
                        <span style={{ fontSize: 13, color: '#aaa', textDecoration: 'line-through' }}>${product.originalPrice}</span>
                    )}
                </div>
            </div>
        </div>
    );
}