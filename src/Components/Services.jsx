import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGlobe, FaUsers, FaPlane, FaMapMarkerAlt } from "react-icons/fa";

const SERVICES = [
  {
    Icon: FaGlobe,
    title: "Tours",
    description:
      "Tours from all over India including cultural heritage sites, hill stations, beach destinations, and city explorations designed for all types of travelers.",
  },
  {
    Icon: FaUsers,
    title: "Activities",
    description:
      "Discounted fun activities such as trekking, rafting, camping, sightseeing, local experiences, and guided adventures.",
  },
  {
    Icon: FaPlane,
    title: "Adventure Travel",
    description:
      "From mountain peaks to deep oceans — thrill seekers are welcome here with curated adventure experiences across India.",
  },
  {
    Icon: FaMapMarkerAlt,
    title: "Maps",
    description:
      "Smart maps for easier navigation, nearby attractions, routes, and travel planning during your journey.",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out-cubic", once: true, offset: 80 });
  }, []);

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(135deg, #f5f2dc 0%, #e6e2c8 50%, #d7d1b0 100%)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 -right-24 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(191,174,112,0.25) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(140,122,61,0.2) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14 sm:mb-16" data-aos="fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
            <span className="text-[#7A6730] text-[11px] font-medium tracking-[0.22em] uppercase">
              What We Offer
            </span>
            <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
          </div>

          <h2
            className="font-extrabold text-[#2B2B2B] leading-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            Our{" "}
            <span className="relative inline-block text-[#7A6730]">
              Services
              <span
                className="absolute left-0 -bottom-1 w-full h-0.5 rounded"
                style={{ background: "linear-gradient(90deg, #7A6730, transparent)" }}
                aria-hidden="true"
              />
            </span>
          </h2>

          <p
            className="mt-5 text-[#3F3A2F] leading-relaxed max-w-2xl mx-auto"
            style={{ fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)" }}
          >
            We provide tours, activities, and travel planning support to make
            your journey smoother, safer, and more memorable.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {SERVICES.map(({ Icon, title, description }, idx) => (
            <div
              key={title}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="group relative flex flex-col items-center text-center rounded-2xl p-7 sm:p-9 border transition-all duration-300 md:hover:-translate-y-2 md:hover:shadow-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(18px)",
                borderColor: "rgba(255,255,255,0.85)",
                boxShadow: "0 4px 28px rgba(0,0,0,0.07)",
              }}
            >
              {/* Top accent bar on hover */}
              <span
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, transparent, #7A6730, transparent)" }}
                aria-hidden="true"
              />

              {/* Icon */}
              <div
                className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-md transition-transform duration-300 md:group-hover:scale-110"
                style={{ background: "linear-gradient(135deg, #7A6730 0%, #2B2B2B 100%)" }}
              >
                <Icon className="text-2xl sm:text-3xl text-white" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-[#2B2B2B] mb-3">
                {title}
              </h3>

              {/* Divider */}
              <div
                className="w-8 h-0.5 rounded mb-4"
                style={{ background: "linear-gradient(90deg, #7A6730, transparent)" }}
                aria-hidden="true"
              />

              {/* Description */}
              <p
                className="text-[#3F3A2F] leading-relaxed"
                style={{ fontSize: "clamp(0.82rem, 1.2vw, 0.95rem)" }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;