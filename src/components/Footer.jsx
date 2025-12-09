export default function Footer() {
  return (
   <footer className="footer w-full bg-[#ffffff] text-[#333333] border-t border-gray-200 mt-20">
        <div className="w-full px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 tracking-tight">Luméa</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Effortless elegance, enduring style.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#1A1A1A]">Shop</h3>
          <ul className="space-y-6 text-sm text-gray-600">
            <li><a href="#" className="hover:text-[#000000] transition-colors">Streetwear</a></li>
            <li><a href="#" className="hover:text-[#000000] transition-colors">Activewear</a></li>
            <li><a href="#" className="hover:text-[#000000] transition-colors">Techwear</a></li>
            <li><a href="#" className="hover:text-[#000000] transition-colors">Accessories</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#1A1A1A]">Customer Care</h3>
          <ul className="space-y-6 text-sm text-gray-600">
            <li><a href="#" className="hover:text-[#000000] transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-[#000000] transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-[#000000] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#000000] transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter / Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#1A1A1A]">Stay Connected</h3>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to our newsletter for exclusive updates and offers.
          </p>
          <form className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#D4AF37] text-sm"
            />
            <button
              type="submit"
              className="bg-[#1A1A1A] text-white px-4 py-2 rounded-full hover:bg-[#000000] hover:text-black transition"
            >
              Join
            </button>
          </form>
          <div className="flex space-x-4 mt-5">
            <a href="#" aria-label="Instagram" className="hover:text-[#000000] transition-colors">
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#000000] transition-colors">
              <i className="fab fa-twitter text-lg"></i>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-[#000000] transition-colors">
              <i className="fab fa-facebook text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Luméa. All rights reserved.
      </div>
    </footer>
  );
}
