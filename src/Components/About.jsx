import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutImg from "../assets/Image/about.jpg";

// 🔗 Replace with your real Play Store link
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.exploremore.app";

const About = () => {
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
      id="about"
      className="
        relative w-full overflow-hidden
        bg-gradient-to-br
        from-[#f5f2dc]
        via-[#e6e2c8]
        to-[#d7d1b0]
        py-20 sm:py-24 lg:py-32
        px-4 sm:px-6
      "
    >
      {/* Decorative gradient blur (CLIPPED) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#bfae70]/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#8c7a3d]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* IMAGE */}
        <div
          data-aos="fade-right"
          className="
            w-full h-72 sm:h-80 md:h-[420px] lg:h-[520px]
            rounded-3xl overflow-hidden
            shadow-2xl border-4 border-white/80
          "
        >
          <img
            src={aboutImg}
            alt="About ExploreMore"
            className="
              w-full h-full object-cover
              transition-transform duration-700
              hover:scale-105
            "
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/800x600?text=Image+Not+Found";
            }}
          />
        </div>

        {/* CONTENT CARD */}
        <div
          data-aos="fade-left"
          className="
            bg-white/70 backdrop-blur-xl
            rounded-3xl p-8 sm:p-10 lg:p-12
            shadow-xl
            text-center md:text-left
          "
        >
          <h2
            className="
              text-3xl sm:text-4xl lg:text-5xl
              font-extrabold
              text-[#2B2B2B]
              mb-6 leading-tight
            "
          >
            About <span className="text-[#7A6730]">Us</span>
          </h2>

          <p className="text-base sm:text-lg text-[#3F3A2F] leading-relaxed">
            The Tour Guide Project is a modern digital platform created to
            connect tour companies, activity instructors, and travelers within
            one seamless ecosystem. Tour providers can publish and manage their
            tours, while travelers easily explore and book experiences that
            match their interests.
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#3F3A2F] leading-relaxed">
            Activity instructors can also list their experiences, enabling users
            to discover, book, and participate directly through the platform —
            making travel planning smarter, faster, and more organized than ever
            before.
          </p>

          <div className="mt-10 flex justify-center md:justify-start">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                bg-gradient-to-r from-[#2B2B2B] to-[#000000]
                hover:from-black hover:to-[#2B2B2B]
                text-white font-semibold
                px-8 py-3 rounded-full
                shadow-lg transition-all duration-300
                focus:outline-none focus:ring-2
                focus:ring-black focus:ring-offset-2
              "
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
