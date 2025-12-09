import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Payment from "./pages/Payment";
import ScrollToTop from "./components/ScrollToTop";
import { ToastProvider } from "./context/ToastContext";
import "./App.css";

function App() {
  return (
    <ToastProvider>
      <ScrollToTop />
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Products page */}
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Payment page */}
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
