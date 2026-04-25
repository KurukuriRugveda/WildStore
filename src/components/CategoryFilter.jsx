import React from 'react';
import { categories } from '../data/products';

export default function CategoryFilter({ active, onChange }) {
    return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {categories.map(cat => (
                <button key={cat} onClick={() => onChange(cat)} style={{
                    padding: '8px 20px', border: '1.5px solid', fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.2s', borderRadius: 2, textTransform: 'uppercase', letterSpacing: 0.5,
                    borderColor: active === cat ? '#e63946' : '#ddd',
                    background: active === cat ? '#e63946' : 'white',
                    color: active === cat ? 'white' : '#555',
                }}>{cat}</button>
            ))}
        </div>
    );
}