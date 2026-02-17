import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Images
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

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // ✅ preload state
  const [imagesReady, setImagesReady] = useState(false);

  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  const DURATION = 5000;
  const TICK = 40;

  /* ── AOS ── */
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  /* ── preload images (NO WHITE FLASH) ── */
  useEffect(() => {
    const preload = async () => {
      const tasks = slides.map((s) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = s.img;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(tasks);
      setImagesReady(true);
    };

    preload();
  }, []);

  /* ── slide timer + progress bar ── */
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

  /* ── manual dot nav ── */
  const goTo = (i) => {
    if (i === index || !imagesReady) return;

    setTransitioning(true);

    setTimeout(() => {
      setIndex(i);
      setTransitioning(false);
    }, 700);
  };

  /* ── smooth scroll ── */
  const scrollToDestinations = () => {
    const el = document.getElementById("destinations");
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const current = slides[index];

  return (
    <>
      {/* ── Google Fonts injection ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .hero-root *,
        .hero-root *::before,
        .hero-root *::after { box-sizing: border-box; }

        /* slide fade */
        .slide-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          transition: opacity 0.9s cubic-bezier(0.4,0,0.2,1),
                      transform 7s cubic-bezier(0.25,0.46,0.45,0.94);
          will-change: opacity, transform;
          user-select: none; -webkit-user-drag: none;
        }
        .slide-img.active  { opacity: 1; transform: scale(1.05); }
        .slide-img.inactive{ opacity: 0; transform: scale(1);    }

        /* label flicker in */
        .slide-label {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s 0.1s ease, transform 0.6s 0.1s ease;
        }
        .slide-label.show { opacity: 1; transform: translateY(0); }

        /* progress bar */
        .progress-bar {
          position: absolute; bottom: 0; left: 0;
          height: 2px;
          background: rgba(255,255,255,0.9);
          transition: width ${TICK}ms linear;
        }

        /* CTA button */
        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 36px;
          border: 1px solid rgba(255,255,255,0.6);
          background: transparent;
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease, border-color 0.4s ease;
        }
        .cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #fff;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.77,0,0.175,1);
        }
        .cta-btn:hover::before { transform: scaleX(1); }
        .cta-btn:hover { color: #111; border-color: #fff; }
        .cta-btn span { position: relative; z-index: 1; }

        /* dot nav */
        .dot-nav {
          display: flex; gap: 10px; align-items: center;
        }
        .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: width 0.35s ease, background 0.35s ease, border-radius 0.35s ease;
        }
        .dot.active-dot {
          width: 24px;
          border-radius: 3px;
          background: #fff;
        }

        /* vertical rule left */
        .rule-v {
          position: absolute;
          left: 60px; top: 20%; bottom: 20%;
          width: 1px;
          background: rgba(255,255,255,0.12);
        }

        @media (max-width: 768px) {
          .rule-v { display: none; }
        }
      `}</style>

      <section
        id="home"
        className="hero-root"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          height: `calc(100svh - ${HEADER_HEIGHT}px)`,
          paddingTop: HEADER_HEIGHT,
        }}
      >
        {/* ✅ premium fallback background (NO WHITE FLASH) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3b2a16] via-[#1b1b1b] to-[#0b0b0b]" />

        {/* SLIDES */}
        <div style={{ position: "absolute", inset: 0 }}>
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

        {/* overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 28%)",
            pointerEvents: "none",
          }}
        />

        <div className="rule-v" />

        {/* MAIN CONTENT */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 48px 80px",
            maxWidth: 900,
          }}
        >
          <p
            data-aos="fade-right"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              marginBottom: 20,
            }}
          >
            Journey Through India
          </p>

          <h1
            data-aos="fade-right"
            data-aos-delay="80"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(3.6rem, 9vw, 8rem)",
              fontWeight: 300,
              lineHeight: 0.92,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Discover
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>
              the Unknown
            </em>
          </h1>

          <div
            style={{
              width: 48,
              height: 1,
              background: "rgba(255,255,255,0.5)",
              margin: "28px 0",
            }}
          />

          <div
            className={`slide-label ${!transitioning ? "show" : ""}`}
            style={{ marginBottom: 36 }}
          >
            {current.region} &nbsp;·&nbsp; {current.label}
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            style={{ display: "flex", alignItems: "center", gap: 36 }}
          >
            <button className="cta-btn" onClick={scrollToDestinations}>
              <span>Explore More</span>
              <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
            </button>

            <div className="dot-nav" role="tablist" aria-label="Slide navigation">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`dot${index === i ? " active-dot" : ""}`}
                  role="tab"
                  aria-selected={index === i}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "rgba(255,255,255,0.12)",
          }}
        >
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </section>
    </>
  );
};

export default Hero;
