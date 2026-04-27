import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import agra       from "../assets/Image/agra.webp";
import kolkata    from "../assets/Image/kolkata.webp";
import delhi      from "../assets/Image/delhi.webp";
import mumbai     from "../assets/Image/mumbai.webp";
import odisha     from "../assets/Image/odisha.webp";
import varanasi   from "../assets/Image/varanasi.webp";
import jaipur     from "../assets/Image/jaipur.webp";
import darjeeling from "../assets/Image/darjeeling.webp";
import amritsar   from "../assets/Image/amritsar.webp";
import goa        from "../assets/Image/goa.webp";
import vadodara   from "../assets/Image/vadodara.webp";
import udaipur    from "../assets/Image/udaipur.webp";

const DESTINATIONS = [
  { img: agra,       title: "Agra",       tag: "Taj Mahal",       },
  { img: kolkata,    title: "Kolkata",    tag: "City of Joy",      },
  { img: delhi,      title: "Delhi",      tag: "Capital City",     },
  { img: mumbai,     title: "Mumbai",     tag: "City of Dreams",  },
  { img: odisha,     title: "Odisha",     tag: "Temples & Beaches",},
  { img: varanasi,   title: "Varanasi",   tag: "Spiritual City", },
  { img: jaipur,     title: "Jaipur",     tag: "Pink City",      },
  { img: darjeeling, title: "Darjeeling", tag: "Hill Station",   },
  { img: amritsar,   title: "Amritsar",   tag: "Golden Temple",  },
  { img: goa,        title: "Goa",        tag: "Beach Paradise", },
  { img: vadodara,   title: "Vadodara",   tag: "Royal Heritage", },
  { img: udaipur,    title: "Udaipur",    tag: "City of Lakes",  },
];

const looped = [...DESTINATIONS, ...DESTINATIONS];

const Destinations = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused) {
        el.scrollLeft += 1; // Adjust speed here
        // Seamless loop check
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };
    const handleTouchStart = () => { isPaused = true; };
    const handleTouchEnd   = () => { isPaused = false; };

    animationFrameId = requestAnimationFrame(scroll);

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchend",   handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend",   handleTouchEnd);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        #destinations { font-family: 'Jost', sans-serif; }
        #destinations .ff-display { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── Dot texture ── */
        #destinations .dot-pattern {
          background-image: radial-gradient(rgba(122,103,48,0.16) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* ── Scrollable Track ── */
        .marquee-container {
          display: flex;
          gap: 18px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 20px 0 40px;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
          cursor: grab;
          user-select: none;
        }
        .marquee-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
        .marquee-container:active {
          cursor: grabbing;
        }

        /* ── Card Wrapper (Static Area) ── */
        .marquee-card-wrapper {
          padding: 15px 0; /* Space for the card to move without losing hover */
          flex-shrink: 0;
          cursor: pointer;
        }

        /* ── Card base ── */
        .marquee-card {
          min-width: 240px;
          height: 320px;
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1.5px solid rgba(255,255,255,0.55);
          box-shadow: 0 8px 36px rgba(0,0,0,0.14);
          transition:
            transform 0.45s cubic-bezier(0.34,1.26,0.64,1),
            box-shadow 0.45s ease;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform;
        }
        @media (min-width: 640px)  { .marquee-card { min-width: 265px; height: 360px; } }
        @media (min-width: 1024px) { .marquee-card { min-width: 280px; height: 385px; } }

        .marquee-card-wrapper:hover .marquee-card {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 28px 64px rgba(0,0,0,0.22), 0 4px 16px rgba(122,103,48,0.18);
        }

        /* ── Image ── */
        .card-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
          user-select: none; -webkit-user-drag: none;
        }
        .marquee-card-wrapper:hover .card-img { transform: scale(1.10); }

        /* ── Overlays ── */
        .card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.80) 0%,
            rgba(0,0,0,0.22) 48%,
            transparent 75%
          );
        }
        /* subtle gold shimmer on hover */
        .card-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(
            135deg,
            transparent 40%,
            rgba(200,169,110,0.08) 50%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .marquee-card-wrapper:hover .card-shimmer { opacity: 1; }

        /* ── Top bar on hover ── */
        .card-top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(200,169,110,0.9), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .marquee-card-wrapper:hover .card-top-bar { opacity: 1; }

        /* ── Tag pill ── */
        .card-tag {
          position: absolute;
          top: 14px; left: 14px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.28);
          color: rgba(255,255,255,0.90);
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 99px;
          transition: background 0.3s ease, border-color 0.3s ease;
        }
        .marquee-card-wrapper:hover .card-tag {
          background: rgba(200,169,110,0.20);
          border-color: rgba(200,169,110,0.50);
        }

        /* ── Ghost card number ── */
        .card-num {
          position: absolute;
          top: 10px; right: 14px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 52px; font-weight: 300; line-height: 1;
          color: rgba(255,255,255,0.07);
          letter-spacing: -0.04em;
          user-select: none; pointer-events: none;
          transition: color 0.4s ease;
        }
        .marquee-card-wrapper:hover .card-num { color: rgba(200,169,110,0.14); }

        /* ── Card body ── */
        .card-body {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 22px 20px;
        }
        .card-city {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.55rem; font-weight: 400;
          color: #fff; line-height: 1.1;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }
        .marquee-card-wrapper:hover .card-city { color: rgba(245,225,180,1); }

        .card-sub {
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 400;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-top: 3px;
          opacity: 0; transform: translateY(6px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .marquee-card-wrapper:hover .card-sub { opacity: 1; transform: translateY(0); }

        .card-line {
          width: 0; height: 1.5px;
          border-radius: 99px;
          background: linear-gradient(to right, rgba(200,169,110,0.9), rgba(200,169,110,0.3));
          margin-top: 8px;
          transition: width 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .marquee-card-wrapper:hover .card-line { width: 40px; }

      `}</style>

      <section
        id="destinations"
        className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 scroll-mt-28"
        style={{
          background:
            "linear-gradient(150deg, #f8f5e4 0%, #ede9d0 45%, #ddd7bb 100%)",
        }}
      >
        {/* ── Dot texture ── */}
        <div
          className="dot-pattern absolute inset-0 pointer-events-none opacity-60"
          aria-hidden="true"
        />

        {/* ── Blobs ── */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute -top-32 -right-24 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(191,174,112,0.28) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-32 -left-24 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(122,103,48,0.20) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(122,103,48,0.09) 30%, rgba(122,103,48,0.09) 70%, transparent)",
            }}
          />
        </div>

        {/* ── Section heading ── */}
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-14 sm:mb-18" data-aos="fade-up">

            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="w-10 h-px"
                style={{
                  background:
                    "linear-gradient(to right, rgba(122,103,48,0.2), #7A6730)",
                }}
                aria-hidden="true"
              />
              <span
                className="text-[11px] font-medium tracking-[0.28em] uppercase"
                style={{ color: "#7A6730", fontFamily: "'Jost', sans-serif" }}
              >
                Explore India
              </span>
              <div
                className="w-10 h-px"
                style={{
                  background:
                    "linear-gradient(to left, rgba(122,103,48,0.2), #7A6730)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Heading */}
            <h2
              className="ff-display font-light text-[#2B2B2B] leading-tight mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}
            >
              Popular{" "}
              <span
                className="relative inline-block italic"
                style={{ color: "#7A6730" }}
              >
                Destinations
                <span
                  className="absolute left-0 -bottom-1 w-full h-[1.5px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #7A6730, rgba(122,103,48,0.15))",
                  }}
                  aria-hidden="true"
                />
              </span>
            </h2>

            {/* Divider */}
            <div
              className="mx-auto w-14 h-px rounded-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(43,43,43,0.2), transparent)",
              }}
            />
          </div>
        </div>

        {/* ── Marquee — full bleed ── */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="relative"
        >
          <div ref={scrollRef} className="marquee-container">
            {looped.map((dest, idx) => (
              <div key={idx} className="marquee-card-wrapper">
                <div className="marquee-card">
                  {/* Image */}
                  <img
                    src={dest.img}
                    alt={dest.title}
                    draggable="false"
                    className="card-img"
                  />

                  {/* Overlays */}
                  <div className="card-overlay" aria-hidden="true" />
                  <div className="card-shimmer" aria-hidden="true" />

                  {/* Top accent */}
                  <div className="card-top-bar" aria-hidden="true" />

                  {/* Ghost number */}
                  <span className="card-num">{dest.num}</span>

                  {/* Tag pill */}
                  <span className="card-tag">{dest.tag}</span>

                  {/* Body */}
                  <div className="card-body">
                    <p className="card-city">{dest.title}</p>
                    <p className="card-sub">India</p>
                    <div className="card-line" aria-hidden="true" />
                  </div>
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