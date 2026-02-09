import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import agra from "../assets/Image/agra.jpeg";
import kolkata from "../assets/Image/kolkata.jpg";
import delhi from "../assets/Image/delhi.jpg";
import mumbai from "../assets/Image/mumbai.jpg";
import odisha from "../assets/Image/odisha.jpg";
import varanasi from "../assets/Image/varanasi.jpg";
import jaipur from "../assets/Image/jaipur.jpg";
import darjeeling from "../assets/Image/darjeeling.jpg";
import amritsar from "../assets/Image/amritsar.jpg";
import goa from "../assets/Image/goa.jpg";
import vadodara from "../assets/Image/vadodara.jpg";
import udaipur from "../assets/Image/udaipur.jpg";

const destinations = [
  { img: agra, title: "Agra", tag: "Taj Mahal" },
  { img: kolkata, title: "Kolkata", tag: "City of Joy" },
  { img: delhi, title: "Delhi", tag: "Capital City" },
  { img: mumbai, title: "Mumbai", tag: "City of Dreams" },
  { img: odisha, title: "Odisha", tag: "Temples & Beaches" },
  { img: varanasi, title: "Varanasi", tag: "Spiritual City" },
  { img: jaipur, title: "Jaipur", tag: "Pink City" },
  { img: darjeeling, title: "Darjeeling", tag: "Hill Station" },
  { img: amritsar, title: "Amritsar", tag: "Golden Temple" },
  { img: goa, title: "Goa", tag: "Beach Paradise" },
  { img: vadodara, title: "Vadodara", tag: "Royal Heritage" },
  { img: udaipur, title: "Udaipur", tag: "City of Lakes" },
];

// duplicate list for smooth loop
const looped = [...destinations, ...destinations];

const Destinations = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="destinations"
      className="
        relative w-full overflow-hidden
        bg-gradient-to-br from-[#f5f2dc] via-[#e6e2c8] to-[#d7d1b0]
        py-20 sm:py-24 lg:py-32
        px-4 sm:px-6 lg:px-8
      "
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-[#2B2B2B] mb-12">
          Popular <span className="text-[#7A6730]">Destinations</span>
        </h2>

        <div className="overflow-hidden">
          <div className="marquee-track">
            {looped.map((dest, idx) => (
              <div key={idx} className="marquee-card">
                <img
                  src={dest.img}
                  alt={dest.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4 bg-[#7A6730] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {dest.tag}
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-xl font-bold drop-shadow">
                    {dest.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: scroll 35s linear infinite;
          will-change: transform;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-card {
          min-width: 260px;
          height: 360px;
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.35s ease;
        }

        .marquee-card:hover {
          transform: translateY(-6px) scale(1.02);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Destinations;
