import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaTimes, FaArrowUp, FaPhoneAlt } from "react-icons/fa";

const RightSideFloating = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      
      // On homepage, show after 100px. On other pages, show immediately if there's any scroll potential
      if (location.pathname !== "/") {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(scrollPos > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToTop = () => {
    const heroElement = document.getElementById("home");
    if (heroElement) {
      const y = heroElement.getBoundingClientRect().top + window.scrollY - 96; // 96 is header height
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        /* ── Premium Glassmorphic Base ── */
        .glass-fab {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        }
        
        /* ── Spring Animations ── */
        .spring-transition {
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        /* ── Continuous Pulse Effect ── */
        @keyframes soft-pulse {
          0% { box-shadow: 0 0 0 0 rgba(200, 169, 110, 0.5); }
          70% { box-shadow: 0 0 0 15px rgba(200, 169, 110, 0); }
          100% { box-shadow: 0 0 0 0 rgba(200, 169, 110, 0); }
        }
        .fab-pulse {
          animation: soft-pulse 2.5s infinite;
        }

        /* ── Hover Lift for Child Buttons ── */
        .fab-btn {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
        }
        .fab-btn:hover {
          transform: scale(1.12) translateY(-3px);
        }
      `}</style>

      {/* ── Scroll to Top Button (Tir Icon) ── */}
      <div className="fixed right-5 sm:right-8 bottom-[92px] sm:bottom-[100px] z-[9999]">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to Top"
          className={`group relative w-12 h-12 rounded-full flex items-center justify-center bg-[#2B2B2B] shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden spring-transition
            ${
              showScrollTop
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-8 scale-50 pointer-events-none"
            }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#7A6730] to-[#D4B572] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <FaArrowUp
            size={20}
            className="relative z-10 text-[#C8A96E] group-hover:text-white transition-colors duration-300"
          />
        </button>
      </div>

      {/* ── Main Contact FAB ── */}
      <div
        className="fixed right-5 sm:right-8 bottom-6 sm:bottom-8 z-[9999] flex flex-col items-center gap-4"
      >
        {/* ── Expanding Child Buttons ── */}
        <div
          className={`flex flex-col gap-3 origin-bottom spring-transition
            ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-50 translate-y-12 pointer-events-none"
            }`}
        >
          {/* WhatsApp */}
          <a
            href="https://wa.me/919830590929"
            target="_blank"
            rel="noreferrer"
            className="fab-btn group relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_8px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_25px_rgba(37,211,102,0.5)]"
            title="Chat on WhatsApp"
            onClick={() => setIsOpen(false)}
          >
            <FaWhatsapp size={24} />
            <span className="absolute right-16 bg-white/95 backdrop-blur-md text-[#2B2B2B] px-4 py-2 rounded-xl text-[13px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none border border-gray-100 tracking-wide font-sans">
              WhatsApp Us
              <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white/95 rotate-45 border-r border-t border-gray-100" />
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:support@betterpass.com"
            className="fab-btn group relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#EA4335] to-[#FF6B6B] text-white shadow-[0_8px_20px_rgba(234,67,53,0.3)] hover:shadow-[0_12px_25px_rgba(234,67,53,0.5)]"
            title="Send Email"
            onClick={() => setIsOpen(false)}
          >
            <FaEnvelope size={20} />
            <span className="absolute right-16 bg-white/95 backdrop-blur-md text-[#2B2B2B] px-4 py-2 rounded-xl text-[13px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none border border-gray-100 tracking-wide font-sans">
              Email Us
              <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white/95 rotate-45 border-r border-t border-gray-100" />
            </span>
          </a>
        </div>

        {/* ── Main Toggle Button ── */}
        <button
          className={`glass-fab fab-pulse relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden group transition-all duration-300 ${
            isOpen ? "scale-105" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Contact Menu"
        >
          <div
            className="absolute inset-0 bg-gradient-to-tr from-[#7A6730] to-[#D4B572] transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br from-[#128C7E] to-[#25D366] transition-opacity duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            className={`absolute text-white spring-transition transform ${
              isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          >
            <FaPhoneAlt size={22} />
          </div>
          <div
            className={`absolute text-white spring-transition transform ${
              isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          >
            <FaTimes size={24} />
          </div>
        </button>
      </div>
    </>
  );
};

export default RightSideFloating;
