import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/Image/logo.png";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Partners", id: "partners" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Active section observer ONLY on Home page
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [location.pathname]);

  const scrollToSection = (id) => {
    setMobileOpen(false);

    // If user is NOT on Home page, go Home first
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;

        const HEADER_OFFSET = 80;
        const y =
          el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

        window.scrollTo({ top: y, behavior: "smooth" });
      }, 200);

      return;
    }

    // If already on Home page, scroll normally
    const el = document.getElementById(id);
    if (!el) return;

    const HEADER_OFFSET = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500
        transition-all duration-300
        ${isScrolled ? "shadow-lg py-2" : "py-4"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* LOGO */}
        <div
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <img src={logo} alt="Logo" className="h-10 sm:h-12" />
          <span className="text-lg sm:text-2xl font-extrabold text-white">
            The Better Pass
          </span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-semibold transition ${
                location.pathname !== "/"
                  ? "text-white hover:text-yellow-300"
                  : activeSection === link.id
                  ? "text-yellow-300"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-left text-base font-semibold transition ${
                location.pathname !== "/"
                  ? "text-white hover:text-yellow-300"
                  : activeSection === link.id
                  ? "text-yellow-300"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
