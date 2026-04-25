import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { cart, dispatch, totalPrice } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) return (
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
            <p style={{ fontSize: 60 }}>🛒</p>
            <h2 style={{ marginTop: 20, marginBottom: 12 }}>Your cart is empty</h2>
            <p style={{ color: '#6c757d', marginBottom: 28 }}>Looks like you haven't added anything yet.</p>
            <button className="btn-primary" onClick={() => navigate('/shop')}>Start Shopping</button>
        </div>
    );

    const shipping = totalPrice > 50 ? 0 : 9.99;

    return (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
            <h1 className="section-title" style={{ marginBottom: 32 }}>Shopping Cart</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40 }}>
                <div>
                    {cart.map(item => (
                        <div key={`${item.id}-${item.size}`} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 20, padding: '20px 0', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                            <img src={item.image} alt={item.name} style={{ width: 100, height: 130, objectFit: 'cover', borderRadius: 4 }} />
                            <div>
                                <p style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>{item.category}</p>
                                <h4 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 500, marginBottom: 6 }}>{item.name}</h4>
                                <p style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>Size: <strong>{item.size}</strong></p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid #ddd', width: 'fit-content' }}>
                                    <button onClick={() => item.quantity > 1 ? dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, size: item.size, quantity: item.quantity - 1 } }) : dispatch({ type: 'REMOVE_FROM_CART', payload: item })}
                                        style={{ width: 36, height: 36, border: 'none', background: 'none', fontSize: 18, cursor: 'pointer' }}>−</button>
                                    <span style={{ width: 36, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>{item.quantity}</span>
                                    <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, size: item.size, quantity: item.quantity + 1 } })}
                                        style={{ width: 36, height: 36, border: 'none', background: 'none', fontSize: 18, cursor: 'pointer' }}>+</button>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item })} style={{ background: 'none', border: 'none', color: '#e63946', cursor: 'pointer', fontSize: 13 }}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div style={{ background: '#f8f9fa', padding: 28, borderRadius: 4, height: 'fit-content', position: 'sticky', top: 84 }}>
                    <h3 style={{ fontFamily: 'DM Sans', fontSize: 18, fontWeight: 700, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #e9ecef' }}>Order Summary</h3>
                    {[['Subtotal', `$${totalPrice.toFixed(2)}`], ['Shipping', shipping === 0 ? 'FREE' : `$${shipping}`], ['Tax (8%)', `$${(totalPrice * 0.08).toFixed(2)}`]].map(([label, val]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 14 }}>
                            <span style={{ color: '#555' }}>{label}</span>
                            <span style={{ fontWeight: 600, color: val === 'FREE' ? '#2a9d8f' : '#1a1a2e' }}>{val}</span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18, marginTop: 20, paddingTop: 16, borderTop: '2px solid #ddd' }}>
                        <span>Total</span>
                        <span>${(totalPrice + shipping + totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    {shipping > 0 && <p style={{ fontSize: 12, color: '#2a9d8f', marginTop: 8 }}>Add ${(50 - totalPrice).toFixed(2)} more for free shipping!</p>}
                    <button className="btn-primary" style={{ width: '100%', padding: '16px', marginTop: 20 }} onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                    <button className="btn-outline" style={{ width: '100%', padding: '14px', marginTop: 10 }} onClick={() => navigate('/shop')}>Continue Shopping</button>
                </div>
            </div>
        </div>
    );
}
