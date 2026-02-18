import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiBriefcase, FiUser, FiPhone, FiMail,
  FiCheckCircle, FiAlertTriangle, FiX,
} from "react-icons/fi";

const INITIAL_FORM = {
  companyName: "",
  companyType: "",
  mobile: "",
  email: "",
};

/* ─── Toast — same logic, refined visuals ─── */
const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  const ok = toast.type === "success";

  return (
    <div className="fixed bottom-7 right-7 z-[9999] w-[92vw] max-w-[380px]">
      <div
        className={`
          relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl
          px-5 py-4 flex gap-3 items-start animate-toastIn
          ${ok ? "bg-white/90 border-emerald-200/60" : "bg-white/90 border-red-200/60"}
        `}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${ok ? "bg-emerald-100" : "bg-red-100"}`}>
          {ok ? <FiCheckCircle className="text-emerald-600" size={20} /> : <FiAlertTriangle className="text-red-600" size={20} />}
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm text-[#1f1f1f] tracking-tight"
            style={{ fontFamily: "'Jost', sans-serif" }}>
            {ok ? "Submitted Successfully" : "Submission Failed"}
          </p>
          <p className="text-[12px] text-[#666] mt-1 leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif" }}>
            {toast.msg}
          </p>
        </div>
        <button onClick={onClose} className="text-[#aaa] hover:text-[#666] transition" aria-label="Close">
          <FiX size={16} />
        </button>
        <div className={`absolute left-0 bottom-0 h-[2px] animate-toastProgress ${ok ? "bg-emerald-500" : "bg-red-500"}`} />
      </div>
    </div>
  );
};

/* ─── Main ─── */
const BecomePartner = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 80 });
    return () => clearTimeout(timerRef.current);
  }, []);

  const showToast = (type, msg) => {
    clearTimeout(timerRef.current);
    setToast({ type, msg });
    timerRef.current = setTimeout(() => setToast(null), 4500);
  };
  const closeToast = () => { clearTimeout(timerRef.current); setToast(null); };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!formData.companyName.trim()) return showToast("error", "Please enter your company name."), false;
    if (!formData.companyType.trim()) return showToast("error", "Please enter your company type."), false;
    if (!formData.mobile.trim())      return showToast("error", "Please enter your mobile number."), false;
    if (!/^[0-9]{10}$/.test(formData.mobile.trim()))
      return showToast("error", "Enter a valid 10-digit mobile number."), false;
    if (!formData.email.trim()) return showToast("error", "Please enter your email address."), false;
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
      showToast("success", "Thanks! Our team will contact you within 24 hours.");
    }, 1200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        #become-partner { font-family: 'Jost', sans-serif; }
        #become-partner .ff-display { font-family: 'Cormorant Garamond', Georgia, serif; }

        #become-partner .dot-pattern {
          background-image: radial-gradient(rgba(122,103,48,0.14) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        /* ── Toast ── */
        @keyframes toastIn { from{opacity:0;transform:translateY(18px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes toastProgress { from{width:100%} to{width:0%} }
        .animate-toastIn       { animation: toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .animate-toastProgress { animation: toastProgress 4.5s linear forwards; }

        /* ── Field wrap ── */
        .bp-field { display: flex; flex-direction: column; gap: 8px; }
        .bp-label {
          font-family: 'Jost', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #4a4438;
        }
        .bp-label .req { color: #c0392b; margin-left: 3px; }

        .bp-input-wrap {
          position: relative;
        }
        .bp-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          color: rgba(122,103,48,0.55);
          flex-shrink: 0;
        }
        .bp-input {
          width: 100%; padding: 13px 14px 13px 44px;
          border: 1.5px solid #e0d7b8;
          border-radius: 14px;
          background: #fdfcf7;
          color: #2B2B2B;
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.28s, background 0.28s, box-shadow 0.28s;
        }
        .bp-input::placeholder { color: rgba(122,103,48,0.35); }
        .bp-input:focus {
          border-color: #7A6730;
          background: #fff;
          box-shadow: 0 0 0 3.5px rgba(122,103,48,0.10);
        }

        /* ── Submit button ── */
        .bp-submit {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #7A6730 0%, #b09040 60%, #8a7535 100%);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.20em; text-transform: uppercase;
          border: none; border-radius: 14px; cursor: pointer;
          position: relative; overflow: hidden;
          box-shadow: 0 8px 28px rgba(122,103,48,0.30);
          transition: box-shadow 0.35s ease, transform 0.25s ease, opacity 0.3s;
        }
        .bp-submit:hover:not(:disabled) {
          box-shadow: 0 14px 40px rgba(122,103,48,0.45);
          transform: translateY(-2px);
        }
        .bp-submit:disabled { opacity: 0.72; cursor: not-allowed; }
        .bp-submit::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.16) 50%, transparent 60%);
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .bp-submit:hover::before { opacity: 1; }
      `}</style>

      <Toast toast={toast} onClose={closeToast} />

      <section
        id="become-partner"
        className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
        style={{ background: "linear-gradient(150deg, #fbf9f1 0%, #f2efe2 50%, #e6e0c7 100%)" }}
      >
        {/* ── Dot texture ── */}
        <div className="dot-pattern absolute inset-0 pointer-events-none opacity-50" aria-hidden="true" />

        {/* ── Decorative blobs ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(191,174,112,0.22) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(122,103,48,0.18) 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-3xl mx-auto">

          <div
            data-aos="fade-up"
            style={{
              background: "rgba(255,255,255,0.80)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.95)",
              borderRadius: 24,
              padding: "clamp(28px, 6vw, 48px) clamp(24px, 5vw, 40px)",
              boxShadow: "0 12px 56px rgba(0,0,0,0.10), 0 3px 16px rgba(122,103,48,0.08)",
            }}
          >
            {/* Gold accent bar */}
            <div className="w-full h-[2px] rounded-full mb-6"
              style={{ background: "linear-gradient(90deg, #7A6730, #c4a84a, rgba(122,103,48,0.08))" }}
              aria-hidden="true" />

            {/* Heading */}
            <h2
              className="ff-display font-light text-center mb-3"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                color: "#2B2B2B",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Become a <em className="italic" style={{ color: "#7A6730" }}>Partner</em>
            </h2>

            <p className="text-center mb-7"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
                color: "#5a5344",
                lineHeight: 1.6,
              }}>
              Submit your company details and we will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Company Name */}
              <div className="bp-field">
                <label className="bp-label">Company Name <span className="req">*</span></label>
                <div className="bp-input-wrap">
                  <FiUser className="bp-icon" size={15} />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className="bp-input"
                    autoComplete="organization"
                  />
                </div>
              </div>

              {/* Company Type */}
              <div className="bp-field">
                <label className="bp-label">Company Type <span className="req">*</span></label>
                <div className="bp-input-wrap">
                  <FiBriefcase className="bp-icon" size={15} />
                  <input
                    type="text"
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    placeholder="Example: Pvt Ltd / Agency / Service Provider"
                    className="bp-input"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="bp-field">
                <label className="bp-label">Mobile No <span className="req">*</span></label>
                <div className="bp-input-wrap">
                  <FiPhone className="bp-icon" size={15} />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className="bp-input"
                    maxLength={10}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="bp-field">
                <label className="bp-label">Email Address <span className="req">*</span></label>
                <div className="bp-input-wrap">
                  <FiMail className="bp-icon" size={15} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="bp-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} className="bp-submit">
                {loading ? "Submitting…" : "Submit Application"}
              </button>

            </form>

          </div>
        </div>
      </section>
    </>
  );
};

export default BecomePartner;