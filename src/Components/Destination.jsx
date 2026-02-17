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

const DESTINATIONS = [
  { img: agra,       title: "Agra",       tag: "Taj Mahal"       },
  { img: kolkata,    title: "Kolkata",    tag: "City of Joy"     },
  { img: delhi,      title: "Delhi",      tag: "Capital City"    },
  { img: mumbai,     title: "Mumbai",     tag: "City of Dreams"  },
  { img: odisha,     title: "Odisha",     tag: "Temples & Beaches"},
  { img: varanasi,   title: "Varanasi",   tag: "Spiritual City"  },
  { img: jaipur,     title: "Jaipur",     tag: "Pink City"       },
  { img: darjeeling, title: "Darjeeling", tag: "Hill Station"    },
  { img: amritsar,   title: "Amritsar",   tag: "Golden Temple"   },
  { img: goa,        title: "Goa",        tag: "Beach Paradise"  },
  { img: vadodara,   title: "Vadodara",   tag: "Royal Heritage"  },
  { img: udaipur,    title: "Udaipur",    tag: "City of Lakes"   },
];

const looped = [...DESTINATIONS, ...DESTINATIONS];

const Destinations = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out-cubic", once: true, offset: 80 });
  }, []);

  return (
    <>
      <style>{`
        .marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: marquee-scroll 38s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-card {
          min-width: 240px;
          height: 320px;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          flex-shrink: 0;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
          border: 2px solid rgba(255,255,255,0.6);
          transition: transform 0.4s cubic-bezier(0.34,1.26,0.64,1),
                      box-shadow 0.4s ease;
        }
        @media (min-width: 640px)  { .marquee-card { min-width: 260px; height: 355px; } }
        @media (min-width: 1024px) { .marquee-card { min-width: 275px; height: 375px; } }

        .marquee-card:hover {
          transform: translateY(-8px) scale(1.025);
          box-shadow: 0 24px 56px rgba(0,0,0,0.2);
        }

        /* image zoom on hover */
        .marquee-card:hover .card-img {
          transform: scale(1.08);
        }
        .card-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
          user-select: none;
          -webkit-user-drag: none;
        }

        /* gradient overlay */
        .card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.72) 0%,
            rgba(0,0,0,0.22) 50%,
            transparent 100%
          );
          transition: background 0.3s ease;
        }

        /* tag pill */
        .card-tag {
          position: absolute;
          top: 14px; left: 14px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 99px;
        }

        /* bottom text */
        .card-body {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 18px;
        }
        .card-city {
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          letter-spacing: 0.01em;
        }
        .card-line {
          width: 0;
          height: 2px;
          border-radius: 99px;
          background: #7A6730;
          margin-top: 6px;
          transition: width 0.35s ease;
        }
        .marquee-card:hover .card-line {
          width: 32px;
        }

        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section
        id="destinations"
        className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 scroll-mt-28"
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-14 sm:mb-16" data-aos="fade-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
              <span className="text-[#7A6730] text-[11px] font-medium tracking-[0.22em] uppercase">
                Explore India
              </span>
              <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
            </div>

            <h2
              className="font-extrabold text-[#2B2B2B] leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            >
              Popular{" "}
              <span className="relative inline-block text-[#7A6730]">
                Destinations
                <span
                  className="absolute left-0 -bottom-1 w-full h-0.5 rounded"
                  style={{ background: "linear-gradient(90deg, #7A6730, transparent)" }}
                  aria-hidden="true"
                />
              </span>
            </h2>
          </div>

        </div>

        {/* Marquee — full bleed, no px padding */}
        <div data-aos="fade-up" data-aos-delay="150" className="overflow-hidden">
          <div className="marquee-track">
            {looped.map((dest, idx) => (
              <div key={idx} className="marquee-card">
                <img src={dest.img} alt={dest.title} draggable="false" className="card-img" />
                <div className="card-overlay" aria-hidden="true" />
                <span className="card-tag">{dest.tag}</span>
                <div className="card-body">
                  <p className="card-city">{dest.title}</p>
                  <div className="card-line" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
};

export default Destinations;