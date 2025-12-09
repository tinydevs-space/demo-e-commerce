import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from "../assets/magnifying-glass.png";

export default function SearchPopup({ isOpen, onClose }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Popular searches demo data
    const popularSearches = ['Summer Dress', 'Linen Shirt', 'Wide Leg Trousers', 'Accessories'];
    const trendingCategories = [
        { name: 'New Arrivals', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Best Sellers', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop' },
        { name: 'Sale', img: 'https://images.unsplash.com/photo-1550614000-4b9519e02d48?q=80&w=1000&auto=format&fit=crop' }
    ];

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query)}`);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex flex-col">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-white/95 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Content */}
            <div className="relative w-full max-w-4xl mx-auto px-6 pt-24 animate-slide-up">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-6 md:right-0 text-4xl font-light hover:rotate-90 transition-transform duration-300"
                >
                    &times;
                </button>

                {/* Search Input */}
                <form onSubmit={handleSearch} className="relative mb-16">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for products, brands, and more..."
                        className="w-full text-2xl md:text-4xl font-light border-b-2 border-gray-200 py-4 bg-transparent focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-gray-300"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    />
                    <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2">
                        <img src={searchIcon} alt="Search" className="w-8 h-8 opacity-50 hover:opacity-100 transition-opacity" />
                    </button>
                </form>

                {/* Suggestions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Popular Searches */}
                    <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-6">Popular Searches</h3>
                        <div className="flex flex-wrap gap-3">
                            {popularSearches.map(term => (
                                <button
                                    key={term}
                                    onClick={() => {
                                        setQuery(term);
                                        navigate(`/products?search=${encodeURIComponent(term)}`);
                                        onClose();
                                    }}
                                    className="px-4 py-2 bg-gray-50 hover:bg-black hover:text-white transition-colors rounded-full text-sm"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Trending Categories */}
                    <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-6">Trending Now</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {trendingCategories.map(cat => (
                                <div
                                    key={cat.name}
                                    className="group cursor-pointer"
                                    onClick={() => {
                                        navigate('/products');
                                        onClose();
                                    }}
                                >
                                    <div className="aspect-square overflow-hidden rounded-sm mb-2 relative">
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img
                                            src={cat.img}
                                            alt={cat.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <p className="text-sm font-medium text-center group-hover:underline">{cat.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
