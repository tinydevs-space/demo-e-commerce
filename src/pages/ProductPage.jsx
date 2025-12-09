import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/products';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Beige');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            setCurrentImageIndex(0);
        }
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-36 pb-20">
                    <p>Loading product...</p>
                </main>
                <Footer />
            </div>
        );
    }

    const images = [product.img1, product.img2];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Parse price to number for calculation (assuming format "RM149")
    const priceValue = parseFloat(product.price.replace(/[^0-9.]/g, ''));

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main className="product-main flex-grow pt-36 pb-20 px-6 md:px-12 lg:px-24 bg-white">
                <div className="max-w-7xl mx-auto w-full">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Breadcrumbs */}
                        <div className="lg:col-span-2">
                            <nav className="text-sm text-gray-400 mb-2" aria-label="Breadcrumb">
                                <ol className="list-none p-0 inline-flex">
                                    <li className="flex items-center">
                                        <Link to="/" className="hover:text-black transition-colors">Home</Link>
                                        <span className="mx-2">/</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Link to="/products" className="hover:text-black transition-colors">Women</Link>
                                        <span className="mx-2">/</span>
                                    </li>
                                    <li className="text-black" aria-current="page">{product.name}</li>
                                </ol>
                            </nav>
                        </div>

                        {/* Image Section */}
                        <div className="flex flex-col gap-6">
                            <div className="w-full aspect-[3/4] bg-gray-50 overflow-hidden relative group">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-medium tracking-wider uppercase z-10">
                                    Best Seller
                                </div>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:scale-110"
                                    aria-label="Previous image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:scale-110"
                                    aria-label="Next image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-4">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-20 h-24 overflow-hidden border transition-all duration-200 ${currentImageIndex === idx ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-col pt-4">
                            <div className="mb-10">
                                <h1 className="text-4xl md:text-5xl text-gray-900 mb-4 font-normal" style={{ fontFamily: 'var(--font-heading)' }}>{product.name}</h1>
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl text-gray-900 font-light" style={{ fontFamily: 'var(--font-body)' }}>{product.price}</p>
                                    <div className="flex text-yellow-500 text-sm">
                                        {'★'.repeat(Math.round(product.rating || 5))} <span className="text-gray-400 ml-2 text-xs">({product.reviews || 42} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 w-full mb-10"></div>

                            <p className="text-gray-600 leading-relaxed mb-10 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                                {product.description}
                            </p>

                            {/* Variations */}
                            <div className="space-y-10 mb-12">
                                {/* Colors */}
                                <div>
                                    <span className="block text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Color: <span className="text-gray-500 font-normal normal-case">{selectedColor}</span></span>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => setSelectedColor('Beige')}
                                            className={`w-10 h-10 rounded-full bg-[#D2B48C] border-2 ring-1 ring-offset-2 ${selectedColor === 'Beige' ? 'border-white ring-black' : 'border-transparent ring-transparent hover:ring-gray-300'} transition-all`}
                                            aria-label="Select Beige"
                                        ></button>
                                        <button
                                            onClick={() => setSelectedColor('Black')}
                                            className={`w-10 h-10 rounded-full bg-black border-2 ring-1 ring-offset-2 ${selectedColor === 'Black' ? 'border-white ring-black' : 'border-transparent ring-transparent hover:ring-gray-300'} transition-all`}
                                            aria-label="Select Black"
                                        ></button>
                                        <button
                                            onClick={() => setSelectedColor('Navy')}
                                            className={`w-10 h-10 rounded-full bg-[#1a2b4b] border-2 ring-1 ring-offset-2 ${selectedColor === 'Navy' ? 'border-white ring-black' : 'border-transparent ring-transparent hover:ring-gray-300'} transition-all`}
                                            aria-label="Select Navy"
                                        ></button>
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="block text-sm font-medium text-gray-900 uppercase tracking-wide">Size: <span className="text-gray-500 font-normal normal-case">{selectedSize}</span></span>
                                        <button className="text-xs text-gray-500 underline hover:text-black">Size Guide</button>
                                    </div>
                                    <div className="grid grid-cols-5 gap-3">
                                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`h-12 flex items-center justify-center border text-sm transition-all duration-200 ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-900 hover:border-black'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-5 mb-12">
                                <div className="flex border border-gray-300 w-full sm:w-32 h-14 items-center">
                                    <button className="w-10 h-full hover:bg-gray-50 text-gray-500 transition-colors" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                    <span className="flex-1 text-center font-medium">{quantity}</span>
                                    <button className="w-10 h-full hover:bg-gray-50 text-gray-500 transition-colors" onClick={() => setQuantity(quantity + 1)}>+</button>
                                </div>
                                <button className="flex-1 bg-black text-white h-14 uppercase tracking-widest hover:bg-[#333] transition-colors text-sm font-medium flex items-center justify-center gap-2">
                                    <span>Add to Cart</span>
                                    <span className="w-1 h-1 bg-white rounded-full mx-1"></span>
                                    <span>RM{(priceValue * quantity).toFixed(2)}</span>
                                </button>
                            </div>

                            {/* Additional Info Accordion */}
                            <div className="border-t border-gray-200">
                                {['Description', 'Fabric & Care', 'Shipping & Returns'].map((item, idx) => (
                                    <div key={idx} className="border-b border-gray-200">
                                        <button className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors group">
                                            <span className="text-sm font-medium uppercase tracking-wide text-gray-900">{item}</span>
                                            <span className="text-gray-400 group-hover:text-black text-xl font-light">+</span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductPage;
