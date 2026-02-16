import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const faqs = [
  {
    question: "As a tour company, how does post a tour?",
    answer:
      "In order to post a tour, open our app and navigate to the 'tours' section of the app and tap on 'Post New Tour' button. Fill in the details, upload an image if posssible and tap on 'Create Post Button'. Your tour is now visible to all our users.",
  },
  {
    question: "As an user, how do I book a tour?",
    answer:
      "You may press on the 'Book Now' button. Alternatively tap on the tour that you choose, choose the number of guest and press 'Confirm Booking' button.",
  },
  {
    question: "How do I use the maps?",
    answer:
      "Tap on the last button of the nav bar, and then search the name of the place. A list of suggestions appear select on tap on the one that marketless your searched destination. That location will be displayed on the maps.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const getHeight = (index) => {
    const el = contentRefs.current[index];
    return el ? el.scrollHeight : 0;
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <section
      id="faq"
      className="
        relative w-full overflow-hidden
        bg-gradient-to-br from-[#f5f2dc] via-[#e6e2c8] to-[#d7d1b0]
        py-16 sm:py-20 lg:py-28
        px-3 xs:px-4 sm:px-6 lg:px-8
      "
    >
      {/* Decorative blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-96 h-96 bg-[#bfae70]/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-[#8c7a3d]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-10 sm:mb-14" data-aos="fade-up">
          <h2
            className="
              text-3xl sm:text-4xl lg:text-5xl
              font-extrabold
              text-[#2B2B2B]
            "
          >
            Frequently <span className="text-[#7A6730]">Asked Questions</span>
          </h2>

          <p className="mt-4 text-sm sm:text-lg text-[#3F3A2F] max-w-3xl mx-auto">
            Quick answers to common questions about posting tours, booking, and
            using the map system.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                className="
                  bg-white/85 backdrop-blur-xl
                  shadow-lg
                  rounded-2xl
                  overflow-hidden
                  border border-white/60
                  transition-all duration-300
                  md:hover:shadow-2xl
                "
              >
                {/* QUESTION */}
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="
                    w-full flex items-center justify-between
                    px-5 sm:px-7 py-5 sm:py-6
                    text-left
                    focus:outline-none
                  "
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-[15px] sm:text-lg font-bold text-[#2B2B2B]">
                    {faq.question}
                  </span>

                  <FaChevronDown
                    className={`
                      text-[#7A6730]
                      transition-transform duration-300
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {/* ANSWER (NO CUT FIX) */}
                <div
                  className="px-5 sm:px-7 overflow-hidden"
                  style={{
                    height: isOpen ? getHeight(index) : 0,
                    transition:
                      "height 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div
                    ref={(el) => (contentRefs.current[index] = el)}
                    className="pb-5 sm:pb-6"
                  >
                    <p className="text-sm sm:text-base text-[#3F3A2F] leading-relaxed">
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
  );
};

export default FAQ;
