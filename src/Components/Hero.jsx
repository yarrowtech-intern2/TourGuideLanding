import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Images
import mountain from "../assets/Image/mountain.jpg.jpeg";
import mountain1 from "../assets/Image/mountain1.jpg.jpeg";
import temple from "../assets/Image/Pareshnath-Jain-Temple.jpg.jpeg";
import sea from "../assets/Image/sea.jpg.jpeg";
import Victoria from "../assets/Image/Victoria-Memorial.jpg.jpeg";

const images = [mountain, mountain1, temple, sea, Victoria];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  // ✅ Slider Auto Change
  useEffect(() => {
    const start = () => {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    };

    const stop = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const scrollToDestinations = () => {
    const element = document.getElementById("destinations");
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* SLIDER USING IMG */}
      <div className="absolute inset-0">
        {images.map((img, i) => {
          const isActive = index === i;

          return (
            <img
              key={i}
              src={img}
              alt="Hero Slide"
              draggable="false"
              className={`
                absolute inset-0 w-full h-full object-cover object-center
                transition-all duration-[1200ms] ease-in-out
                ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"}
              `}
            />
          );
        })}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-start pt-40 sm:pt-44 md:pt-52">
        <div className="w-full px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Subtitle */}
            <p
              data-aos="fade-down"
              className="text-xs sm:text-sm tracking-[0.35em] uppercase text-white/80 mb-4"
            >
              Discover The
            </p>

            {/* Main Title */}
            <h1
              data-aos="fade-down"
              data-aos-delay="100"
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-none mb-6"
            >
              Unknown
            </h1>

            {/* Divider */}
            <div className="w-12 h-[2px] bg-white/60 mx-auto mb-8" />

            {/* CTA BUTTON */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="flex justify-center"
            >
              <button
                onClick={scrollToDestinations}
                className="
                  inline-flex items-center justify-center
                  bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700
                  text-white px-8 py-3 sm:py-4 rounded-lg
                  font-semibold text-sm sm:text-base
                  transition focus:outline-none focus:ring-2
                  focus:ring-cyan-400 focus:ring-offset-2
                  focus:ring-offset-black
                "
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
