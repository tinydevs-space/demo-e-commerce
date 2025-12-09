import { useEffect, useState } from "react";
import arrowIcon from "../assets/arrow-diagonal.png";

export default function Hero({ title, desc, bg, showButton = true, subtitle }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero-section relative h-[85vh] overflow-hidden">
      {/* Background image with Ken Burns Effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={bg}
          alt="Hero Background"
          className="w-full h-full object-cover animate-ken-burns"
        />
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>

      {/* Subtle Gold Shimmer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent mix-blend-overlay pointer-events-none"></div>

      {/* Text content at bottom-left */}
      <div className="absolute bottom-12 left-8 md:left-16 z-10 text-white text-left max-w-2xl">
        {subtitle && (
          <p className="text-lg md:text-xl mb-4 uppercase tracking-widest text-[#F5E6D3] animate-fade-in delay-100 font-light">
            {subtitle}
          </p>
        )}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up delay-200 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          {title}
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-lg animate-slide-up delay-300 font-light leading-relaxed">
          {desc}
        </p>

        {showButton && (
          <button className="btn-premium-light text-black text-md px-8 py-4 rounded-full flex items-center gap-3 animate-slide-up delay-400 group">
            <span className="uppercase tracking-wider font-medium">Shop Now</span>
            <img
              src={arrowIcon}
              alt="Arrow Icon"
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce opacity-70 hidden md:block">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
