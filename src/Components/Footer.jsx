import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Change logo path if needed
import logo from "../assets/Image/logo.webp";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  // ✅ Smooth Scroll
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const HEADER_OFFSET = 96;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const MAP_SEARCH =
    "https://www.google.com/maps/search/?api=1&query=3A,+Bertram+St,+Esplanade,+Dharmatala,+Taltala,+Kolkata,+West+Bengal+700087";

  const MAP_EMBED =
    "https://www.google.com/maps?hl=en&q=3A%20Bertram%20St%2C%20Esplanade%2C%20Dharmatala%2C%20Taltala%2C%20Kolkata%2C%20West%20Bengal%20700087&z=16&output=embed";

  return (
    <footer
      className="
        relative w-full overflow-hidden
        bg-gradient-to-br from-[#f5f2dc] via-[#e6e2c8] to-[#d7d1b0]
        pt-16 pb-8
        px-4 sm:px-6 lg:px-8
      "
      data-aos="fade-up"
    >
      {/* Decorative blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-96 h-96 bg-[#bfae70]/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-[#8c7a3d]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-10">
        {/* BRAND */}
        <div className="md:col-span-3">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="The Better Pass Logo"
              className="w-10 h-10 object-contain rounded-md"
              draggable="false"
            />
            <h4 className="font-extrabold text-lg sm:text-xl text-[#2B2B2B]">
              The Better <span className="text-[#7A6730]">Pass</span>
            </h4>
          </div>
          <p className="text-sm sm:text-[0.92rem] text-[#3F3A2F] leading-relaxed opacity-90">
            Your trusted travel partner. Discover stunning destinations,
            exciting trips, and unforgettable experiences.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="md:col-span-2">
          <h4 className="font-bold text-base mb-5 text-[#2B2B2B] tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm sm:text-[0.92rem]">
            {[
              { label: "Home", id: "home" },
              { label: "About", id: "about" },
              { label: "Services", id: "services" },
              { label: "Partners", id: "partners" },
              { label: "FAQ", id: "faq" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="cursor-pointer text-[#3F3A2F] hover:text-[#7A6730] transition font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="md:col-span-3">
          <h4 className="font-bold text-base mb-5 text-[#2B2B2B] tracking-wide">Contact</h4>
          <ul className="space-y-4 text-sm sm:text-[0.92rem] text-[#3F3A2F]">
            <li className="flex items-start gap-3">
              <span className="shrink-0 text-[#7A6730]">📧</span>
              <a href="mailto:support@betterpass.com" className="hover:text-[#7A6730] transition font-medium">
                support@betterpass.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 text-[#7A6730]">📞</span>
              <a href="tel:+919830590929" className="hover:text-[#7A6730] transition font-medium">
                +91 9830590929
              </a>
            </li>
            <li className="flex items-start gap-3 leading-relaxed">
              <span className="shrink-0 text-[#7A6730]">📍</span>
              <a href={MAP_SEARCH} target="_blank" rel="noopener noreferrer" className="hover:text-[#7A6730] transition font-medium">
                3A, Bertram St, Esplanade, Dharmatala, Kolkata, WB 700087
              </a>
            </li>
          </ul>
        </div>

        {/* MAP */}
        <div className="md:col-span-4">
          <h4 className="font-bold text-base mb-5 text-[#2B2B2B] tracking-wide">
            Our Location
          </h4>
          <div className="w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white/60 backdrop-blur-xl border border-white/70 transition-transform duration-500 hover:scale-[1.02]">
            <iframe
              title="Better Pass Location"
              src={MAP_EMBED}
              className="w-full h-full grayscale-[20%] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            href={MAP_SEARCH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-[13px] font-bold text-[#7A6730] hover:translate-x-1 transition-transform"
          >
            View Panoramic Map <span className="ml-2">→</span>
          </a>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative mt-12 pt-5 text-center text-xs sm:text-sm text-[#3F3A2F]">
        <div className="h-px w-full bg-[#7A6730]/25 mb-4" />
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[#2B2B2B]">The Better Pass</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
