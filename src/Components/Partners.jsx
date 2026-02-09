import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const partners = [
  {
    name: "Miss Ginko",
    type: "Restaurant",
    description:
      "An elegant dining destination offering thoughtfully crafted dishes in a refined, contemporary setting.",
  },
  {
    name: "Scoop",
    type: "Restaurant",
    description:
      "A modern beverage and dessert space known for creative flavors and a relaxed, vibrant atmosphere.",
  },
  {
    name: "New Empire",
    type: "Bar & Cinema",
    description:
      "A unique fusion of cinema and bar culture, delivering immersive entertainment with premium food and drinks.",
  },
  {
    name: "Gondhoraj",
    type: "Restaurant",
    description:
      "A culinary experience inspired by authentic flavors, blending tradition with modern presentation.",
  },
];

const Partners = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <section
      id="partners"
      className="
        relative w-full overflow-hidden
        bg-gradient-to-br from-[#f5f2dc] via-[#e6e2c8] to-[#d7d1b0]
        py-20 sm:py-24 lg:py-32
        px-4 sm:px-6 lg:px-8
      "
    >
      {/* Decorative blur (CLIPPED) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-96 h-96 bg-[#bfae70]/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-[#8c7a3d]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* HEADING */}
        <h2
          data-aos="fade-up"
          className="
            text-3xl sm:text-4xl md:text-5xl
            font-extrabold mb-12
            text-[#2B2B2B]
          "
        >
          Our <span className="text-[#7A6730]">Trusted</span> Partners
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 120}
              className="
                group
                bg-white/70 backdrop-blur-xl
                rounded-2xl p-6 sm:p-8
                shadow-lg
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-2xl
                flex flex-col text-left
              "
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#2B2B2B]">
                {partner.name}
              </h3>

              <p className="mt-2 text-xs sm:text-sm uppercase font-semibold tracking-widest text-[#7A6730]">
                {partner.type}
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#3F3A2F] leading-relaxed flex-grow">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
