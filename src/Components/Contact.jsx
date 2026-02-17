import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiSend,
  FiClock,
  FiPhone,
  FiMail,
  FiMapPin,
  FiUser,
  FiMessageSquare,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

const INITIAL_FORM = { name: "", mobile: "", email: "", message: "" };

/* ─── Toast ─── */
const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  const ok = toast.type === "success";

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "16px 18px 20px",
        borderRadius: 14,
        minWidth: 300,
        maxWidth: 380,
        background: "#fff",
        borderLeft: `4px solid ${ok ? "#10b981" : "#ef4444"}`,
        boxShadow: "0 16px 48px rgba(0,0,0,0.16)",
        animation:
          "toastSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        overflow: "hidden",
      }}
    >
      <span style={{ marginTop: 1, flexShrink: 0 }}>
        {ok ? (
          <FiCheckCircle size={20} color="#10b981" />
        ) : (
          <FiAlertCircle size={20} color="#ef4444" />
        )}
      </span>

      <div style={{ flex: 1 }}>
        <p
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: "#1a1a1a",
            margin: 0,
          }}
        >
          {ok ? "Success!" : "Error"}
        </p>
        <p
          style={{
            fontSize: 13,
            color: "#555",
            margin: "3px 0 0",
            lineHeight: 1.5,
          }}
        >
          {toast.msg}
        </p>
      </div>

      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#bbb",
          padding: 2,
          flexShrink: 0,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
      >
        <FiX size={16} />
      </button>

      {/* Auto-dismiss progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          background: ok ? "#10b981" : "#ef4444",
          animation: "toastProgress 5s linear forwards",
          borderRadius: "0 0 0 14px",
        }}
      />
    </div>
  );
};

/* ─── Main Component ─── */
const ContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = (type, msg) => {
    clearTimeout(timerRef.current);
    setToast({ type, msg });
    timerRef.current = setTimeout(() => setToast(null), 5000);
  };

  const closeToast = () => {
    clearTimeout(timerRef.current);
    setToast(null);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!formData.name.trim())
      return showToast("error", "Please enter your full name."), false;

    if (!formData.mobile.trim())
      return showToast("error", "Please enter your mobile number."), false;

    if (!/^[0-9]{10}$/.test(formData.mobile.trim()))
      return (
        showToast("error", "Enter a valid 10-digit mobile number."), false
      );

    if (!formData.email.trim())
      return showToast("error", "Please enter your email address."), false;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      return showToast("error", "Enter a valid email address."), false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setFormData(INITIAL_FORM);
      showToast("success", "Message sent! Our team will contact you shortly.");
    }, 1200);
  };

  return (
    <>
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(60px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%;   }
        }

        .cf-field { display: flex; flex-direction: column; gap: 6px; }
        .cf-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase; color: #4a4438;
        }
        .cf-label span { color: #c0392b; margin-left: 2px; }

        .cf-input-wrap {
          display: flex; align-items: center; gap: 10px;
          background: #fff;
          border: 1.5px solid #e8e2cc;
          border-radius: 12px;
          padding: 0 14px;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .cf-input-wrap:focus-within {
          border-color: #7A6730;
          box-shadow: 0 0 0 3px rgba(122,103,48,0.12);
        }
        .cf-input-wrap svg { color: #b0a07a; flex-shrink: 0; }
        .cf-input-wrap input,
        .cf-input-wrap textarea {
          flex: 1; border: none; outline: none;
          background: transparent;
          font-size: 0.9rem; color: #2B2B2B;
          padding: 13px 0; font-family: inherit; resize: none;
        }
        .cf-input-wrap textarea { padding: 12px 0; }
        .cf-input-wrap input::placeholder,
        .cf-input-wrap textarea::placeholder { color: #b0a07a; }

        .cf-submit {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #7A6730 0%, #a08840 100%);
          color: #fff; font-size: 12px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          border: none; border-radius: 12px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          position: relative; overflow: hidden;
          transition: box-shadow 0.3s ease, opacity 0.3s ease;
          box-shadow: 0 6px 20px rgba(122,103,48,0.35);
        }
        .cf-submit:hover:not(:disabled) { box-shadow: 0 10px 30px rgba(122,103,48,0.5); }
        .cf-submit:disabled { opacity: 0.72; cursor: not-allowed; }
        .cf-submit .shine {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%);
          opacity: 0; transition: opacity 0.4s;
        }
        .cf-submit:hover .shine { opacity: 1; }

        .info-card {
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.9);
          border-radius: 16px; padding: 16px 20px;
          display: flex; align-items: center; gap: 16px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
        }
        .info-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
      `}</style>

      {/* Toast */}
      <Toast toast={toast} onClose={closeToast} />

      <section
        id="contact"
        className="relative w-full overflow-hidden py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(135deg, #f5f2dc 0%, #e6e2c8 50%, #d7d1b0 100%)",
        }}
      >
        {/* Background blobs */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(191,174,112,0.28) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(140,122,61,0.22) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12" data-aos="fade-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
              <span className="text-[#7A6730] text-[11px] font-medium tracking-[0.22em] uppercase">
                Get In Touch
              </span>
              <div className="w-8 h-px bg-[#7A6730]" aria-hidden="true" />
            </div>
            <h2
              className="font-extrabold text-[#2B2B2B] leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            >
              Contact{" "}
              <span className="relative inline-block text-[#7A6730]">
                Us
                <span
                  className="absolute left-0 -bottom-1 w-full h-0.5 rounded"
                  style={{
                    background: "linear-gradient(90deg, #7A6730, transparent)",
                  }}
                  aria-hidden="true"
                />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* ── LEFT ── */}
            <div data-aos="fade-right" className="flex flex-col gap-5">
              {/* Hero card */}
              <div
                className="relative overflow-hidden rounded-2xl p-8"
                style={{
                  background:
                    "linear-gradient(135deg, #7A6730 0%, #c4a84a 100%)",
                }}
              >
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                  aria-hidden="true"
                />
                <div className="relative w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                  <FiSend size={22} color="#fff" />
                </div>
                <h3 className="relative text-white font-extrabold text-2xl mb-3">
                  Let's Connect
                </h3>
                <p className="relative text-white/85 text-sm leading-relaxed">
                  Have questions, travel ideas, or custom tour requirements?
                  Fill out the form and our team will reach out shortly.
                </p>
              </div>

              {/* Info cards */}
              {[
                {
                  Icon: FiClock,
                  title: "Quick Response",
                  sub: "We respond within 24 hours",
                  href: null,
                },
                {
                  Icon: FiPhone,
                  title: "+91 98305 90929",
                  sub: "Mon–Sat, 11 AM – 7 PM",
                  href: "tel:+919830590929",
                },
                {
                  Icon: FiMail,
                  title: "support@exploremore.com",
                  sub: "Drop us an email anytime",
                  href: "mailto:support@exploremore.com",
                },
                {
                  Icon: FiMapPin,
                  title: "Kolkata, WB 700087",
                  sub: "3A, Bertram St, Esplanade",
                  href: "https://www.google.com/maps/search/?api=1&query=3A,+Bertram+St,+Esplanade,+Kolkata,+West+Bengal+700087",
                },
              ].map(({ Icon, title, sub, href }) =>
                href ? (
                  <a
                    key={title}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="info-card"
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <div
                      className="info-icon"
                      style={{
                        background:
                          "linear-gradient(135deg, #7A6730, #c4a84a)",
                      }}
                    >
                      <Icon size={18} color="#fff" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2B2B2B] text-sm">
                        {title}
                      </p>
                      <p className="text-[#6b6352] text-xs mt-0.5">{sub}</p>
                    </div>
                  </a>
                ) : (
                  <div key={title} className="info-card">
                    <div
                      className="info-icon"
                      style={{
                        background:
                          "linear-gradient(135deg, #7A6730, #c4a84a)",
                      }}
                    >
                      <Icon size={18} color="#fff" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2B2B2B] text-sm">
                        {title}
                      </p>
                      <p className="text-[#6b6352] text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* ── RIGHT FORM ── */}
            <form
              data-aos="fade-left"
              data-aos-delay="120"
              onSubmit={handleSubmit}
              noValidate
              style={{
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.9)",
                borderRadius: 20,
                padding: "36px 32px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.09)",
              }}
            >
              <div
                className="w-full h-1 rounded-full mb-7"
                style={{
                  background:
                    "linear-gradient(90deg, #7A6730, #c4a84a, transparent)",
                }}
                aria-hidden="true"
              />

              {/* Name + Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="cf-field">
                  <label className="cf-label">
                    Full Name <span>*</span>
                  </label>
                  <div className="cf-input-wrap">
                    <FiUser size={15} />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="cf-field">
                  <label className="cf-label">
                    Mobile No <span>*</span>
                  </label>
                  <div className="cf-input-wrap">
                    <FiPhone size={15} />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="9876543210"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={10}
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="cf-field mb-5">
                <label className="cf-label">
                  Email Address <span>*</span>
                </label>
                <div className="cf-input-wrap">
                  <FiMail size={15} />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="cf-field mb-7">
                <label className="cf-label">Message</label>
                <div
                  className="cf-input-wrap"
                  style={{ alignItems: "flex-start", paddingTop: 2 }}
                >
                  <FiMessageSquare size={15} style={{ marginTop: 13 }} />
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Write your message or travel requirements..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="cf-submit" disabled={loading}>
                <span className="shine" aria-hidden="true" />
                <span className="relative">
                  {loading ? "Sending…" : "Submit"}
                </span>
                {!loading && (
                  <FiSend size={15} style={{ position: "relative" }} />
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
