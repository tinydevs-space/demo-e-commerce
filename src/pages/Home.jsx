import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import GridSection from "../components/GridSection.jsx";
import Footer from "../components/Footer.jsx";
import ThirdSection from "../components/Banner.jsx";
import heroBg from "../assets/model1.jpg"; // make sure you import the background image

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero
        bg={heroBg}
        subtitle="Latest In"
        title="Summer Luxe Collection"
        desc="Effortless elegance and sustainable fashion for the modern trendsetter."
        showButton={true}
      />
      <GridSection />
      <ThirdSection />
      <Footer />
    </>
  );
}
