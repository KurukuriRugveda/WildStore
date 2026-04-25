import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
    const { cart, totalPrice, dispatch } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', zip: '', country: 'India', card: '', expiry: '', cvv: '' });

    const shipping = totalPrice > 50 ? 0 : 9.99;
    const total = (totalPrice + shipping + totalPrice * 0.08).toFixed(2);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleOrder = () => {
        dispatch({ type: 'CLEAR_CART' });
        navigate('/order-success');
    };

    const inputStyle = { width: '100%', padding: '12px 14px', border: '1.5px solid #e9ecef', fontSize: 14, outline: 'none', borderRadius: 2, fontFamily: 'DM Sans, sans-serif' };

    return (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
            <h1 className="section-title" style={{ marginBottom: 32 }}>Checkout</h1>

            {/* Steps */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 40, borderBottom: '2px solid #f0f0f0' }}>
                {['Shipping', 'Payment', 'Review'].map((s, i) => (
                    <div key={s} onClick={() => step > i + 1 && setStep(i + 1)} style={{ padding: '12px 28px', fontWeight: step === i + 1 ? 700 : 400, borderBottom: step === i + 1 ? '2px solid #e63946' : '2px solid transparent', color: step === i + 1 ? '#e63946' : step > i + 1 ? '#1a1a2e' : '#aaa', cursor: step > i + 1 ? 'pointer' : 'default', marginBottom: -2, fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        <span style={{ marginRight: 8, background: step >= i + 1 ? (step === i + 1 ? '#e63946' : '#2a9d8f') : '#ddd', color: 'white', borderRadius: '50%', width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{step > i + 1 ? '✓' : i + 1}</span>
                        {s}
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40 }}>
                <div>
                    {step === 1 && (
                        <div style={{ display: 'grid', gap: 16 }}>
                            <h3 style={{ fontFamily: 'DM Sans', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Shipping Information</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div><label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Full Name</label><input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" style={inputStyle} /></div>
                                <div><label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Email</label><input name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" style={inputStyle} /></div>
                            </div>
                            <div><label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Phone</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 xxxxx xxxxx" style={inputStyle} /></div>
                            <div><label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Address</label><input name="address" value={form.address} onChange={handleChange} placeholder="Street address, apartment, etc." style={inputStyle} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                                <div><label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>City</label><input name="city" value={form.city} onChange={handleChange} placeholder="City" style={inputStyle} /></div>
                                <div><label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>ZIP</label><input name="zip" value={form.zip} onChange={handleChange} placeholder="500001" style={inputStyle} /></div>
                                <div><label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Country</label>
                                    <select name="country" value={form.country} onChange={handleChange} style={{ ...inputStyle }}>
                                        {['India', 'USA', 'UK', 'UAE', 'Canada'].map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => setStep(2)}>Continue to Payment →</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div style={{ display: 'grid', gap: 16 }}>
                            <h3 style={{ fontFamily: 'DM Sans', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Payment Details</h3>
                            <div><label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Card Number</label><input name="card" value={form.card} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength={19} style={inputStyle} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                <div><label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Expiry</label><input name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" style={inputStyle} /></div>
                                <div><label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>CVV</label><input name="cvv" value={form.cvv} onChange={handleChange} placeholder="•••" maxLength={3} style={inputStyle} /></div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, padding: '16px', background: '#f8f9fa', borderRadius: 4, fontSize: 13, color: '#555' }}>🔒 Your payment is secured with 256-bit SSL encryption</div>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                                <button className="btn-primary" onClick={() => setStep(3)}>Review Order →</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h3 style={{ fontFamily: 'DM Sans', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Review Your Order</h3>
                            {cart.map(item => (
                                <div key={`${item.id}-${item.size}`} style={{ display: 'flex', gap: 16, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' }}>
                                    <img src={item.image} alt={item.name} style={{ width: 70, height: 90, objectFit: 'cover', borderRadius: 3 }} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 500, marginBottom: 4 }}>{item.name}</p>
                                        <p style={{ fontSize: 13, color: '#888' }}>Size: {item.size} &nbsp;·&nbsp; Qty: {item.quantity}</p>
                                    </div>
                                    <p style={{ fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                                <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                                <button className="btn-primary" style={{ flex: 1, padding: '16px' }} onClick={handleOrder}>Place Order 🎉</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div style={{ background: '#f8f9fa', padding: 24, borderRadius: 4, height: 'fit-content', position: 'sticky', top: 84 }}>
                    <h4 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Order Summary</h4>
                    {[['Items', `$${totalPrice.toFixed(2)}`], ['Shipping', shipping === 0 ? 'FREE' : `$${shipping}`], ['Tax (8%)', `$${(totalPrice * 0.08).toFixed(2)}`]].map(([l, v]) => (
                        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, color: '#555' }}>
                            <span>{l}</span><span style={{ fontWeight: 500 }}>{v}</span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18, marginTop: 16, paddingTop: 14, borderTop: '2px solid #ddd' }}>
                        <span>Total</span><span>${total}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}