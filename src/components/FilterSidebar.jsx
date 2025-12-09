import React, { useState } from 'react';

export default function FilterSidebar({ isOpen, onClose, onApply }) {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const categories = ['Jackets', 'Shirts', 'Pants', 'Accessories', 'Dresses'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = [
        { name: 'Beige', hex: '#D2B48C' },
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Navy', hex: '#1a2b4b' },
        { name: 'Olive', hex: '#556B2F' }
    ];

    const toggleSelection = (item, list, setList) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const handleApply = () => {
        onApply({
            priceRange,
            categories: selectedCategories,
            sizes: selectedSizes,
            colors: selectedColors
        });
        onClose();
    };

    const clearAll = () => {
        setPriceRange([0, 1000]);
        setSelectedCategories([]);
        setSelectedSizes([]);
        setSelectedColors([]);
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Sidebar Panel */}
            <div className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white z-50 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-2xl font-light" style={{ fontFamily: 'var(--font-heading)' }}>Filters</h2>
                        <button onClick={onClose} className="text-2xl hover:rotate-90 transition-transform duration-300">&times;</button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10">

                        {/* Categories */}
                        <div>
                            <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-gray-900">Category</h3>
                            <div className="space-y-3">
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-black border-black' : 'border-gray-300 group-hover:border-gray-500'}`}>
                                            {selectedCategories.includes(cat) && <span className="text-white text-xs">✓</span>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => toggleSelection(cat, selectedCategories, setSelectedCategories)}
                                        />
                                        <span className={`text-sm transition-colors ${selectedCategories.includes(cat) ? 'text-black font-medium' : 'text-gray-600 group-hover:text-black'}`}>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-gray-900">Price Range</h3>
                            <div className="px-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                />
                                <div className="flex justify-between mt-2 text-sm text-gray-600">
                                    <span>RM 0</span>
                                    <span>RM {priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-gray-900">Size</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => toggleSelection(size, selectedSizes, setSelectedSizes)}
                                        className={`h-10 border text-sm transition-all duration-200 ${selectedSizes.includes(size) ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:border-black'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div>
                            <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-gray-900">Color</h3>
                            <div className="flex flex-wrap gap-3">
                                {colors.map(color => (
                                    <button
                                        key={color.name}
                                        onClick={() => toggleSelection(color.name, selectedColors, setSelectedColors)}
                                        className={`w-8 h-8 rounded-full border border-gray-200 relative transition-transform hover:scale-110 ${selectedColors.includes(color.name) ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    >
                                        {color.name === 'White' && <span className="sr-only">White</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-100 p-6 bg-white space-y-3">
                        <button
                            onClick={handleApply}
                            className="w-full bg-black text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-[#333] transition-colors"
                        >
                            Apply Filters
                        </button>
                        <button
                            onClick={clearAll}
                            className="w-full text-gray-500 text-sm hover:text-black transition-colors underline decoration-gray-300 hover:decoration-black"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
