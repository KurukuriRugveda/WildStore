import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === Number(id));
    const { dispatch } = useCart();
    const { toggle, isWishlisted } = useWishlist();

    const [selectedSize, setSelectedSize] = useState('M');
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Product not found.</div>;

    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleAddToCart = () => {
        for (let i = 0; i < qty; i++) dispatch({ type: 'ADD_TO_CART', payload: { ...product, size: selectedSize } });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

    return (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginBottom: 80 }}>
                {/* Image */}
                <div style={{ position: 'relative' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 4, aspectRatio: '3/4', objectFit: 'cover' }} />
                    {discount > 0 && <span style={{ position: 'absolute', top: 16, left: 16, background: '#e63946', color: 'white', padding: '4px 12px', fontWeight: 700, fontSize: 13 }}>-{discount}% OFF</span>}
                </div>

                {/* Info */}
                <div style={{ paddingTop: 20 }}>
                    <p style={{ fontSize: 12, color: '#6c757d', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>{product.category}</p>
                    <h1 style={{ fontSize: 34, lineHeight: 1.2, marginBottom: 16 }}>{product.name}</h1>
                    <div style={{ marginBottom: 16 }}><StarRating rating={product.rating} reviews={product.reviews} /></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                        <span style={{ fontSize: 32, fontWeight: 700, color: '#1a1a2e' }}>${product.price}</span>
                        {product.originalPrice && <span style={{ fontSize: 20, color: '#aaa', textDecoration: 'line-through' }}>${product.originalPrice}</span>}
                    </div>

                    <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, marginBottom: 28 }}>A beautifully crafted {product.name.toLowerCase()} designed for modern women who love style without compromise. Premium materials, lasting quality, and timeless design.</p>

                    <div style={{ marginBottom: 24 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>Select Size</h4>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {SIZES.map(s => (
                                <button key={s} onClick={() => setSelectedSize(s)} style={{
                                    width: 48, height: 48, border: '1.5px solid', cursor: 'pointer',
                                    borderColor: selectedSize === s ? '#1a1a2e' : '#ddd',
                                    background: selectedSize === s ? '#1a1a2e' : 'white',
                                    color: selectedSize === s ? 'white' : '#333',
                                    fontWeight: 600, fontSize: 13, transition: 'all 0.15s'
                                }}>{s}</button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <h4 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>Quantity:</h4>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd' }}>
                            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 40, border: 'none', background: 'none', fontSize: 20, cursor: 'pointer' }}>−</button>
                            <span style={{ width: 40, textAlign: 'center', fontWeight: 600 }}>{qty}</span>
                            <button onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 40, border: 'none', background: 'none', fontSize: 20, cursor: 'pointer' }}>+</button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                        <button className="btn-primary" style={{ flex: 1, padding: '16px' }} onClick={handleAddToCart}>
                            {added ? '✓ Added to Cart!' : 'Add to Cart'}
                        </button>
                        <button className="btn-outline" onClick={() => toggle(product)} style={{ padding: '16px 20px', fontSize: 18 }}>
                            {isWishlisted(product.id) ? '♥' : '♡'}
                        </button>
                    </div>

                    <button className="btn-primary" style={{ width: '100%', background: '#2a9d8f', padding: '16px' }} onClick={() => { handleAddToCart(); navigate('/checkout'); }}>
                        Buy Now
                    </button>

                    <div style={{ marginTop: 28, padding: 20, background: '#f8f9fa', borderRadius: 4, fontSize: 13, color: '#555', lineHeight: 2 }}>
                        🚚 Free shipping on orders over $50 &nbsp;|&nbsp; 📦 30-day easy returns &nbsp;|&nbsp; 🔒 Secure checkout
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <h2 className="section-title">You May Also Like</h2>
            <p className="section-subtitle">More from {product.category}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
                {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
}