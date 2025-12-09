import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import visaLogo from "../assets/visa-logo.png";
import mastercardLogo from "../assets/mastercard-logo.png";
import fpxLogo from "../assets/fpx-logo.png";
import shirt1 from "../assets/shirt1.jpg";
import prod1a from "../assets/prod1a.jpeg";

export default function Payment() {
  const cartItems = [
    { id: 1, name: "Linen Overshirt", price: 520, img: shirt1, qty: 1, size: "M" },
    { id: 2, name: "Wide Leg Trousers", price: 640, img: prod1a, qty: 1, size: "32" },
  ];

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate processing
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.disabled = true;

    setTimeout(() => {
      alert(`Payment confirmed via ${paymentMethod.toUpperCase()}`);
      btn.innerText = originalText;
      btn.disabled = false;
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-900 ">
      {/* Navbar */}
      <Navbar />

      {/* Payment Section */}
      <section className="payment-section flex-1 w-full py-24 md:py-32 px-4 md:px-8 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light mb-12 text-center animate-fade-in" style={{ fontFamily: 'var(--font-heading)' }}>
            Checkout
          </h1>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left side – Cart summary */}
            <div className="flex-1 animate-slide-up delay-100">
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-light tracking-wide">Order Summary</h2>
                <span className="text-gray-500">{cartItems.length} Items</span>
              </div>

              <div className="space-y-8">
                {cartItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex gap-6 group"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="w-32 h-40 overflow-hidden rounded-sm relative">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg text-gray-900">{item.name}</h3>
                          <p className="text-gray-900 font-medium">RM {item.price}</p>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Size: {item.size}</p>
                        <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                      </div>

                      <button className="text-left text-xs text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider font-medium w-fit">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side – Payment Form */}
            <div className="w-full lg:w-[480px] flex-shrink-0 animate-slide-up delay-200">
              <div className="bg-white p-8 md:p-10 shadow-xl rounded-sm border border-gray-100 sticky top-32">
                <h2 className="text-2xl font-light mb-8 tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                  Payment Details
                </h2>

                <div className="space-y-4 mb-10 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (6%)</span>
                    <span>RM {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 my-4"></div>
                  <div className="flex justify-between text-xl font-medium text-gray-900">
                    <span>Total</span>
                    <span>RM {total.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-3 gap-3">
                    <label className={`cursor-pointer border rounded-md p-3 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-400'}`}>
                      <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="hidden" />
                      <div className="flex gap-1">
                        <div className="w-6 h-4 bg-gray-800 rounded-sm"></div>
                        <div className="w-6 h-4 bg-red-600 rounded-sm"></div>
                      </div>
                      <span className="text-xs font-medium">Card</span>
                    </label>
                    <label className={`cursor-pointer border rounded-md p-3 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'fpx' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-400'}`}>
                      <input type="radio" name="payment" value="fpx" checked={paymentMethod === "fpx"} onChange={() => setPaymentMethod("fpx")} className="hidden" />
                      <span className="font-bold text-gray-700 text-xs">FPX</span>
                      <span className="text-xs font-medium">Banking</span>
                    </label>
                    <label className={`cursor-pointer border rounded-md p-3 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'ewallet' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-400'}`}>
                      <input type="radio" name="payment" value="ewallet" checked={paymentMethod === "ewallet"} onChange={() => setPaymentMethod("ewallet")} className="hidden" />
                      <span className="font-bold text-blue-600 text-xs">PAY</span>
                      <span className="text-xs font-medium">E-Wallet</span>
                    </label>
                  </div>

                  {/* Card Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-5 animate-fade-in">
                      <div className="group">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Cardholder Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="JOHN DOE"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors placeholder-gray-300"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="number"
                            placeholder="0000 0000 0000 0000"
                            value={form.number}
                            onChange={handleChange}
                            maxLength="19"
                            className="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors placeholder-gray-300"
                            required
                          />
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 opacity-50">
                            <img src={visaLogo} alt="Visa" className="h-4" />
                            <img src={mastercardLogo} alt="Mastercard" className="h-4" />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-6">
                        <div className="flex-1 group">
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Expiry</label>
                          <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            value={form.expiry}
                            onChange={handleChange}
                            maxLength="5"
                            className="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors placeholder-gray-300"
                            required
                          />
                        </div>
                        <div className="flex-1 group">
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">CVV</label>
                          <input
                            type="password"
                            name="cvv"
                            placeholder="123"
                            value={form.cvv}
                            onChange={handleChange}
                            maxLength="3"
                            className="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors placeholder-gray-300"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#1A1A1A] text-white py-4 mt-4 hover:bg-[#333] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 uppercase tracking-widest text-sm font-bold rounded-sm"
                  >
                    Confirm Payment
                  </button>

                  <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Secure SSL Encrypted Transaction
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
