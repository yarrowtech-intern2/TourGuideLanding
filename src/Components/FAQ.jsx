import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const FAQS = [
  {
    question: "As a tour company, how do I post a tour?",
    answer:
      "Open our app and navigate to the 'Tours' section, then tap 'Post New Tour'. Fill in the details, upload an image if possible, and tap 'Create Post'. Your tour will immediately be visible to all users.",
  },
  {
    question: "As a user, how do I book a tour?",
    answer:
      "Tap on the tour you'd like to join, select the number of guests, and press 'Confirm Booking'. Alternatively, you can press the 'Book Now' button directly from the tour listing.",
  },
  {
    question: "How do I use the maps?",
    answer:
      "Tap the last icon in the navigation bar and search for your destination. A list of suggestions will appear — tap the one that matches your location and it will be displayed on the map.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggle = (index) =>
    setActiveIndex((prev) => (prev === index ? null : index));

  const getHeight = (index) => {
    const el = contentRefs.current[index];
    return el ? el.scrollHeight : 0;
  };

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: true, offset: 80 });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        #faq { font-family: 'Jost', sans-serif; }
        #faq .ff-display { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── Dot texture ── */
        #faq .dot-pattern {
          background-image: radial-gradient(rgba(122,103,48,0.16) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* ── FAQ item ── */
        .faq-item {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.90);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(0,0,0,0.07), 0 1px 4px rgba(122,103,48,0.04);
          transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
          position: relative;
        }
        .faq-item:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.11), 0 2px 8px rgba(122,103,48,0.08);
          transform: translateY(-2px);
        }
        .faq-item.is-open {
          border-color: rgba(122,103,48,0.28);
          box-shadow: 0 16px 48px rgba(0,0,0,0.10), 0 2px 10px rgba(122,103,48,0.10);
        }

        /* ── Button ── */
        .faq-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 24px 30px;
          text-align: left;
          background: none; border: none;
          cursor: pointer; outline: none;
        }
        .faq-btn:focus-visible {
          outline: 2px solid #7A6730;
          outline-offset: -2px;
          border-radius: 18px;
        }

        /* ── Question text ── */
        .faq-question {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.05rem, 1.8vw, 1.25rem);
          font-weight: 400; color: #2B2B2B;
          line-height: 1.3; letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }
        .faq-item.is-open .faq-question { color: #5c4820; }

        /* ── Icon circle ── */
        .faq-icon {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(122,103,48,0.10);
          border: 1px solid rgba(122,103,48,0.18);
          flex-shrink: 0;
          transition: background 0.35s ease, transform 0.42s cubic-bezier(0.34,1.26,0.64,1),
                      border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .faq-item.is-open .faq-icon {
          background: #7A6730;
          border-color: #7A6730;
          transform: rotate(180deg);
          box-shadow: 0 6px 18px rgba(122,103,48,0.30);
        }
        .faq-icon svg {
          color: #7A6730; font-size: 10px;
          transition: color 0.3s ease;
        }
        .faq-item.is-open .faq-icon svg { color: #fff; }

        /* ── Progress bar (top) ── */
        .faq-progress {
          height: 2px;
          background: linear-gradient(90deg, #7A6730, rgba(122,103,48,0.15));
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .faq-item.is-open .faq-progress { transform: scaleX(1); }

        /* ── Answer divider ── */
        .faq-divider {
          height: 1px; margin: 0 30px;
          background: linear-gradient(to right, rgba(122,103,48,0.18), rgba(122,103,48,0.04));
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.35s 0.05s ease;
        }
        .faq-item.is-open .faq-divider { transform: scaleX(1); }

        /* ── Answer panel ── */
        .faq-answer {
          font-family: 'Jost', sans-serif;
          font-size: clamp(0.85rem, 1.3vw, 0.97rem);
          color: #3F3A2F; line-height: 1.85;
        }

        /* ── Index pill (left of question) ── */
        .faq-index {
          display: inline-flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.02em;
          color: rgba(122,103,48,0.65);
          background: rgba(122,103,48,0.08);
          border: 1px solid rgba(122,103,48,0.16);
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }
        .faq-item.is-open .faq-index {
          background: rgba(122,103,48,0.14);
          color: #7A6730;
          border-color: rgba(122,103,48,0.30);
        }
      `}</style>

      <section
        id="faq"
        className="relative w-full overflow-hidden py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
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

        <div className="relative max-w-3xl mx-auto">

          {/* ── Heading ── */}
          <div className="text-center mb-14 sm:mb-16" data-aos="fade-up">

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
                Got Questions?
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
              Frequently{" "}
              <span className="relative inline-block italic" style={{ color: "#7A6730" }}>
                Asked Questions
                <span
                  className="absolute left-0 -bottom-1 w-full h-[1.5px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #7A6730, rgba(122,103,48,0.15))" }}
                  aria-hidden="true"
                />
              </span>
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
              className="text-[#3F3A2F] leading-relaxed max-w-lg mx-auto"
              style={{
                fontSize: "clamp(0.88rem, 1.4vw, 1.02rem)",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              Quick answers to common questions about posting tours, booking,
              and using the map system.
            </p>
          </div>

          {/* ── Accordion ── */}
          <div className="space-y-4" data-aos="fade-up" data-aos-delay="150">
            {FAQS.map((faq, index) => {
              const open = activeIndex === index;
              return (
                <div key={index} className={`faq-item${open ? " is-open" : ""}`}>

                  {/* Top progress bar */}
                  <div className="faq-progress" aria-hidden="true" />

                  {/* Question button */}
                  <button
                    type="button"
                    className="faq-btn"
                    onClick={() => toggle(index)}
                    aria-expanded={open}
                    aria-controls={`faq-answer-${index}`}
                  >
                    {/* Left: index pill + question */}
                    <span className="flex items-start gap-3">
                      <span className="faq-index mt-0.5">{index + 1}</span>
                      <span className="faq-question">{faq.question}</span>
                    </span>

                    {/* Right: icon */}
                    <span className="faq-icon" aria-hidden="true">
                      <FaChevronDown />
                    </span>
                  </button>

                  {/* Divider line that expands when open */}
                  <div className="faq-divider" aria-hidden="true" />

                  {/* Answer panel */}
                  <div
                    id={`faq-answer-${index}`}
                    className="overflow-hidden"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      height: open ? getHeight(index) : 0,
                      transition: "height 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <div ref={(el) => (contentRefs.current[index] = el)} className="py-5">
                      <p className="faq-answer">{faq.answer}</p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default FAQ;