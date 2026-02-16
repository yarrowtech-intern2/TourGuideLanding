import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGlobe, FaUsers, FaPlane, FaMapMarkerAlt } from "react-icons/fa";

const services = [
  {
    icon: <FaGlobe className="text-2xl sm:text-3xl text-white" />,
    title: "Tours",
    description:
      "Tours from all over India including cultural heritage sites, hill stations, beach destinations, and city explorations designed for all types of travelers.",
  },
  {
    icon: <FaUsers className="text-2xl sm:text-3xl text-white" />,
    title: "Activities",
    description:
      "Discounted fun activities such as trekking, rafting, camping, sightseeing, local experiences, and guided adventures.",
  },
  {
    icon: <FaPlane className="text-2xl sm:text-3xl text-white" />,
    title: "Adventure Travel",
    description:
      "From mountain peaks to deep oceans — thrill seekers are welcome here with curated adventure experiences across India.",
  },
  {
    icon: <FaMapMarkerAlt className="text-2xl sm:text-3xl text-white" />,
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
        py-16 xs:py-20 sm:py-24 lg:py-32
        px-3 xs:px-4 sm:px-6 lg:px-8
      "
    >
      {/* Decorative blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-[#bfae70]/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-[#8c7a3d]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-10 xs:mb-12 sm:mb-16" data-aos="fade-up">
          <h2
            className="
              text-3xl xs:text-4xl md:text-5xl
              font-extrabold
              text-[#2B2B2B]
            "
          >
            Our <span className="text-[#7A6730]">Services</span>
          </h2>

          <p className="mt-4 text-sm xs:text-base sm:text-lg text-[#3F3A2F] max-w-3xl mx-auto leading-relaxed">
            We provide tours, activities, and travel planning support to make
            your journey smoother, safer, and more memorable.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 120}
              className="
                group
                bg-white/75 backdrop-blur-xl
                p-6 sm:p-8 rounded-3xl
                shadow-lg
                border border-white/60
                transition-all duration-300
                md:hover:-translate-y-2 md:hover:shadow-2xl
                flex flex-col items-center text-center
              "
            >
              {/* ICON */}
              <div
                className="
                  flex items-center justify-center
                  w-14 h-14 sm:w-16 sm:h-16
                  bg-gradient-to-br from-[#7A6730] to-[#2B2B2B]
                  rounded-2xl mb-5
                  shadow-md
                  transition-all duration-300
                  md:group-hover:scale-110
                "
              >
                {service.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#2B2B2B]">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm sm:text-base text-[#3F3A2F] leading-relaxed">
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
