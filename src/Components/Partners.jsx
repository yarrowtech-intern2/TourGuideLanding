import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PARTNERS = [
  {
    name: "Miss Ginko",
    type: "Restaurant",
    description:
      "An elegant dining destination offering thoughtfully crafted dishes in a refined, contemporary setting.",
  },
  {
    name: "Scoop",
    type: "Restaurant",
    description:
      "A modern beverage and dessert space known for creative flavors and a relaxed, vibrant atmosphere.",
  },
  {
    name: "New Empire",
    type: "Bar & Cinema",
    description:
      "A unique fusion of cinema and bar culture, delivering immersive entertainment with premium food and drinks.",
  },
  {
    name: "Gondhoraj",
    type: "Restaurant",
    description:
      "A culinary experience inspired by authentic flavors, blending tradition with modern presentation.",
  },
];

const Partners = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out-cubic", once: true, offset: 80 });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        #partners { font-family: 'Jost', sans-serif; }
        #partners .ff-display { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── Dot texture ── */
        #partners .dot-pattern {
          background-image: radial-gradient(rgba(122,103,48,0.16) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* ── Card ── */
        .partner-card {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.90);
          border-radius: 20px;
          padding: 36px 30px 32px;
          display: flex;
          flex-direction: column;
          text-align: left;
          box-shadow: 0 4px 30px rgba(0,0,0,0.07), 0 1px 4px rgba(122,103,48,0.05);
          transition: transform 0.38s cubic-bezier(0.34,1.26,0.64,1),
                      box-shadow 0.38s ease;
          position: relative;
          overflow: hidden;
        }

        @media (hover: hover) {
          .partner-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 24px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(122,103,48,0.10);
          }
          .partner-card:hover .partner-top-bar { opacity: 1; }
          .partner-card:hover .partner-bot-line { width: 52px; }
          .partner-card:hover .partner-name     { color: #5c4820; }
        }

        /* ── Top accent bar ── */
        .partner-top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #7A6730, transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        /* ── Partner name ── */
        .partner-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.5rem, 2.4vw, 1.85rem);
          font-weight: 400; color: #2B2B2B;
          line-height: 1.1; letter-spacing: -0.01em;
          transition: color 0.3s ease;
          margin-bottom: 10px;
        }

        /* ── Bottom accent line ── */
        .partner-bot-line {
          width: 28px; height: 1.5px; border-radius: 99px;
          background: linear-gradient(90deg, rgba(122,103,48,0.9), rgba(122,103,48,0.15));
          margin-top: auto;
          transition: width 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }
      `}</style>

      <section
        id="partners"
        className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(150deg, #f8f5e4 0%, #ede9d0 45%, #ddd7bb 100%)",
        }}
      >
        {/* ── Dot texture ── */}
        <div
          className="dot-pattern absolute inset-0 pointer-events-none opacity-60"
          aria-hidden="true"
        />

        {/* ── Background blobs ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(191,174,112,0.28) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-32 -right-24 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(122,103,48,0.20) 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/2 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(122,103,48,0.09) 30%, rgba(122,103,48,0.09) 70%, transparent)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">

          {/* ── Heading ── */}
          <div className="text-center mb-16 sm:mb-20" data-aos="fade-up">

            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to right, rgba(122,103,48,0.2), #7A6730)" }}
                aria-hidden="true"
              />
              <span
                className="text-[11px] font-medium tracking-[0.28em] uppercase"
                style={{ color: "#7A6730", fontFamily: "'Jost', sans-serif" }}
              >
                Who We Work With
              </span>
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to left, rgba(122,103,48,0.2), #7A6730)" }}
                aria-hidden="true"
              />
            </div>

            {/* Title */}
            <h2
              className="ff-display font-light text-[#2B2B2B] leading-tight mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}
            >
              Our{" "}
              <span className="relative inline-block italic" style={{ color: "#7A6730" }}>
                Trusted
                <span
                  className="absolute left-0 -bottom-1 w-full h-[1.5px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #7A6730, rgba(122,103,48,0.15))" }}
                  aria-hidden="true"
                />
              </span>{" "}
              Partners
            </h2>

            {/* Divider */}
            <div
              className="mx-auto w-14 h-px rounded-full mb-5"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(43,43,43,0.2), transparent)",
              }}
            />

            {/* Tagline */}
            <p
              className="text-[#3F3A2F] leading-relaxed max-w-xl mx-auto"
              style={{
                fontSize: "clamp(0.88rem, 1.4vw, 1.02rem)",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              We collaborate with top restaurants, cafés, and premium experiences
              to give you the best travel &amp; lifestyle journey.
            </p>
          </div>

          {/* ── Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
            {PARTNERS.map((partner, idx) => (
              <div
                key={partner.name}
                className="partner-card"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Top hover bar */}
                <div className="partner-top-bar" aria-hidden="true" />

                {/* Name (first) */}
                <h3 className="partner-name">{partner.name}</h3>

                {/* Type badge (second) */}
                <span
                  className="inline-block text-[9px] font-medium tracking-[0.22em] uppercase px-3 py-1 rounded-full mb-4"
                  style={{
                    background: "rgba(122,103,48,0.09)",
                    color: "#7A6730",
                    border: "1px solid rgba(122,103,48,0.20)",
                    fontFamily: "'Jost', sans-serif",
                    width: "fit-content",
                  }}
                >
                  {partner.type}
                </span>

                {/* Thin rule */}
                <div
                  className="w-8 h-px mb-4 rounded-full"
                  style={{ background: "linear-gradient(to right, rgba(43,43,43,0.18), transparent)" }}
                  aria-hidden="true"
                />

                {/* Description (third) */}
                <p
                  className="text-[#3F3A2F] leading-[1.80] flex-grow"
                  style={{
                    fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)",
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  {partner.description}
                </p>

                {/* Bottom accent line */}
                <div className="partner-bot-line mt-6" aria-hidden="true" />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Partners;