import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar, FaRegStar } from "react-icons/fa";

import Gondhoraj from "../assets/Image/Gondhoraj.webp";
import Scoop     from "../assets/Image/Scoop.png";
import GinkoBar  from "../assets/Image/GinkoBar.webp";
import Ginko     from "../assets/Image/Ginko.png";

// ── Star renderer — unchanged ─────────────────────────────────────────────────
const Stars = ({ value }) => {
  const full  = Math.floor(value);
  const empty = 5 - full;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full  }).map((_, i) => (
        <FaStar    key={`f-${i}`} className="text-yellow-400 text-xs" />
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e-${i}`} className="text-yellow-400 text-xs" />
      ))}
    </div>
  );
};

const ACTIVITIES = [
  {
    id: 1,
    title: "Gondhoraaj — Have a Taste",
    rating: 5.0,
    reviews: 100,
    image: Gondhoraj,
    category: "Dining",
    num: "01",
    description: `Gondhoraaj Kolkata is a cherished culinary destination known for its warm ambience, refined flavours, and signature Kolkata-style hospitality. Inspired by the city's timeless charm, the restaurant blends tradition with a modern dining experience.\n\nFrom aromatic Bengali delicacies to contemporary favourites, Gondhoraaj crafts each dish with care—much like the fragrant lime it is named after. Whether you're planning a family dinner, a friendly catch-up, or a quiet personal retreat, the restaurant offers the perfect space to unwind.`,
    highlights: [
      "Warm ambience + inviting interiors",
      "Authentic Bengali delicacies",
      "Perfect for family dinners",
      "Courteous service",
      "Food that feels like home",
    ],
  },
  {
    id: 2,
    title: "Scoop Ice Cream Tasting & Dessert Experience",
    rating: 4.9,
    reviews: 120,
    image: Scoop,
    category: "Desserts",
    num: "02",
    description: `Dive into a creamy world of flavours at Scoop, one of Kolkata's classic dessert destinations. This activity offers a curated tasting of Scoop's most loved ice-creams, sundaes, and frozen treats—perfect for dessert lovers, families, and fun weekend outings.\n\nEnjoy everything from classic vanilla scoops to rich chocolate sundaes, fruity sorbets, and their iconic ice-cream combos that have made Scoop a favourite in the New Market area.`,
    highlights: [
      "Choose any 3 Signature Scoops",
      "Try a Mini Sundae (hot chocolate / caramel drizzle)",
      "Fresh waffle chips / brownie bites",
      "Indoor AC seating available",
      "Suitable for kids & couples",
    ],
  },
  {
    id: 3,
    title: "Miss Ginko: Bar and Lounge",
    rating: 4.8,
    reviews: 200,
    image: GinkoBar,
    category: "Nightlife",
    num: "03",
    description: `Step into the stylish bar-lounge of Miss Ginko after dusk, where Asian-fusion flavours meet handcrafted cocktails and music in a chic setting. Lounge on velvet sofas or high-chairs overlooking Rash Behari Avenue, sip signature drinks, and soak in the vibrant nightlife scene.\n\nIdeal for friends, date nights, or anyone looking for a premium bar experience in Kolkata.`,
    highlights: [
      "Full bar with professional mixologists",
      "Signature handcrafted cocktails",
      "Asian small-plates (baos, Korean bites)",
      "Live-music sets (weekend sundowners)",
      "Best vibe after 6 PM",
    ],
  },
  {
    id: 4,
    title: "Miss Ginko Café Experience",
    rating: 4.5,
    reviews: 150,
    image: Ginko,
    category: "Café",
    num: "04",
    description: `Spend a peaceful evening at Miss Ginko — one of Kolkata's most aesthetic and calming cafés. Enjoy handcrafted coffees, Japanese-inspired beverages, cold brews, and their signature matcha creations in a beautifully decorated ambience.\n\nPerfect for solo coffee lovers, study sessions, café dates, and aesthetic photography.`,
    highlights: [
      "Cozy aesthetic décor",
      "Books, lights, and floral interiors",
      "Signature Matcha Latte",
      "Desserts & smoothies",
      "Perfect for Instagram photos",
    ],
  },
];

const Activity = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out-cubic", once: true, offset: 80 });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        #activities { font-family: 'Jost', sans-serif; }
        #activities .ff-display { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── Dot texture ── */
        #activities .dot-pattern {
          background-image: radial-gradient(rgba(122,103,48,0.16) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* ── Card ── */
        .activity-card {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.90);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 4px 30px rgba(0,0,0,0.08), 0 1px 4px rgba(122,103,48,0.06);
          transition:
            transform 0.42s cubic-bezier(0.34,1.26,0.64,1),
            box-shadow 0.42s ease;
          position: relative;
        }

        /* Top accent bar */
        .activity-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(122,103,48,0.7), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 20;
        }

        @media (hover: hover) {
          .activity-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 24px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(122,103,48,0.12);
          }
          .activity-card:hover::before { opacity: 1; }
          .activity-card:hover .activity-img { transform: scale(1.08); }
          .activity-card:hover .card-line { width: 44px; }
        }

        /* ── Image ── */
        .activity-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
          display: block; user-select: none; -webkit-user-drag: none;
        }

        /* ── Category tag ── */
        .card-category-tag {
          position: absolute; top: 14px; left: 14px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.28);
          color: rgba(255,255,255,0.92);
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 99px;
          transition: background 0.3s, border-color 0.3s;
        }
        .activity-card:hover .card-category-tag {
          background: rgba(200,169,110,0.22);
          border-color: rgba(200,169,110,0.50);
        }

        /* ── Ghost number on image ── */
        .card-ghost-num {
          position: absolute; top: 8px; right: 14px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 64px; font-weight: 300; line-height: 1;
          color: rgba(255,255,255,0.08); letter-spacing: -0.04em;
          user-select: none; pointer-events: none;
          transition: color 0.4s;
        }
        .activity-card:hover .card-ghost-num { color: rgba(200,169,110,0.16); }

        /* ── Card underline (below title) ── */
        .card-line {
          width: 32px; height: 1.5px; border-radius: 99px;
          background: linear-gradient(to right, rgba(122,103,48,0.9), rgba(122,103,48,0.2));
          margin-top: 10px;
          transition: width 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        /* ── Highlight dots ── */
        .highlight-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: linear-gradient(135deg, #7A6730, #b09040);
          flex-shrink: 0; margin-top: 7px;
        }

        /* ── Rating badge ── */
        .rating-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 99px;
          background: rgba(122,103,48,0.09);
          border: 1px solid rgba(122,103,48,0.18);
        }
      `}</style>

      <section
        id="activities"
        className="relative w-full min-h-screen overflow-hidden pt-24 pb-24"
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

        {/* ── Blobs ── */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(191,174,112,0.28) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-32 -right-24 w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(122,103,48,0.20) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(122,103,48,0.09) 30%, rgba(122,103,48,0.09) 70%, transparent)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

          {/* ── Section heading ── */}
          <div className="text-center mb-16" data-aos="fade-up">

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
                Experiences
              </span>
              <div
                className="w-10 h-px"
                style={{ background: "linear-gradient(to left, rgba(122,103,48,0.2), #7A6730)" }}
                aria-hidden="true"
              />
            </div>

            {/* Heading */}
            <h2
              className="ff-display font-light text-[#1f1408] leading-tight mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}
            >
              Our{" "}
              <span className="relative inline-block italic" style={{ color: "#7A6730" }}>
                Activities
                <span
                  className="absolute left-0 -bottom-1 w-full h-[1.5px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #7A6730, rgba(122,103,48,0.15))" }}
                  aria-hidden="true"
                />
              </span>
            </h2>

            {/* Rule */}
            <div
              className="mx-auto w-14 h-px rounded-full mb-5"
              style={{ background: "linear-gradient(to right, transparent, rgba(43,43,43,0.2), transparent)" }}
            />

            <p
              className="text-[#3F3A2F] leading-relaxed max-w-xl mx-auto"
              style={{ fontSize: "clamp(0.88rem, 1.4vw, 1.02rem)", fontFamily: "'Jost', sans-serif" }}
            >
              Restaurants, cafés, dessert experiences, and nightlife — all in one place.
            </p>
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {ACTIVITIES.map((a, idx) => (
              <div
                key={a.id}
                className="activity-card"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* ── Image block ── */}
                <div className="relative overflow-hidden" style={{ height: "clamp(200px, 28vw, 270px)" }}>
                  <img
                    src={a.image}
                    alt={a.title}
                    draggable="false"
                    className="activity-img"
                  />

                  {/* Bottom gradient */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent 60%)" }}
                    aria-hidden="true"
                  />

                  {/* Gold shimmer on hover */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 40%, rgba(200,169,110,0.08) 50%, transparent 60%)",
                      opacity: 0,
                      transition: "opacity 0.5s",
                    }}
                    aria-hidden="true"
                  />

                  {/* Category tag */}
                  <span className="card-category-tag">{a.category}</span>

                  {/* Ghost number */}
                  <span className="card-ghost-num">{a.num}</span>
                </div>

                {/* ── Content block ── */}
                <div className="p-6 sm:p-7">

                  {/* Title */}
                  <h3
                    className="ff-display font-normal text-[#1f1408] leading-snug"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.45rem)" }}
                  >
                    {a.title}
                  </h3>

                  {/* Expand line */}
                  <div className="card-line" aria-hidden="true" />

                  {/* Rating */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div className="rating-badge">
                      <Stars value={a.rating} />
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "#7A6730", fontFamily: "'Jost', sans-serif" }}
                      >
                        {a.rating.toFixed(1)}
                      </span>
                    </div>
                    <span
                      className="text-xs"
                      style={{ color: "#6b6352", fontFamily: "'Jost', sans-serif" }}
                    >
                      ({a.reviews} reviews)
                    </span>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-5 w-full h-px rounded"
                    style={{ background: "linear-gradient(to right, rgba(122,103,48,0.15), transparent)" }}
                    aria-hidden="true"
                  />

                  {/* Description */}
                  <p
                    className="text-[#3F3A2F] leading-[1.82] whitespace-pre-line"
                    style={{
                      fontSize: "clamp(0.82rem, 1.15vw, 0.9rem)",
                      fontFamily: "'Jost', sans-serif",
                    }}
                  >
                    {a.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6">
                    <p
                      className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-3"
                      style={{ color: "#7A6730", fontFamily: "'Jost', sans-serif" }}
                    >
                      Highlights
                    </p>

                    {/* Full-width highlight rule */}
                    <div
                      className="w-full h-px mb-4 rounded"
                      style={{
                        background: "linear-gradient(to right, rgba(122,103,48,0.2), transparent)",
                      }}
                      aria-hidden="true"
                    />

                    <ul className="space-y-2.5">
                      {a.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="highlight-dot" aria-hidden="true" />
                          <span
                            className="text-[#3F3A2F]"
                            style={{
                              fontSize: "0.85rem",
                              lineHeight: 1.65,
                              fontFamily: "'Jost', sans-serif",
                            }}
                          >
                            {h}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Activity;