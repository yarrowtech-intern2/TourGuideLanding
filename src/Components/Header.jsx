import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Image/Logo.png";
import BecomePartner from "./BecomePartner";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Partners", id: "partners" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const HEADER_HEIGHT = 80;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [partnerPopup, setPartnerPopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Shadow & Background toggle on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ✅ Active section detect (only on homepage)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [location.pathname]);

  // ✅ Disable scroll when popup open
  useEffect(() => {
    if (!partnerPopup) return;

    const originalBody = document.body.style.overflow;
    const originalHtml = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBody || "";
      document.documentElement.style.overflow = originalHtml || "";
    };
  }, [partnerPopup]);

  // ✅ Close mobile menu on scroll
  useEffect(() => {
    if (!mobileOpen) return;

    const handleScroll = () => {
      setMobileOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  // ✅ ESC close popup
  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape") setPartnerPopup(false);
    };

    if (partnerPopup) window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [partnerPopup]);

  // ✅ Scroll to section
  const scrollToSection = (id) => {
    setMobileOpen(false);

    const go = () => {
      const el = document.getElementById(id);
      if (!el) return;

      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(go, 350);
    } else {
      go();
    }
  };

  return (
    <>
      <header
        style={{ height: HEADER_HEIGHT }}
        className={`
          fixed top-0 left-0 w-full z-[999]
          transition-all duration-300
          ${
            isScrolled
              ? "bg-white/40 backdrop-blur-md border-b border-[#7A6730]/20 shadow-sm"
              : "bg-transparent border-b border-transparent shadow-none"
          }
        `}
      >
        {/* FIXED HEIGHT HEADER CONTENT */}
        <div className="w-full h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 sm:px-6">
            {/* LOGO */}
            <div
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <img
                src={logo}
                alt="Logo"
                className={`
                  h-12 sm:h-14 md:h-16 lg:h-20
                  w-auto object-contain
                  hover:scale-105 transition-transform duration-200
                  ${
                    isScrolled
                      ? "drop-shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                      : "drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                  }
                `}
                draggable="false"
              />
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={`
                      cursor-pointer
                      text-xs sm:text-sm font-bold transition-all duration-200
                      ${
                        isScrolled
                          ? isActive
                            ? "text-[#7A6730] font-extrabold underline underline-offset-4 decoration-[#7A6730] decoration-2"
                            : "text-[#2B2B2B] hover:text-[#7A6730]"
                          : isActive
                          ? "text-[#f5e4b3] font-extrabold underline underline-offset-4 decoration-[#f5e4b3] decoration-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
                          : "text-white hover:text-[#f5e4b3] drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
                      }
                    `}
                  >
                    {link.label}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setPartnerPopup(true)}
                className={`
                  ml-1 px-4 py-2 rounded-full
                  text-white text-xs sm:text-sm font-extrabold shadow-sm
                  hover:scale-105 transition-all duration-200 cursor-pointer
                  ${
                    isScrolled
                      ? "bg-[#7A6730] hover:bg-[#665526] shadow-md"
                      : "bg-[#7A6730]/90 hover:bg-[#7A6730] border border-white/30 backdrop-blur-md shadow-md"
                  }
                `}
              >
                Become a Partner
              </button>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              className={`md:hidden text-xl cursor-pointer ${
                isScrolled ? "text-[#2B2B2B]" : "text-white drop-shadow-md"
              }`}
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
            md:hidden w-full
            transition-all duration-300 overflow-hidden
            ${mobileOpen ? "max-h-[750px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div
            className={`
              px-6 pb-6 pt-4 flex flex-col gap-4
              border-t border-[#7A6730]/20
              shadow-2xl bg-white/95 backdrop-blur-lg
            `}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={`
                    cursor-pointer text-left text-sm font-bold transition-all duration-200
                    ${
                      isActive
                        ? "text-[#7A6730] font-extrabold underline underline-offset-4"
                        : "text-[#2B2B2B] hover:text-[#7A6730]"
                    }
                  `}
                >
                  {link.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setPartnerPopup(true);
              }}
              className="
                mt-2 w-full px-4 py-2.5 rounded-xl
                bg-[#7A6730] text-white text-sm font-extrabold shadow-sm
                hover:shadow-md transition cursor-pointer
              "
            >
              Become a Partner
            </button>
          </div>
        </div>
      </header>

      {/* POPUP MODAL */}
      {partnerPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          <div
            onClick={() => setPartnerPopup(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setPartnerPopup(false)}
              className="
                absolute top-4 right-4 z-50
                bg-white text-black
                w-10 h-10 rounded-full
                flex items-center justify-center
                font-bold shadow
                hover:scale-105 transition cursor-pointer
              "
              aria-label="Close popup"
            >
              ✕
            </button>

            <BecomePartner />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
