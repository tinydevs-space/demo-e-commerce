import { Link } from "react-router-dom";
import card1 from "../assets/card1.jpeg";
import card2 from "../assets/card2.jpeg";
import card3 from "../assets/card3.jpeg";
import card4 from "../assets/card4.jpeg";

export default function SecondSection() {
  const cards = [
    { img: card1, title: "Streetwear", desc: "Effortless style with an urban edge." },
    { img: card2, title: "Summer Jackets", desc: "Breezy layers for warm, sunny days." },
    { img: card3, title: "Activewear", desc: "Move freely, look effortlessly sharp." },
    { img: card4, title: "Techwear", desc: "Modern utility meets cutting-edge design." },
  ];

  return (
    <section className="second-section py-20 px-6 md:px-12 w-full bg-[#F8F6F0]">
      <h2 className="text-4xl md:text-5xl mt-5 mb-16 text-center text-gray-900 font-light tracking-tight animate-fade-in" style={{ fontFamily: 'var(--font-heading)' }}>
        Explore Our Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1600px] mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <Link to="/products" className="relative group block overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                loading="lazy"
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Stylish Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                <div className="border border-white/60 px-6 py-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-white text-lg font-light uppercase tracking-widest">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>

            <div className="p-5 text-center">
              <h3 className="font-medium text-xl mb-2 text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>{card.title}</h3>
              <p className="text-gray-500 text-sm font-light">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
