import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutImg from "../assets/Image/about.jpg";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.exploremore.app";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

        /* ── About section font setup ── */
        #about { font-family: 'Jost', sans-serif; }
        #about .ff-display { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── Image hover zoom ── */
        .about-img {
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .about-img-wrap:hover .about-img {
          transform: scale(1.06);
        }

        /* ── CTA golden shimmer ── */
        .about-cta {
          position: relative; overflow: hidden;
          transition: box-shadow 0.35s ease, transform 0.25s ease;
        }
        .about-cta::after {
          content: '';
          position: absolute;
          top: 0; left: -120%;
          width: 60%; height: 100%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,0.22), transparent);
          transition: left 0.55s ease;
        }
        .about-cta:hover::after { left: 160%; }
        .about-cta:hover {
          box-shadow: 0 12px 40px rgba(122,103,48,0.45);
          transform: translateY(-2px);
        }
        .about-cta .cta-arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        .about-cta:hover .cta-arrow { transform: translateX(5px); }

        /* ── Decorative pattern ── */
        .dot-pattern {
          background-image: radial-gradient(rgba(122,103,48,0.18) 1px, transparent 1px);
          background-size: 18px 18px;
        }

        /* ── Quote mark decoration ── */
        .about-quote-mark {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 120px; line-height: 1;
          color: rgba(122,103,48,0.12);
          font-weight: 300;
          position: absolute; top: -24px; left: -8px;
          user-select: none; pointer-events: none;
        }
      `}</style>

      <section
        id="about"
        className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 px-4 sm:px-6"
        style={{
          background:
            "linear-gradient(150deg, #f8f5e4 0%, #ede9d0 45%, #ddd7bb 100%)",
        }}
      >
        {/* ── Background texture + blobs ── */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none dot-pattern opacity-60"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(191,174,112,0.28) 0%, transparent 68%)",
            }}
          />
          <div
            className="absolute -bottom-48 -right-48 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(122,103,48,0.18) 0%, transparent 68%)",
            }}
          />
          <div
            className="absolute top-1/2 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(122,103,48,0.10) 30%, rgba(122,103,48,0.10) 70%, transparent)",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* ── Eyebrow ── */}
          <div
            data-aos="fade-up"
            className="flex items-center gap-3 mb-14 justify-center md:justify-start"
          >
            <div
              className="w-10 h-px"
              style={{
                background:
                  "linear-gradient(to right, #7A6730, rgba(122,103,48,0.3))",
              }}
            />
            <span
              className="text-[11px] font-medium tracking-[0.28em] uppercase"
              style={{
                color: "#7A6730",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              Who We Are
            </span>
            <div
              className="w-10 h-px"
              style={{
                background:
                  "linear-gradient(to left, #7A6730, rgba(122,103,48,0.3))",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* ── Image column ── */}
            <div data-aos="fade-right" className="relative">
              {/* Dot pattern accent block behind image */}
              <div
                className="absolute w-48 h-48 dot-pattern rounded-xl opacity-80"
                style={{ bottom: -20, right: -20, zIndex: 0 }}
                aria-hidden="true"
              />

              {/* Gold shadow offset */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  transform: "translate(12px, 12px)",
                  background:
                    "linear-gradient(135deg, rgba(122,103,48,0.25), rgba(191,174,112,0.12))",
                  borderRadius: "16px",
                }}
                aria-hidden="true"
              />

              {/* Image frame */}
              <div
                className="about-img-wrap relative w-full overflow-hidden rounded-2xl"
                style={{
                  height: "clamp(300px, 46vw, 540px)",
                  border: "2px solid rgba(255,255,255,0.95)",
                  boxShadow:
                    "0 24px 70px rgba(0,0,0,0.14), 0 4px 16px rgba(122,103,48,0.12)",
                  zIndex: 1,
                }}
              >
                <img
                  src={aboutImg}
                  alt="About ExploreMore"
                  draggable="false"
                  className="about-img w-full h-full object-cover"
                />

                {/* Bottom gradient on image */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.22), transparent)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* ── Content column ── */}
            <div
              data-aos="fade-left"
              data-aos-delay="150"
              className="flex flex-col"
            >
              <h2
                className="ff-display font-light text-[#2B2B2B] mb-2 leading-[1.05]"
                style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)" }}
              >
                About{" "}
                <span
                  className="relative inline-block italic"
                  style={{ color: "#7A6730" }}
                >
                  Us
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

              <p
                className="mb-6 font-light"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "clamp(0.82rem, 1.2vw, 0.92rem)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(122,103,48,0.75)",
                }}
              >
                Connecting Travelers &amp; Experiences
              </p>

              <div
                className="mb-7 h-px w-14 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, rgba(43,43,43,0.25), transparent)",
                }}
              />

              <div className="relative mb-4">
                <span className="about-quote-mark">&ldquo;</span>
                <p
                  className="relative text-[#3F3A2F] leading-[1.85]"
                  style={{
                    fontSize: "clamp(0.88rem, 1.4vw, 1.02rem)",
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  The Tour Guide Project is a modern digital platform created to
                  connect tour companies, activity instructors, and travelers
                  within one seamless ecosystem. Tour providers can publish and
                  manage their tours, while travelers easily explore and book
                  experiences that match their interests.
                </p>
              </div>

              <p
                className="text-[#3F3A2F] leading-[1.85] mb-10"
                style={{
                  fontSize: "clamp(0.88rem, 1.4vw, 1.02rem)",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                Activity instructors can also list their experiences, enabling
                users to discover, book, and participate directly through the
                platform — making travel planning smarter, faster, and more
                organized than ever before.
              </p>

              {/* ── CTA ── */}
              <div className="flex justify-center md:justify-start">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-cta inline-flex items-center gap-3 text-white font-medium px-9 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7A6730] focus:ring-offset-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #7A6730 0%, #b09040 60%, #8a7535 100%)",
                    fontSize: "0.85rem",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    fontFamily: "'Jost', sans-serif",
                    boxShadow: "0 8px 28px rgba(122,103,48,0.30)",
                  }}
                >
                  <span>Start Your Journey</span>
                  <span
                    className="cta-arrow text-base leading-none"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
