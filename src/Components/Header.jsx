import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Image/logo.png";
import BecomePartner from "./BecomePartner";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Partners", id: "partners" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const HEADER_HEIGHT = 96;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [partnerPopup, setPartnerPopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
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
        className={`
          fixed top-0 left-0 w-full z-[999]
          bg-gradient-to-r from-[#d8b04a] via-[#e8c86a] to-[#d8b04a]
          transition-all duration-300
          ${isScrolled ? "shadow-xl" : ""}
        `}
      >
        {/* ✅ TOP BAR ONLY (height fixed) */}
        <div
          className={`
            w-full transition-all duration-300
            ${isScrolled ? "py-2" : "py-4"}
          `}
          style={{ minHeight: HEADER_HEIGHT }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
            {/* LOGO */}
            <div
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-10 sm:h-12 drop-shadow-md"
                draggable="false"
              />
              <span className="text-lg sm:text-2xl font-extrabold text-white drop-shadow">
                The Better Pass
              </span>
            </div>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={`
                      cursor-pointer
                      text-sm font-semibold transition
                      ${
                        isActive
                          ? "text-black font-extrabold underline underline-offset-8"
                          : "text-white hover:text-black"
                      }
                    `}
                  >
                    {link.label}
                  </button>
                );
              })}

              {/* POPUP OPEN BUTTON */}
              <button
                type="button"
                onClick={() => setPartnerPopup(true)}
                className="
                  ml-2 px-5 py-2 rounded-full
                  bg-white text-[#2a1608]
                  font-extrabold shadow-md
                  hover:shadow-lg hover:-translate-y-[1px]
                  transition cursor-pointer
                "
              >
                Become a Partner
              </button>
            </nav>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              className="md:hidden text-white text-2xl cursor-pointer"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* ✅ MOBILE MENU (Now inside header background) */}
        <div
          className={`
            md:hidden w-full
            transition-all duration-300 overflow-hidden
            ${mobileOpen ? "max-h-[750px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={`
                    cursor-pointer text-left text-base font-semibold transition
                    ${
                      isActive
                        ? "text-black font-extrabold"
                        : "text-white hover:text-black"
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
                mt-2 w-full px-5 py-3 rounded-xl
                bg-white text-[#2a1608]
                font-extrabold shadow-md
                hover:shadow-lg transition cursor-pointer
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
          {/* Background */}
          <div
            onClick={() => setPartnerPopup(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <div className="relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">
            {/* Close Button */}
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
