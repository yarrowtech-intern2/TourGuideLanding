import React, { useEffect, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar, FaRegStar } from "react-icons/fa";

import Gondhoraj from "../assets/Image/Gondhoraj.webp";
import Scoop from "../assets/Image/Scoop.png";
import GinkoBar from "../assets/Image/GinkoBar.webp";
import Ginko from "../assets/Image/Ginko.png";

const Stars = ({ value }) => {
  const full  = Math.floor(value);
  const empty = 5 - full;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full  }).map((_, i) => <FaStar    key={`f-${i}`} className="text-yellow-400 text-xs" />)}
      {Array.from({ length: empty }).map((_, i) => <FaRegStar key={`e-${i}`} className="text-yellow-400 text-xs" />)}
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
    description: `Gondhoraaj Kolkata is a cherished culinary destination known for its warm ambience, refined flavours, and signature Kolkata-style hospitality. Inspired by the city's timeless charm, the restaurant blends tradition with a modern dining experience.

From aromatic Bengali delicacies to contemporary favourites, Gondhoraaj crafts each dish with care—much like the fragrant lime it is named after. Whether you're planning a family dinner, a friendly catch-up, or a quiet personal retreat, the restaurant offers the perfect space to unwind.`,
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
    description: `Dive into a creamy world of flavours at Scoop, one of Kolkata's classic dessert destinations. This activity offers a curated tasting of Scoop's most loved ice-creams, sundaes, and frozen treats—perfect for dessert lovers, families, and fun weekend outings.

Enjoy everything from classic vanilla scoops to rich chocolate sundaes, fruity sorbets, and their iconic ice-cream combos that have made Scoop a favourite in the New Market area.`,
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
    description: `Step into the stylish bar-lounge of Miss Ginko after dusk, where Asian-fusion flavours meet handcrafted cocktails and music in a chic setting. Lounge on velvet sofas or high-chairs overlooking Rash Behari Avenue, sip signature drinks, and soak in the vibrant nightlife scene.

Ideal for friends, date nights, or anyone looking for a premium bar experience in Kolkata.`,
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
    description: `Spend a peaceful evening at Miss Ginko — one of Kolkata's most aesthetic and calming cafés. Enjoy handcrafted coffees, Japanese-inspired beverages, cold brews, and their signature matcha creations in a beautifully decorated ambience.

Perfect for solo coffee lovers, study sessions, café dates, and aesthetic photography.`,
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
        .activity-card {
          background: rgba(255,255,255,0.82);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 28px rgba(0,0,0,0.08);
          transition: transform 0.35s cubic-bezier(0.34,1.26,0.64,1),
                      box-shadow 0.35s ease;
        }
        @media (hover: hover) {
          .activity-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 56px rgba(0,0,0,0.13);
          }
          .activity-card:hover .activity-img {
            transform: scale(1.06);
          }
        }
        .activity-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }
        .highlight-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #7A6730;
          flex-shrink: 0;
          margin-top: 6px;
        }
      `}</style>

      <section
        id="activities"
        className="relative w-full min-h-screen overflow-hidden pt-24 pb-20"
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

          {/* Heading */}
          <div className="text-center mb-14" data-aos="fade-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
              <span className="text-[#7A6730] text-[11px] font-medium tracking-[0.22em] uppercase">
                Experiences
              </span>
              <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
            </div>
            <h2
              className="font-extrabold text-[#1f1408] leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            >
              Our{" "}
              <span className="relative inline-block text-[#7A6730]">
                Activities
                <span
                  className="absolute left-0 -bottom-1 w-full h-0.5 rounded"
                  style={{ background: "linear-gradient(90deg, #7A6730, transparent)" }}
                  aria-hidden="true"
                />
              </span>
            </h2>
            <p
              className="mt-5 text-[#3F3A2F] leading-relaxed max-w-2xl mx-auto"
              style={{ fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)" }}
            >
              Restaurants, cafés, dessert experiences, and nightlife — all in one place.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {ACTIVITIES.map((a, idx) => (
              <div
                key={a.id}
                className="activity-card"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img src={a.image} alt={a.title} draggable="false" className="activity-img" />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)" }}
                    aria-hidden="true"
                  />

                  {/* Category tag */}
                  <span
                    className="absolute top-4 left-4 text-white text-[10px] font-semibold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {a.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">

                  {/* Title */}
                  <h3
                    className="font-extrabold text-[#1f1408] leading-snug"
                    style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
                  >
                    {a.title}
                  </h3>

                  {/* Rating */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Stars value={a.rating} />
                    <span className="text-sm font-bold text-[#1f1408]">{a.rating.toFixed(1)}</span>
                    <span className="text-xs text-[#6b6352]">({a.reviews} reviews)</span>
                  </div>

                  {/* Divider */}
                  <div
                    className="my-4 w-10 h-0.5 rounded"
                    style={{ background: "linear-gradient(90deg, #7A6730, transparent)" }}
                    aria-hidden="true"
                  />

                  {/* Description */}
                  <p
                    className="text-[#3F3A2F] leading-relaxed whitespace-pre-line"
                    style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)" }}
                  >
                    {a.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-6">
                    <p className="text-xs font-bold text-[#1f1408] tracking-[0.14em] uppercase mb-3">
                      Highlights
                    </p>
                    <ul className="space-y-2">
                      {a.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="highlight-dot" aria-hidden="true" />
                          <span className="text-[#3F3A2F]" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
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