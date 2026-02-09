import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  // Horizontal slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to destinations function
  const scrollToDestinations = () => {
    const element = document.getElementById("destinations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* SLIDER */}
      <div
        className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${index * (100 / images.length)}%)`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
              width: `${100 / images.length}%`,
            }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/70" />

      {/* CONTENT */}
      {/* 👇 CHANGED: items-center -> items-start + padding top */}
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
              {/* Explore More -> Scroll to Destinations */}
              <button
                onClick={scrollToDestinations}
                className="inline-flex items-center justify-center
                bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700
                text-white px-8 py-3 sm:py-4 rounded-lg
                font-semibold text-sm sm:text-base
                transition focus:outline-none focus:ring-2
                focus:ring-cyan-400 focus:ring-offset-2
                focus:ring-offset-black"
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
