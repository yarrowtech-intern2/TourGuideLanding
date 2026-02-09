import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGlobe, FaUsers, FaPlane, FaCamera } from "react-icons/fa";

const services = [
  {
    icon: <FaGlobe className="text-3xl sm:text-4xl text-white" />,
    title: "Tours",
    description:
      "Tours from all over India including cultural heritage sites, hill stations, beach destinations, and city explorations designed for all types of travelers.",
  },
  {
    icon: <FaUsers className="text-3xl sm:text-4xl text-white" />,
    title: "Activities",
    description:
      "Discounted fun activities such as trekking, rafting, camping, sightseeing, local experiences, and guided adventures.",
  },
  {
    icon: <FaPlane className="text-3xl sm:text-4xl text-white" />,
    title: "Adventure Travel",
    description:
      "From mountain peaks to deep oceans — thrill seekers are welcome here with curated adventure experiences across India.",
  },
  {
    icon: <FaCamera className="text-3xl sm:text-4xl text-white" />,
    title: "Maps",
    description:
      "Smart maps for easier navigation, nearby attractions, routes, and travel planning during your journey.",
  },
];

const Services = () => {
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
      id="services"
      className="
        relative w-full overflow-hidden
        bg-gradient-to-br
        from-[#f5f2dc]
        via-[#e6e2c8]
        to-[#d7d1b0]
        py-20 sm:py-24 lg:py-32
        px-4 sm:px-6 lg:px-8
      "
    >
      {/* Decorative blur (CLIPPED) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-[#bfae70]/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-[#8c7a3d]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* HEADING */}
        <h2
          data-aos="fade-up"
          className="
            text-3xl sm:text-4xl md:text-5xl
            font-extrabold text-center mb-12 sm:mb-16
            text-[#2B2B2B]
          "
        >
          Our <span className="text-[#7A6730]">Services</span>
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 120}
              className="
                group
                bg-white/70 backdrop-blur-xl
                p-6 sm:p-8 rounded-2xl
                shadow-lg
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-2xl
                flex flex-col items-center text-center
                min-h-[320px]
              "
            >
              {/* ICON */}
              <div
                className="
                  flex items-center justify-center
                  w-14 h-14 sm:w-16 sm:h-16
                  bg-gradient-to-br from-[#7A6730] to-[#2B2B2B]
                  rounded-full mb-5
                  shadow-md
                "
              >
                {service.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#2B2B2B]">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  text-sm sm:text-base
                  text-[#3F3A2F]
                  leading-relaxed
                  flex-grow
                  line-clamp-4
                "
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
