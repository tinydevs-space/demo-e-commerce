import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import filterIcon from "../assets/filter-icon.png";
import heroBg2 from "../assets/model2.jpg";
import { products } from "../data/products";
import { useToast } from "../context/ToastContext";

export default function Products() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { addToast } = useToast();

  const handleApplyFilters = (filters) => {
    console.log("Filters applied:", filters);
    addToast("Filters applied successfully!");
  };

  return (
    <div className="products-page w-full">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero
        title="Summer Luxe Collection"
        desc="Effortless elegance and sustainable fashion for the modern trendsetter."
        bg={heroBg2}
        showButton={false}
      />

      {/* Product Section */}
      <section className="products-section px-6 py-16 w-full">
        {/* Filters Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition group"
          >
            <img src={filterIcon} alt="Filters" className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="uppercase tracking-wide text-sm font-medium">Filters</span>
          </button>
        </div>

        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApply={handleApplyFilters}
        />

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="relative group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/product/${product.id}`} className="block w-full overflow-hidden relative">
                {/* Image swap on hover */}
                <div className="aspect-[3/4] w-full relative overflow-hidden bg-gray-100">
                  <img
                    src={product.img1}
                    alt={product.name}
                    className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img
                    src={product.img2}
                    alt={product.name}
                    className="w-full h-full object-cover absolute inset-0 transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Quick Add Button (Demo) */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToast(`Added ${product.name} to cart`);
                    }}
                    className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </Link>

              {/* Text info */}
              <div className="mt-4 px-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-md text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>{product.name}</h3>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>
                <p className="font-light text-gray-500 mt-1">{product.price}</p>

                {/* Color dots (Demo) */}
                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-3 h-3 rounded-full bg-[#D2B48C] border border-gray-200"></span>
                  <span className="w-3 h-3 rounded-full bg-black border border-gray-200"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
