import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGlobe, FaUsers, FaPlane, FaMapMarkerAlt } from "react-icons/fa";

const SERVICES = [
  {
    Icon: FaGlobe,
    title: "Tours",
    tag: "Curated",
    description:
      "Tours from all over India including cultural heritage sites, hill stations, beach destinations, and city explorations designed for all types of travelers.",
  },
  {
    Icon: FaUsers,
    title: "Activities",
    tag: "Discounted",
    description:
      "Discounted fun activities such as trekking, rafting, camping, sightseeing, local experiences, and guided adventures.",
  },
  {
    Icon: FaPlane,
    title: "Adventure Travel",
    tag: "Thrill",
    description:
      "From mountain peaks to deep oceans — thrill seekers are welcome here with curated adventure experiences across India.",
  },
  {
    Icon: FaMapMarkerAlt,
    title: "Maps",
    tag: "Smart",
    description:
      "Smart maps for easier navigation, nearby attractions, routes, and travel planning during your journey.",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out-cubic", once: true, offset: 80 });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');

        #services { font-family: 'Jost', sans-serif; }
        #services .ff-display { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── Dot texture ── */
        #services .dot-pattern {
          background-image: radial-gradient(rgba(122,103,48,0.16) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* ── Card hover ── */
        .svc-card {
          transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94),
                      box-shadow 0.35s ease;
        }
        .svc-card:hover { transform: translateY(-8px); }

        /* ── Top accent bar ── */
        .svc-top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #7A6730, transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .svc-card:hover .svc-top-bar { opacity: 1; }

        /* ── Icon wrapper ── */
        .svc-icon-wrap {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .svc-card:hover .svc-icon-wrap {
          transform: scale(1.12) rotate(-4deg);
          box-shadow: 0 12px 32px rgba(122,103,48,0.38) !important;
        }

        /* ── Tag pill ── */
        .svc-tag {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(122,103,48,0.85);
          background: rgba(122,103,48,0.09);
          border: 1px solid rgba(122,103,48,0.20);
          padding: 3px 9px; border-radius: 99px;
          margin-bottom: 12px;
        }
      `}</style>

      <section
        id="services"
        className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8"
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

        {/* ── Background blobs ── */}
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
          {/* subtle mid-rule */}
          <div
            className="absolute top-1/2 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(122,103,48,0.09) 30%, rgba(122,103,48,0.09) 70%, transparent)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">

          {/* ── Section heading ── */}
          <div className="text-center mb-16 sm:mb-20" data-aos="fade-up">

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
                What We Offer
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
              Our{" "}
              <span className="relative inline-block italic" style={{ color: "#7A6730" }}>
                Services
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
              className="mx-auto w-14 h-px mb-5 rounded-full"
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
              We provide tours, activities, and travel planning support to make
              your journey smoother, safer, and more memorable.
            </p>
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {SERVICES.map(({ Icon, title, tag, description }, idx) => (
              <div
                key={title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="svc-card group relative flex flex-col items-center text-center rounded-2xl p-7 sm:p-8 overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.70)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.90)",
                  boxShadow:
                    "0 4px 30px rgba(0,0,0,0.07), 0 1px 4px rgba(122,103,48,0.06)",
                }}
              >
                {/* Top hover accent */}
                <span className="svc-top-bar" aria-hidden="true" />

                {/* Tag pill */}
                <span className="svc-tag">{tag}</span>

                {/* Icon */}
                <div
                  className="svc-icon-wrap flex items-center justify-center w-[60px] h-[60px] rounded-2xl mb-5"
                  style={{
                    background:
                      "linear-gradient(135deg, #7A6730 0%, #4a3f1e 100%)",
                    boxShadow: "0 8px 24px rgba(122,103,48,0.28)",
                  }}
                >
                  <Icon className="text-2xl text-white" />
                </div>

                {/* Title */}
                <h3
                  className="ff-display font-normal text-[#2B2B2B] mb-3 leading-tight"
                  style={{ fontSize: "clamp(1.3rem, 2vw, 1.55rem)" }}
                >
                  {title}
                </h3>

                {/* Divider */}
                <div
                  className="w-8 h-px rounded-full mb-4"
                  style={{
                    background:
                      "linear-gradient(90deg, #7A6730, rgba(122,103,48,0.15))",
                  }}
                  aria-hidden="true"
                />

                {/* Description */}
                <p
                  className="text-[#3F3A2F] leading-[1.80]"
                  style={{
                    fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)",
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Services;