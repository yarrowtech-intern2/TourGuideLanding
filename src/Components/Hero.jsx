import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Images — your original imports, unchanged
import mountain from "../assets/Image/mountain.jpg.jpeg";
import mountain1 from "../assets/Image/mountain1.jpg.jpeg";
import temple from "../assets/Image/Pareshnath-Jain-Temple.jpg.jpeg";
import sea from "../assets/Image/sea.jpg.jpeg";
import Victoria from "../assets/Image/Victoria-Memorial.jpg.jpeg";

const slides = [
  { img: mountain, label: "Himalayas", region: "North India" },
  { img: mountain1, label: "Highland Peaks", region: "Northeast" },
  { img: temple, label: "Pareshnath Temple", region: "Jharkhand" },
  { img: sea, label: "Coastal Waters", region: "Bay of Bengal" },
  { img: Victoria, label: "Victoria Memorial", region: "Kolkata" },
];

const HEADER_HEIGHT = 96;
const DURATION = 5000;
const TICK = 40;

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  /* ── AOS ── */
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  /* ── Preload images (NO WHITE FLASH) ── */
  useEffect(() => {
    const preload = async () => {
      const tasks = slides.map(
        (s) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = s.img;
            img.onload = resolve;
            img.onerror = resolve;
          })
      );
      await Promise.all(tasks);
      setImagesReady(true);
    };
    preload();
  }, []);

  /* ── Slide timer + progress bar ── */
  useEffect(() => {
    if (!imagesReady) return;
    let elapsed = 0;

    const startProgress = () => {
      elapsed = 0;
      setProgress(0);
      clearInterval(progressRef.current);
      progressRef.current = setInterval(() => {
        elapsed += TICK;
        setProgress(Math.min((elapsed / DURATION) * 100, 100));
      }, TICK);
    };

    const startSlide = () => {
      clearInterval(intervalRef.current);
      startProgress();
      intervalRef.current = setInterval(() => {
        setTransitioning(true);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % slides.length);
          setTransitioning(false);
          startProgress();
        }, 700);
      }, DURATION);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(intervalRef.current);
        clearInterval(progressRef.current);
      } else {
        startSlide();
      }
    };

    startSlide();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [imagesReady]);

  /* ── Smooth scroll ── */
  const scrollToDestinations = () => {
    const el = document.getElementById("destinations");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const current = slides[index];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        /* ── Slide crossfade + slow zoom ── */
        .slide-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1),
                      transform 7s cubic-bezier(0.25,0.46,0.45,0.94);
          will-change: opacity, transform;
          user-select: none; -webkit-user-drag: none;
        }
        .slide-img.active   { opacity: 1; transform: scale(1.06); }
        .slide-img.inactive { opacity: 0; transform: scale(1);    }

        /* ── Location label fade-up ── */
        .slide-label {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(255,255,255,0.60);
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.6s 0.1s ease, transform 0.6s 0.1s ease;
        }
        .slide-label .dot-sep {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(255,210,120,0.85); flex-shrink: 0;
        }
        .slide-label.show { opacity: 1; transform: translateY(0); }

        /* ── Progress bar ── */
        .progress-bar {
          position: absolute; bottom: 0; left: 0;
          height: 2px;
          background: linear-gradient(to right, rgba(255,210,120,0.9), rgba(255,255,255,0.7));
          transition: width ${TICK}ms linear;
        }

        /* ── CTA button — golden fill sweep ── */
        .cta-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 12px;
          padding: 15px 40px;
          border: 1px solid rgba(255,255,255,0.45);
          background: transparent; color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.26em; text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.4s ease, color 0.4s ease;
        }
        .cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(200,169,110,0.95), rgba(180,140,80,0.95));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.77,0,0.175,1);
        }
        .cta-btn:hover::before { transform: scaleX(1); }
        .cta-btn:hover { border-color: rgba(200,169,110,0.8); color: #fff; }
        .cta-btn > * { position: relative; z-index: 1; }
        .cta-btn .arrow { transition: transform 0.35s ease; }
        .cta-btn:hover .arrow { transform: translateX(5px); }

        /* ── Left vertical rule ── */
        .rule-v {
          position: absolute; left: 60px; top: 20%; bottom: 20%; width: 1px;
          background: linear-gradient(to bottom,
            transparent, rgba(255,255,255,0.10) 30%,
            rgba(255,255,255,0.10) 70%, transparent);
        }

        /* ── Right side strip ── */
        .side-strip {
          position: absolute; right: 0; top: 0; bottom: 0; width: 60px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 20px;
          border-left: 1px solid rgba(255,255,255,0.06);
          z-index: 12;
        }
        .side-strip span {
          writing-mode: vertical-rl; text-orientation: mixed;
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          transform: rotate(180deg);
          transition: color 0.3s ease; cursor: default; user-select: none;
        }
        .side-strip span:hover { color: rgba(255,255,255,0.55); }
        .side-strip .strip-line { width: 1px; height: 36px; background: rgba(255,255,255,0.12); }

        /* ── Responsive ── */
        @media (max-width: 1024px) { .side-strip { display: none; } }
        @media (max-width: 768px)  { .rule-v { display: none; } }
      `}</style>

      <section
        id="home"
        className="hero-root relative w-full overflow-hidden"
        style={{
          height: `calc(100svh - ${HEADER_HEIGHT}px)`,
          paddingTop: HEADER_HEIGHT,
        }}
      >
        {/* Fallback background — no white flash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a1f0e] via-[#141414] to-[#060608]" />

        {/* SLIDES */}
        <div className="absolute inset-0">
          {imagesReady &&
            slides.map(({ img }, i) => (
              <img
                key={i}
                src={img}
                alt=""
                draggable="false"
                className={`slide-img ${
                  index === i && !transitioning ? "active" : "inactive"
                }`}
              />
            ))}
        </div>

        {/* Cinematic overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 35% 55%, transparent 30%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.40) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 25%)",
          }}
        />

        {/* Decorative vertical rule */}
        <div className="rule-v" />

        {/* Right side strip */}
        <div className="side-strip">
          {["Scroll", "India", "Explore"].map((t, i) => (
            <React.Fragment key={i}>
              <span>{t}</span>
              {i < 2 && <div className="strip-line" />}
            </React.Fragment>
          ))}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div
          className="relative z-10 flex flex-col justify-end h-full"
          style={{
            padding: "0 clamp(24px, 5vw, 72px) clamp(48px, 8vh, 88px)",
            maxWidth: 860,
          }}
        >
          {/* Eyebrow */}
          <p
            data-aos="fade-right"
            className="mb-5"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            Journey Through India
          </p>

          {/* Headline */}
          <h1
            data-aos="fade-right"
            data-aos-delay="80"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(3.4rem, 9vw, 8rem)",
              fontWeight: 300,
              lineHeight: 0.9,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Discover
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "rgba(245,220,160,0.95)",
              }}
            >
              the Unknown
            </em>
          </h1>

          {/* Accent rule */}
          <div
            style={{
              width: 52,
              height: 1,
              background:
                "linear-gradient(to right, rgba(200,169,110,0.9), rgba(200,169,110,0.2))",
              margin: "28px 0 20px",
            }}
          />

          {/* Location label */}
          <div
            className={`slide-label${!transitioning ? " show" : ""}`}
            style={{ marginBottom: 40 }}
          >
            <span>{current.region}</span>
            <span className="dot-sep" />
            <span>{current.label}</span>
          </div>

          {/* CTA row */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <button className="cta-btn" onClick={scrollToDestinations}>
              <span>Explore More</span>
              <span className="arrow" style={{ fontSize: 15, lineHeight: 1 }}>
                →
              </span>
            </button>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: 2, background: "rgba(255,255,255,0.08)" }}
        >
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </section>
    </>
  );
};

export default Hero;
