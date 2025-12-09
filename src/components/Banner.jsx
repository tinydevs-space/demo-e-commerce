import banner1 from "../assets/banner1.jpg";

export default function ThirdSection() {
  return (
    <section className="third-section relative w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={banner1}
        alt="Lookbook Banner"
        className="section-bg"
      />    

      {/* Overlay (optional, can remove or adjust opacity) */}
      <div className="absolute inset-0 bg-white opacity-30"></div>

      {/* Content */}
      <div className="relative text-center text-black px-4">
        <h2 className="text-4xl font-light mb-4 tracking-wide">
          Elevate the Everyday
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-6 font-light">
          Discover effortless silhouettes designed for the modern soul.
        </p>
        <a
          href="#"
          className="inline-block text-black relative group transition-transform duration-300"
        >
          <span className="inline-block text-xl transform transition-transform duration-300 group-hover:scale-110">
            Explore the Lookbook
          </span>
          <span className="block h-[1px] bg-black w-full transition-all duration-300 group-hover:w-2/3 mx-auto"></span>
        </a>
      </div>
    </section>
  );
}
