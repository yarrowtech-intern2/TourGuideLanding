import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import aboutImg from "../assets/Image/about.jpg";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.exploremore.app";



const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out-cubic", once: true, offset: 80 });
  }, []);

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-36 px-4 sm:px-6"
      style={{ background: "linear-gradient(135deg, #f5f2dc 0%, #e6e2c8 50%, #d7d1b0 100%)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(191,174,112,0.22) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(140,122,61,0.15) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Eyebrow label */}
        <div
          data-aos="fade-up"
          className="flex items-center gap-3 mb-12 justify-center md:justify-start"
        >
          <div className="w-8 h-px bg-[#7A6730]" />
          <span className="text-[#7A6730] text-[11px] font-medium tracking-[0.2em] uppercase">
            Who We Are
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <div data-aos="fade-right" className="relative">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ transform: "translate(10px, 10px)", background: "rgba(122,103,48,0.18)" }}
              aria-hidden="true"
            />
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{
                height: "clamp(280px, 45vw, 520px)",
                border: "2.5px solid rgba(255,255,255,0.85)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.13)",
              }}
            >
              <img
                src={aboutImg}
                alt="About ExploreMore"
                draggable="false"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)" }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Content */}
          <div data-aos="fade-left" data-aos-delay="150" className="flex flex-col">

            {/* Heading */}
            <h2
              className="font-bold text-[#2B2B2B] mb-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              About{" "}
              <span className="relative inline-block text-[#7A6730]">
                Us
                <span
                  className="absolute left-0 -bottom-1 w-full h-0.5 rounded"
                  style={{ background: "linear-gradient(90deg, #7A6730, transparent)" }}
                  aria-hidden="true"
                />
              </span>
            </h2>

            <div className="w-10 h-0.5 mb-6 rounded" style={{ background: "rgba(43,43,43,0.15)" }} />

            {/* Body */}
            <p
              className="text-[#3F3A2F] leading-relaxed mb-4"
              style={{ fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)" }}
            >
              The Tour Guide Project is a modern digital platform created to connect tour
              companies, activity instructors, and travelers within one seamless ecosystem.
              Tour providers can publish and manage their tours, while travelers easily
              explore and book experiences that match their interests.
            </p>

            <p
              className="text-[#3F3A2F] leading-relaxed"
              style={{ fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)" }}
            >
              Activity instructors can also list their experiences, enabling users to
              discover, book, and participate directly through the platform — making travel
              planning smarter, faster, and more organized than ever before.
            </p>

            {/* CTA */}
            <div className="flex justify-center md:justify-start mt-8">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 text-white font-semibold px-8 py-3.5 rounded-full overflow-hidden transition-shadow duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#7A6730] focus:ring-offset-2"
                style={{
                  background: "linear-gradient(135deg, #7A6730 0%, #a08840 100%)",
                  fontSize: "0.9rem",
                  letterSpacing: "0.04em",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)" }}
                  aria-hidden="true"
                />
                <span className="relative">Start Your Journey</span>
                <span className="relative text-base leading-none" aria-hidden="true">→</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;