import React from 'react';

export default function StarRating({ rating, reviews }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ color: '#f4a261', fontSize: 14 }}>
                {[1, 2, 3, 4, 5].map(s => (
                    <span key={s}>{s <= Math.round(rating) ? '★' : '☆'}</span>
                ))}
            </div>
            {reviews && <span style={{ fontSize: 12, color: '#6c757d' }}>({reviews})</span>}
        </div>
    );
}