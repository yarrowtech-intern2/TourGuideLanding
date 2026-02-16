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
        py-16 xs:py-20 sm:py-24 lg:py-32
        px-3 xs:px-4 sm:px-6 lg:px-8
      "
    >
      {/* Decorative blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-96 h-96 bg-[#bfae70]/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-[#8c7a3d]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* HEADING */}
        <div className="mb-10 xs:mb-12 sm:mb-16" data-aos="fade-up">
          <h2
            className="
              text-3xl xs:text-4xl md:text-5xl
              font-extrabold
              text-[#2B2B2B]
            "
          >
            Our <span className="text-[#7A6730]">Trusted</span> Partners
          </h2>

          <p className="mt-4 text-sm xs:text-base sm:text-lg text-[#3F3A2F] max-w-3xl mx-auto leading-relaxed">
            We collaborate with top restaurants, cafés, and premium experiences
            to give you the best travel & lifestyle journey.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 120}
              className="
                group
                bg-white/75 backdrop-blur-xl
                rounded-3xl p-6 sm:p-8
                shadow-lg border border-white/60
                transition-all duration-300
                md:hover:-translate-y-2 md:hover:shadow-2xl
                flex flex-col text-left
              "
            >
              <h3 className="text-lg sm:text-xl font-extrabold text-[#2B2B2B]">
                {partner.name}
              </h3>

              <p className="mt-2 text-xs sm:text-sm uppercase font-bold tracking-widest text-[#7A6730]">
                {partner.type}
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#3F3A2F] leading-relaxed flex-grow">
                {partner.description}
              </p>

              {/* small bottom line */}
              <div className="mt-6 h-[2px] w-14 bg-[#7A6730]/50 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
