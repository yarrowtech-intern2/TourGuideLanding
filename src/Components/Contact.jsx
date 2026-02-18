import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiSend, FiClock, FiPhone, FiMail,
  FiMapPin, FiUser, FiMessageSquare,
  FiCheckCircle, FiAlertCircle, FiX,
} from "react-icons/fi";

const INITIAL_FORM = { name: "", mobile: "", email: "", message: "" };

/* ─── Toast — same logic, refined visuals ─── */
const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  const ok = toast.type === "success";
  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 9999,
        display: "flex", alignItems: "flex-start", gap: 12,
        padding: "18px 20px 22px",
        borderRadius: 16, minWidth: 300, maxWidth: 380,
        background: "#fff",
        borderLeft: `3px solid ${ok ? "#10b981" : "#ef4444"}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
        animation: "toastSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        overflow: "hidden",
        fontFamily: "'Jost', sans-serif",
      }}
    >
      <span style={{ marginTop: 1, flexShrink: 0 }}>
        {ok ? <FiCheckCircle size={20} color="#10b981" /> : <FiAlertCircle size={20} color="#ef4444" />}
      </span>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a", margin: 0, letterSpacing: "0.02em" }}>
          {ok ? "Message Sent!" : "Error"}
        </p>
        <p style={{ fontSize: 12, color: "#666", margin: "4px 0 0", lineHeight: 1.55 }}>
          {toast.msg}
        </p>
      </div>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", padding: 2, flexShrink: 0, transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#999")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
      >
        <FiX size={15} />
      </button>
      <div style={{
        position: "absolute", bottom: 0, left: 0, height: 2,
        background: ok ? "#10b981" : "#ef4444",
        animation: "toastProgress 5s linear forwards",
        borderRadius: "0 0 0 16px",
      }} />
    </div>
  );
};

/* ─── Main ─── */
const ContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState(null);
  const timerRef = useRef(null);

  const showToast = (type, msg) => {
    clearTimeout(timerRef.current);
    setToast({ type, msg });
    timerRef.current = setTimeout(() => setToast(null), 5000);
  };
  const closeToast = () => { clearTimeout(timerRef.current); setToast(null); };

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-out-cubic", once: true, offset: 80 });
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!formData.name.trim())    return showToast("error", "Please enter your full name."), false;
    if (!formData.mobile.trim())  return showToast("error", "Please enter your mobile number."), false;
    if (!/^[0-9]{10}$/.test(formData.mobile.trim()))
      return showToast("error", "Enter a valid 10-digit mobile number."), false;
    if (!formData.email.trim())   return showToast("error", "Please enter your email address."), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      return showToast("error", "Enter a valid email address."), false;
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    setLoading(true);

    await fetch(`${import.meta.env.VITE_SCRIPT_URL}`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        project: "BP_CONTACT", // ✅ routes to "Better Pass Contact" sheet
      }),
    });

    setFormData(INITIAL_FORM);
    showToast("success", "Message sent! Our team will contact you shortly.");
  } catch (err) {
    console.error(err);
    showToast("error", "Submission failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const infoItems = [
    { Icon: FiClock,  title: "Quick Response",            sub: "We respond within 24 hours",     href: null },
    { Icon: FiPhone,  title: "+91 98305 90929",           sub: "Mon–Sat, 11 AM – 7 PM",          href: "tel:+919830590929" },
    { Icon: FiMail,   title: "support@exploremore.com",   sub: "Drop us an email anytime",        href: "mailto:support@exploremore.com" },
    { Icon: FiMapPin, title: "Kolkata, WB 700087",        sub: "3A, Bertram St, Esplanade",       href: "https://www.google.com/maps/search/?api=1&query=3A,+Bertram+St,+Esplanade,+Kolkata,+West+Bengal+700087" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        #contact { font-family: 'Jost', sans-serif; }
        #contact .ff-display { font-family: 'Cormorant Garamond', Georgia, serif; }

        #contact .dot-pattern {
          background-image: radial-gradient(rgba(122,103,48,0.16) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* ── Toast animations ── */
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(60px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }

        /* ── Info card ── */
        .info-card {
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(255,255,255,0.90);
          border-radius: 16px; padding: 16px 20px;
          display: flex; align-items: center; gap: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(122,103,48,0.04);
          transition: transform 0.30s ease, box-shadow 0.30s ease, border-color 0.30s ease;
          text-decoration: none;
        }
        .info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.10), 0 2px 8px rgba(122,103,48,0.08);
          border-color: rgba(122,103,48,0.20);
        }
        .info-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: 0 6px 18px rgba(122,103,48,0.28);
        }
        .info-title {
          font-family: 'Jost', sans-serif;
          font-size: 0.88rem; font-weight: 600; color: #2B2B2B;
        }
        .info-sub {
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem; color: #6b6352; margin-top: 2px;
          letter-spacing: 0.01em;
        }

        /* ── Form fields ── */
        .cf-field { display: flex; flex-direction: column; gap: 6px; }
        .cf-label {
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: #4a4438;
        }
        .cf-label span { color: #c0392b; margin-left: 2px; }

        .cf-input-wrap {
          display: flex; align-items: center; gap: 10px;
          background: #fdfcf7;
          border: 1.5px solid #e8e2cc;
          border-radius: 12px; padding: 0 14px;
          transition: border-color 0.28s, box-shadow 0.28s, background 0.28s;
        }
        .cf-input-wrap:focus-within {
          border-color: #7A6730;
          background: #fff;
          box-shadow: 0 0 0 3.5px rgba(122,103,48,0.11);
        }
        .cf-input-wrap svg { color: rgba(122,103,48,0.50); flex-shrink: 0; }
        .cf-input-wrap input,
        .cf-input-wrap textarea {
          flex: 1; border: none; outline: none;
          background: transparent;
          font-size: 0.9rem; color: #2B2B2B;
          padding: 13px 0; font-family: 'Jost', sans-serif; resize: none;
        }
        .cf-input-wrap textarea { padding: 12px 0; }
        .cf-input-wrap input::placeholder,
        .cf-input-wrap textarea::placeholder { color: rgba(122,103,48,0.38); }

        /* ── Submit button ── */
        .cf-submit {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #7A6730 0%, #b09040 60%, #8a7535 100%);
          color: #fff; font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          border: none; border-radius: 12px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          position: relative; overflow: hidden;
          transition: box-shadow 0.35s ease, transform 0.25s ease, opacity 0.3s;
          box-shadow: 0 8px 28px rgba(122,103,48,0.32);
        }
        .cf-submit:hover:not(:disabled) {
          box-shadow: 0 14px 40px rgba(122,103,48,0.48);
          transform: translateY(-2px);
        }
        .cf-submit:disabled { opacity: 0.72; cursor: not-allowed; }
        .cf-submit .shine {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .cf-submit:hover .shine { opacity: 1; }
      `}</style>

      <Toast toast={toast} onClose={closeToast} />

      <section
        id="contact"
        className="relative w-full overflow-hidden py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
        style={{ background: "linear-gradient(150deg, #f8f5e4 0%, #ede9d0 45%, #ddd7bb 100%)" }}
      >
        {/* ── Dot texture ── */}
        <div className="dot-pattern absolute inset-0 pointer-events-none opacity-60" aria-hidden="true" />

        {/* ── Blobs ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(191,174,112,0.28) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(122,103,48,0.22) 0%, transparent 70%)" }} />
          <div className="absolute top-1/2 left-0 right-0 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(122,103,48,0.09) 30%, rgba(122,103,48,0.09) 70%, transparent)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto">

          {/* ── Heading ── */}
          <div className="text-center mb-14" data-aos="fade-up">

            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-px"
                style={{ background: "linear-gradient(to right, rgba(122,103,48,0.2), #7A6730)" }} aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-[0.28em] uppercase"
                style={{ color: "#7A6730", fontFamily: "'Jost', sans-serif" }}>
                Get In Touch
              </span>
              <div className="w-10 h-px"
                style={{ background: "linear-gradient(to left, rgba(122,103,48,0.2), #7A6730)" }} aria-hidden="true" />
            </div>

            <h2
              className="ff-display font-light text-[#2B2B2B] leading-tight mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}
            >
              Contact{" "}
              <span className="relative inline-block italic" style={{ color: "#7A6730" }}>
                Us
                <span className="absolute left-0 -bottom-1 w-full h-[1.5px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #7A6730, rgba(122,103,48,0.15))" }} aria-hidden="true" />
              </span>
            </h2>

            <div className="mx-auto w-14 h-px rounded-full"
              style={{ background: "linear-gradient(to right, transparent, rgba(43,43,43,0.2), transparent)" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* ── LEFT ── */}
            <div data-aos="fade-right" className="flex flex-col gap-4">

              {/* Hero card */}
              <div
                className="relative overflow-hidden rounded-2xl p-8"
                style={{ background: "linear-gradient(135deg, #5c3f1a 0%, #8a6828 50%, #c4a84a 100%)" }}
              >
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full"
                  style={{ background: "rgba(255,255,255,0.07)" }} aria-hidden="true" />
                <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)" }} aria-hidden="true" />
                {/* Dot pattern overlay */}
                <div className="absolute inset-0 opacity-10 dot-pattern" aria-hidden="true" />

                <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}>
                  <FiSend size={20} color="#fff" />
                </div>

                <h3 className="relative ff-display font-light text-white mb-3 leading-tight"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)" }}>
                  Let's <em className="italic">Connect</em>
                </h3>
                <p className="relative leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.80)", fontSize: "0.9rem", fontFamily: "'Jost', sans-serif" }}>
                  Have questions, travel ideas, or custom tour requirements?
                  Fill out the form and our team will reach out shortly.
                </p>

                {/* Bottom accent line */}
                <div className="relative mt-6 w-10 h-px"
                  style={{ background: "rgba(255,255,255,0.35)" }} aria-hidden="true" />
              </div>

              {/* Info cards */}
              {infoItems.map(({ Icon, title, sub, href }) => {
                const Wrapper = href ? "a" : "div";
                const extraProps = href
                  ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noopener noreferrer" : undefined }
                  : {};
                return (
                  <Wrapper key={title} className="info-card" {...extraProps}>
                    <div className="info-icon"
                      style={{ background: "linear-gradient(135deg, #7A6730, #c4a84a)" }}>
                      <Icon size={18} color="#fff" />
                    </div>
                    <div>
                      <p className="info-title">{title}</p>
                      <p className="info-sub">{sub}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* ── RIGHT — Form ── */}
            <form
              data-aos="fade-left"
              data-aos-delay="120"
              onSubmit={handleSubmit}
              noValidate
              style={{
                background: "rgba(255,255,255,0.78)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.92)",
                borderRadius: 22,
                padding: "40px 36px",
                boxShadow: "0 8px 48px rgba(0,0,0,0.09), 0 2px 12px rgba(122,103,48,0.06)",
              }}
            >
              {/* Gold gradient top bar */}
              <div className="w-full h-[2px] rounded-full mb-8"
                style={{ background: "linear-gradient(90deg, #7A6730, #c4a84a, rgba(122,103,48,0.1))" }}
                aria-hidden="true" />

              {/* Name + Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="cf-field">
                  <label className="cf-label">Full Name <span>*</span></label>
                  <div className="cf-input-wrap">
                    <FiUser size={14} />
                    <input type="text" name="name" placeholder="Enter Your Name"
                      value={formData.name} onChange={handleChange} autoComplete="name" />
                  </div>
                </div>

                <div className="cf-field">
                  <label className="cf-label">Mobile No <span>*</span></label>
                  <div className="cf-input-wrap">
                    <FiPhone size={14} />
                    <input type="tel" name="mobile" placeholder="Enter Your Mobile No"
                      value={formData.mobile} onChange={handleChange} maxLength={10} autoComplete="tel" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="cf-field mb-5">
                <label className="cf-label">Email Address <span>*</span></label>
                <div className="cf-input-wrap">
                  <FiMail size={14} />
                  <input type="email" name="email" placeholder="Enter Your Mail "
                    value={formData.email} onChange={handleChange} autoComplete="email" />
                </div>
              </div>

              {/* Message */}
              <div className="cf-field mb-7">
                <label className="cf-label">Message</label>
                <div className="cf-input-wrap" style={{ alignItems: "flex-start", paddingTop: 2 }}>
                  <FiMessageSquare size={14} style={{ marginTop: 13 }} />
                  <textarea name="message" rows={4}
                    placeholder="Write your message or travel requirements..."
                    value={formData.message} onChange={handleChange} />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="cf-submit" disabled={loading}>
                <span className="shine" aria-hidden="true" />
                <span style={{ position: "relative" }}>
                  {loading ? "Sending…" : "Send Message"}
                </span>
                {!loading && <FiSend size={14} style={{ position: "relative" }} />}
              </button>
            </form>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;