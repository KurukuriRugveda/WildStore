import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { products } from '../data/products';

export default function Shop() {
    const [params] = useSearchParams();
    const initialCategory = params.get('category') || 'All';
    const searchQuery = params.get('search') || '';

    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [sort, setSort] = useState('default');
    const [priceRange, setPriceRange] = useState(300);

    const filtered = useMemo(() => {
        let result = [...products];
        if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory);
        if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        result = result.filter(p => p.price <= priceRange);
        if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
        if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
        if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
        if (sort === 'newest') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        return result;
    }, [activeCategory, sort, priceRange, searchQuery]);

    return (
        <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
            <div style={{ marginBottom: 32 }}>
                <h1 className="section-title">{searchQuery ? `Results for "${searchQuery}"` : 'Shop All'}</h1>
                <p style={{ color: '#6c757d', fontSize: 14 }}>{filtered.length} products found</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 }}>
                {/* Sidebar Filters */}
                <aside>
                    <div style={{ position: 'sticky', top: 80 }}>
                        <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #e9ecef' }}>Filters</h3>

                        <div style={{ marginBottom: 28 }}>
                            <h4 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12, color: '#555' }}>Category</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {['All', 'Dresses', 'Tops', 'Bottoms', 'Shoes', 'Accessories'].map(cat => (
                                    <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                                        <input type="radio" name="category" checked={activeCategory === cat} onChange={() => setActiveCategory(cat)} style={{ accentColor: '#e63946' }} />
                                        {cat}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: 28 }}>
                            <h4 style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12, color: '#555' }}>Max Price: ${priceRange}</h4>
                            <input type="range" min={30} max={300} value={priceRange} onChange={e => setPriceRange(+e.target.value)} style={{ width: '100%', accentColor: '#e63946' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#aaa', marginTop: 4 }}>
                                <span>$30</span><span>$300</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <p style={{ fontSize: 14, color: '#6c757d' }}>Showing {filtered.length} of {products.length} products</p>
                        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '8px 16px', border: '1px solid #ddd', fontSize: 13, outline: 'none', cursor: 'pointer' }}>
                            <option value="default">Sort: Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
                            <p style={{ fontSize: 48 }}>🔍</p>
                            <p style={{ fontSize: 18, marginTop: 16 }}>No products found</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
                            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}