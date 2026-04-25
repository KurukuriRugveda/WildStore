import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
    const navigate = useNavigate();
    const orderNum = '#ANO' + Math.floor(Math.random() * 90000 + 10000);
    return (
        <div className="container" style={{ paddingTop: 80, paddingBottom: 80, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#2a9d8f', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 40 }}>✓</div>
            <h1 style={{ fontSize: 36, marginBottom: 12 }}>Order Confirmed!</h1>
            <p style={{ color: '#6c757d', fontSize: 16, marginBottom: 8 }}>Thank you for shopping with Anon Fashion.</p>
            <p style={{ color: '#555', marginBottom: 32 }}>Your order <strong>{orderNum}</strong> has been placed and will be delivered within 3–5 business days.</p>
            <div style={{ background: '#f8f9fa', padding: '24px 32px', borderRadius: 4, marginBottom: 32, fontSize: 14, lineHeight: 2, textAlign: 'left' }}>
                <div>📦 Estimated delivery: <strong>3–5 business days</strong></div>
                <div>📧 Confirmation email sent to your inbox</div>
                <div>📱 SMS updates will keep you informed</div>
            </div>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <button className="btn-primary" onClick={() => navigate('/shop')}>Continue Shopping</button>
                <button className="btn-outline" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        </div>
    );
}