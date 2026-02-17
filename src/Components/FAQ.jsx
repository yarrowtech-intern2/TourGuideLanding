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
  // null = all closed; clicking opens one, clicking same closes it, clicking another switches
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
        .faq-item {
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .faq-item:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.11);
        }
        .faq-item.is-open {
          border-color: rgba(122,103,48,0.3);
        }
        .faq-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 28px;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
        }
        .faq-btn:focus-visible {
          outline: 2px solid #7A6730;
          outline-offset: -2px;
          border-radius: 16px;
        }
        .faq-icon {
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(122,103,48,0.1);
          flex-shrink: 0;
          transition: background 0.3s ease, transform 0.35s cubic-bezier(0.34,1.26,0.64,1);
        }
        .faq-item.is-open .faq-icon {
          background: #7A6730;
          transform: rotate(180deg);
        }
        .faq-icon svg { color: #7A6730; font-size: 11px; transition: color 0.3s ease; }
        .faq-item.is-open .faq-icon svg { color: #fff; }

        .faq-progress {
          height: 2px;
          background: linear-gradient(90deg, #7A6730, rgba(122,103,48,0.2));
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .faq-item.is-open .faq-progress {
          transform: scaleX(1);
        }
      `}</style>

      <section
        id="faq"
        className="relative w-full overflow-hidden py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
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

        <div className="relative max-w-3xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-12 sm:mb-14" data-aos="fade-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
              <span className="text-[#7A6730] text-[11px] font-medium tracking-[0.22em] uppercase">
                Got Questions?
              </span>
              <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
            </div>

            <h2
              className="font-extrabold text-[#2B2B2B] leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            >
              Frequently{" "}
              <span className="relative inline-block text-[#7A6730]">
                Asked Questions
                <span
                  className="absolute left-0 -bottom-1 w-full h-0.5 rounded"
                  style={{ background: "linear-gradient(90deg, #7A6730, transparent)" }}
                  aria-hidden="true"
                />
              </span>
            </h2>

            <p
              className="mt-5 text-[#3F3A2F] leading-relaxed max-w-xl mx-auto"
              style={{ fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)" }}
            >
              Quick answers to common questions about posting tours, booking,
              and using the map system.
            </p>
          </div>

          {/* Accordion */}
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
                    <span
                      className="font-bold text-[#2B2B2B]"
                      style={{ fontSize: "clamp(0.92rem, 1.4vw, 1.05rem)" }}
                    >
                      {faq.question}
                    </span>
                    <span className="faq-icon">
                      <FaChevronDown />
                    </span>
                  </button>

                  {/* Answer panel */}
                  <div
                    id={`faq-answer-${index}`}
                    className="overflow-hidden px-7"
                    style={{
                      height: open ? getHeight(index) : 0,
                      transition: "height 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <div ref={(el) => (contentRefs.current[index] = el)} className="pb-6">
                      <p
                        className="text-[#3F3A2F] leading-relaxed"
                        style={{ fontSize: "clamp(0.85rem, 1.3vw, 0.97rem)" }}
                      >
                        {faq.answer}
                      </p>
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