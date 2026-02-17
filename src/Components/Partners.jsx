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
        .partner-card {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 20px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          text-align: left;
          box-shadow: 0 4px 28px rgba(0,0,0,0.07);
          transition: transform 0.35s cubic-bezier(0.34,1.26,0.64,1),
                      box-shadow 0.35s ease;
          position: relative;
          overflow: hidden;
        }
        @media (hover: hover) {
          .partner-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 56px rgba(0,0,0,0.12);
          }
          .partner-card:hover .partner-bottom-line {
            width: 48px;
          }
          .partner-card:hover .partner-top-bar {
            opacity: 1;
          }
        }
        .partner-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #7A6730, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .partner-bottom-line {
          width: 28px;
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(90deg, #7A6730, transparent);
          margin-top: 24px;
          transition: width 0.35s ease;
        }
      `}</style>

      <section
        id="partners"
        className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(135deg, #f5f2dc 0%, #e6e2c8 50%, #d7d1b0 100%)" }}
      >
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-32 -left-24 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(191,174,112,0.25) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(140,122,61,0.2) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-14 sm:mb-16" data-aos="fade-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
              <span className="text-[#7A6730] text-[11px] font-medium tracking-[0.22em] uppercase">
                Who We Work With
              </span>
              <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
            </div>

            <h2
              className="font-extrabold text-[#2B2B2B] leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            >
              Our{" "}
              <span className="relative inline-block text-[#7A6730]">
                Trusted
                <span
                  className="absolute left-0 -bottom-1 w-full h-0.5 rounded"
                  style={{ background: "linear-gradient(90deg, #7A6730, transparent)" }}
                  aria-hidden="true"
                />
              </span>{" "}
              Partners
            </h2>

            <p
              className="mt-5 text-[#3F3A2F] leading-relaxed max-w-2xl mx-auto"
              style={{ fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)" }}
            >
              We collaborate with top restaurants, cafés, and premium experiences
              to give you the best travel & lifestyle journey.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
            {PARTNERS.map((partner, idx) => (
              <div
                key={partner.name}
                className="partner-card"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Top hover bar */}
                <div className="partner-top-bar" aria-hidden="true" />

                {/* Fixed top section: name + badge always same height */}
                <div style={{ minHeight: 90 }}>
                  {/* Name */}
                  <h3
                    className="font-extrabold text-[#2B2B2B] leading-snug mb-3"
                    style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)" }}
                  >
                    {partner.name}
                  </h3>

                  {/* Type badge */}
                  <span
                    className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(122,103,48,0.1)",
                      color: "#7A6730",
                      border: "1px solid rgba(122,103,48,0.2)",
                    }}
                  >
                    {partner.type}
                  </span>
                </div>

                {/* Description fills remaining space */}
                <p
                  className="mt-3 text-[#3F3A2F] leading-relaxed flex-grow"
                  style={{ fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)" }}
                >
                  {partner.description}
                </p>

                {/* Bottom accent line always at bottom */}
                <div className="partner-bottom-line" aria-hidden="true" />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Partners;