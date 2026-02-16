import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Change logo path if needed
import logo from "../assets/Image/logo.png";

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

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={logo}
              alt="Better Pass Logo"
              className="w-10 h-10 object-contain rounded-md"
              draggable="false"
            />

            <h4 className="font-extrabold text-lg sm:text-xl text-[#2B2B2B]">
              Better <span className="text-[#7A6730]">Pass</span>
            </h4>
          </div>

          <p className="text-sm sm:text-base text-[#3F3A2F] leading-relaxed">
            Your trusted travel partner. Discover stunning destinations,
            exciting trips, and unforgettable experiences.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-bold text-base mb-4 text-[#2B2B2B]">
            Quick Links
          </h4>

          <ul className="space-y-2 text-sm sm:text-base">
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
                  className="
                    cursor-pointer
                    text-[#3F3A2F]
                    hover:text-[#7A6730]
                    transition
                    focus:outline-none
                  "
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-bold text-base mb-4 text-[#2B2B2B]">Contact</h4>

          <ul className="space-y-2 text-sm sm:text-base text-[#3F3A2F]">
            <li>
              📧{" "}
              <a
                href="mailto:support@betterpass.com"
                className="hover:text-[#7A6730] transition focus:outline-none"
              >
                support@betterpass.com
              </a>
            </li>

            <li>
              📞{" "}
              <a
                href="tel:+919830590929"
                className="hover:text-[#7A6730] transition focus:outline-none"
              >
                +91 9830590929
              </a>
            </li>

            <li className="leading-relaxed">
              📍{" "}
              <a
                href={MAP_SEARCH}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7A6730] transition focus:outline-none"
              >
                3A, Bertram St, Esplanade, Dharmatala, Taltala, Kolkata, West
                Bengal 700087
              </a>
            </li>
          </ul>
        </div>

        {/* MAP */}
        <div>
          <h4 className="font-bold text-base mb-4 text-[#2B2B2B]">
            Our Location
          </h4>

          <div className="w-full h-44 sm:h-60 rounded-2xl overflow-hidden shadow-lg bg-white/60 backdrop-blur-xl border border-white/70">
            <iframe
              title="Better Pass Location"
              src={MAP_EMBED}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* No overlay text (only link) */}
          <a
            href={MAP_SEARCH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm font-semibold text-[#7A6730] hover:underline"
          >
            View on Google Maps →
          </a>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative mt-12 pt-5 text-center text-xs sm:text-sm text-[#3F3A2F]">
        <div className="h-px w-full bg-[#7A6730]/25 mb-4" />
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-[#2B2B2B]">Better Pass</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
