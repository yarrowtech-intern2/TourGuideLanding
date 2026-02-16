import React, { useEffect, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar, FaRegStar } from "react-icons/fa";

// ✅ IMPORT YOUR IMAGES HERE
import Gondhoraj from "../assets/Image/Gondhoraj.webp";
import Scoop from "../assets/Image/Scoop.png";
import GinkoBar from "../assets/Image/GinkoBar.webp";
import Ginko from "../assets/Image/Ginko.png";

const Stars = ({ value }) => {
  const full = Math.floor(value);
  const empty = 5 - full;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`f-${i}`} className="text-yellow-400 text-sm" />
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e-${i}`} className="text-yellow-400 text-sm" />
      ))}
    </div>
  );
};

const Activity = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  const activities = useMemo(
    () => [
      {
        id: 1,
        title: "Gondhoraaj - have a taste",
        rating: 5.0,
        reviews: 100,
        image: Gondhoraj,
        description: `Gondhoraaj Kolkata is a cherished culinary destination known for its warm ambience, refined flavours, and signature Kolkata-style hospitality. Inspired by the city’s timeless charm, the restaurant blends tradition with a modern dining experience.

From aromatic Bengali delicacies to contemporary favourites, Gondhoraaj crafts each dish with care—much like the fragrant lime it is named after. Whether you’re planning a family dinner, a friendly catch-up, or a quiet personal retreat, the restaurant offers the perfect space to unwind.

With inviting interiors, courteous service, and food that feels like home, Gondhoraaj Kolkata stands as a go-to choice for those who love authentic taste wrapped in elegance.`,
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
        title: "Scoop Ice Cream Tasting and Dessert Experience",
        rating: 4.9,
        reviews: 120,
        image: Scoop,
        description: `Dive into a creamy world of flavours at Scoop, one of Kolkata’s classic dessert destinations. This activity offers a curated tasting of Scoop’s most loved ice-creams, sundaes, and frozen treats—perfect for dessert lovers, families, and fun weekend outings.

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
        description: `Step into the stylish bar-lounge of Miss Ginko after dusk, where Asian-fusion flavours meet handcrafted cocktails and music in a chic setting. Lounge on velvet sofas or high-chairs overlooking Rash Behari Avenue, sip signature drinks like the “Bee’s Knees” (honey-gin cocktail) or a Roku gin mix, play DJ-driven beats, and soak in the vibrant nightlife scene.

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
        description: `Spend a peaceful evening at Miss Ginko — one of Kolkata’s most aesthetic and calming cafés. Enjoy handcrafted coffees, Japanese-inspired beverages, cold brews, and their signature matcha creations in a beautifully decorated ambience.

Perfect for: Solo coffee lovers, study sessions, café dates, and aesthetic photography.`,
        highlights: [
          "Cozy aesthetic décor",
          "Books, lights, and floral interiors",
          "Signature Matcha Latte",
          "Desserts & smoothies",
          "Perfect for Instagram photos",
        ],
      },
    ],
    []
  );

  return (
    <section
      id="activities"
      className="
        relative w-full min-h-screen overflow-hidden
        pt-24 pb-16
        bg-gradient-to-br from-[#f5f2dc] via-[#e6e2c8] to-[#d7d1b0]
      "
    >
      {/* Decorative blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-96 h-96 bg-[#bfae70]/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-[#8c7a3d]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6">
        {/* TITLE */}
        <div className="text-center" data-aos="fade-up">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1f1408]">
            Our <span className="text-[#7A6730]">Activities</span>
          </h1>
          <p className="mt-2 text-sm xs:text-base sm:text-lg text-[#3F3A2F] max-w-2xl mx-auto">
            Restaurants, cafés, dessert experiences, and nightlife — all in one
            place.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7">
          {activities.map((a, idx) => (
            <div
              key={a.id}
              data-aos="fade-up"
              data-aos-delay={idx * 120}
              className="
                bg-white/85 backdrop-blur-xl
                rounded-3xl overflow-hidden
                shadow-lg border border-white/60
                transition-all duration-300
                md:hover:-translate-y-2 md:hover:shadow-2xl
              "
            >
              {/* IMAGE */}
              <div className="relative h-56 xs:h-60 sm:h-64 w-full bg-white">
                <img
                  src={a.image}
                  alt={a.title}
                  draggable="false"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h2 className="text-xl font-extrabold text-[#1f1408]">
                  {a.title}
                </h2>

                {/* RATING */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Stars value={a.rating} />
                  <span className="text-sm font-bold text-[#1f1408]">
                    {a.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({a.reviews} reviews)
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-4 text-[13px] text-[#3F3A2F] leading-relaxed whitespace-pre-line text-justify">
                  {a.description}
                </p>

                {/* HIGHLIGHTS */}
                <div className="mt-6">
                  <p className="text-sm font-extrabold text-[#1f1408] mb-2">
                    Highlights
                  </p>
                  <ul className="space-y-2">
                    {a.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-[13px] text-[#3F3A2F] flex items-start gap-2"
                      >
                        <span className="mt-[6px] w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
                        {h}
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
  );
};

export default Activity;
