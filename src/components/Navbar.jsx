import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import accountIcon from "../assets/account.png";
import cartIcon from "../assets/shopping-bag.png";
import menuIcon from "../assets/hamburger.png";
import searchIcon from "../assets/magnifying-glass.png";
import parka1 from "../assets/parka1.jpg";
import shirt1 from "../assets/shirt1.jpg";
import SearchPopup from "./SearchPopup";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItems = [
    {
      id: 1,
      img: parka1,
      name: "Padded Parka Jacket",
      size: "M",
      price: 89,
      quantity: 1,
    },
    {
      id: 2,
      img: shirt1,
      name: "Linen Shirt",
      size: "L",
      price: 120,
      quantity: 2,
    },
  ];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 shadow-md bg-white/95 backdrop-blur-sm' : 'py-4 bg-white'}`}>
      <div className="nav-container">
        {/* Left */}
        <div className="nav-links-left">
          {['Women', 'Men', 'Kids', 'Collections'].map((item) => (
            <Link key={item} to="/products" className="hover-underline-animation relative font-medium text-gray-600 hover:text-black transition-colors">
              {item}
            </Link>
          ))}
        </div>

        {/* Center */}
        <div className="nav-logo transform transition-transform duration-300 hover:scale-105">
          <Link to="/" className="text-3xl tracking-widest font-bold" style={{ fontFamily: 'var(--font-heading)' }}>L&ucirc;mea</Link>
        </div>

        {/* Right */}
        <div className="nav-links-right">
          <div className="nav-search relative flex items-center group">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center bg-gray-100 rounded-full pl-4 pr-10 py-2 text-gray-400 hover:bg-white hover:shadow-sm border border-transparent hover:border-[#D4AF37] transition-all w-32 hover:w-48 group"
            >
              <span className="text-sm">Search</span>
              <img
                src={searchIcon}
                alt="Search"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
              />
            </button>
          </div>

          <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

          {/* Account Button */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsAccountOpen(true);
            }}
            className="hover-scale"
          >
            <img src={accountIcon} alt="Account" className="nav-icon" />
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsCartOpen(true);
            }}
            className="hover-scale relative"
          >
            <img src={cartIcon} alt="Cart" className="nav-icon" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-pulse-soft">
                {totalItems}
              </span>
            )}
          </a>
          <a
            href="#"
            className="nav-link-icon hover-scale"
            onClick={(e) => {
              e.preventDefault();
              setIsSidebarOpen(true);
            }}
          >
            <img src={menuIcon} alt="Menu" className="nav-icon" />
            <span className="hidden md:inline">Menu</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Overlay for all modals */}
      {(isSidebarOpen || isCartOpen || isAccountOpen) && (
        <div
          className="fixed inset-0 glass-overlay z-40 transition-opacity duration-300"
          onClick={() => {
            setIsSidebarOpen(false);
            setIsCartOpen(false);
            setIsAccountOpen(false);
          }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] glass-panel z-50 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col items-start justify-between h-full p-8">
          <button
            className="self-end text-3xl font-light mb-8 hover:rotate-90 transition-transform duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>

          <div className="flex flex-col items-start space-y-8 text-3xl font-light tracking-wide w-full">
            {['Women', 'Men', 'Kids', 'Collections'].map((item, idx) => (
              <Link
                key={item}
                to="/products"
                onClick={() => setIsSidebarOpen(false)}
                className="hover:text-[#D4AF37] transition-colors hover:translate-x-2 duration-300 block w-full"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-start space-y-6 text-lg text-gray-500 mt-auto border-t border-gray-200/50 pt-8 w-full">
            <a href="#" className="hover:text-black transition-colors">Sign In</a>
            <a href="#" className="hover:text-black transition-colors">Contact Us</a>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] glass-panel z-50 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full p-6 sm:p-8">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200/50 pb-4">
            <h2 className="text-2xl sm:text-3xl font-light" style={{ fontFamily: 'var(--font-heading)' }}>Shopping Bag <span className="text-sm text-gray-500 align-top">({totalItems})</span></h2>
            <button
              className="text-2xl sm:text-3xl font-light hover:rotate-90 transition-transform duration-300"
              onClick={() => setIsCartOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 border-b border-gray-100 pb-6 animate-fade-in"
              >
                <div className="relative overflow-hidden rounded-sm group">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-[100px] h-[120px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 flex flex-col space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">&times;</button>
                  </div>
                  <p className="text-sm text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                  <p className="text-md font-medium text-gray-900 mt-2">${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200/50 pt-6 mt-4 bg-white/50 backdrop-blur-sm -mx-6 -mb-6 p-6">
            <div className="flex justify-between mb-4 text-lg font-medium">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4 text-center">Shipping & taxes calculated at checkout</p>
            <button className="btn-premium w-full py-4 text-lg font-medium tracking-wide rounded-sm" onClick={() => navigate("/payment")}>
              CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* Account Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] glass-panel z-50 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isAccountOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full px-6 py-6 sm:px-10 sm:py-8 relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-light" style={{ fontFamily: 'var(--font-heading)' }}>My Account</h2>
            <button
              onClick={() => setIsAccountOpen(false)}
              className="text-2xl sm:text-3xl font-light hover:rotate-90 transition-transform duration-300"
            >
              &times;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <form className="space-y-6">
              {/* Email */}
              <div className="flex flex-col space-y-2 group">
                <label htmlFor="email" className="text-sm text-start font-medium text-gray-600 group-focus-within:text-black transition-colors">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full border-b border-gray-300 px-0 py-3 bg-transparent focus:outline-none focus:border-black transition-colors text-base"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col space-y-2 group">
                <label htmlFor="password" className="text-sm text-start font-medium text-gray-600 group-focus-within:text-black transition-colors">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full border-b border-gray-300 px-0 py-3 bg-transparent focus:outline-none focus:border-black transition-colors text-base"
                  placeholder="Enter your password"
                />
              </div>

              {/* Newsletter + Forgot password */}
              <div className="flex justify-between text-sm pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="accent-[#D4AF37] w-4 h-4" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-gray-500 hover:text-black transition-colors underline decoration-gray-300 hover:decoration-black">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="btn-premium w-full py-4 mt-4 rounded-sm tracking-widest uppercase text-sm font-bold"
              >
                Sign In
              </button>
            </form>


            <div className="my-8 flex items-center justify-center space-x-4">
              <div className="h-px bg-gray-200 w-full"></div>
              <span className="text-gray-400 text-sm whitespace-nowrap">OR LOGIN WITH</span>
              <div className="h-px bg-gray-200 w-full"></div>
            </div>

            <button className="w-full border border-gray-300 py-3 rounded-sm hover:bg-gray-50 flex items-center justify-center space-x-3 transition-colors duration-300 group">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 group-hover:scale-110 transition-transform"
              />
              <span className="text-gray-700 font-medium">Google</span>
            </button>

            <div className="mt-12 text-center text-sm">
              <p className="text-gray-600">New to Luméa?</p>
              <button className="mt-3 w-full border border-black text-black py-4 rounded-sm hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest font-medium text-xs">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Mobile menu (unchanged) */}
      {isOpen && (
        <div className="mobile-links animate-slide-up">
          <Link to="/products" onClick={() => setIsOpen(false)}>Women</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>Men</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>Kids</Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>Collections</Link>
          <div className="border-t border-gray-100 my-2"></div>
          <div className="flex flex-col items-end pr-4">
            <button
              className="py-3 text-gray-600 hover:text-black hover:bg-gray-50 w-full text-right"
              onClick={() => {
                setIsOpen(false);
                setIsAccountOpen(true);
              }}
            >
              Account
            </button>
            <button
              className="py-3 text-gray-600 hover:text-black hover:bg-gray-50 w-full text-right"
              onClick={() => {
                setIsOpen(false);
                setIsCartOpen(true);
              }}
            >
              Cart
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
