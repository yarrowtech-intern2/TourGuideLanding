import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiBriefcase,
  FiUser,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

const INITIAL_FORM = {
  companyName: "",
  companyType: "",
  mobile: "",
  email: "",
};

/* ─────────────────────────────
   Toast (Premium + Theme Based)
───────────────────────────── */
const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const ok = toast.type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-[92vw] max-w-[380px]">
      <div
        className={`
          relative overflow-hidden
          rounded-2xl border
          backdrop-blur-xl
          shadow-2xl
          px-4 py-4
          flex gap-3 items-start
          animate-toastIn
          ${
            ok
              ? "bg-white/85 border-emerald-200"
              : "bg-white/85 border-red-200"
          }
        `}
      >
        {/* Icon */}
        <div
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
            ${ok ? "bg-emerald-100" : "bg-red-100"}
          `}
        >
          {ok ? (
            <FiCheckCircle className="text-emerald-600 text-[20px]" />
          ) : (
            <FiAlertTriangle className="text-red-600 text-[20px]" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="font-extrabold text-[#1f1f1f] text-sm">
            {ok ? "Submitted Successfully" : "Submission Failed"}
          </p>
          <p className="text-[13px] text-[#5a5344] mt-0.5 leading-relaxed">
            {toast.msg}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="text-[#9b9074] hover:text-[#2B2B2B] transition"
          aria-label="Close toast"
        >
          <FiX size={18} />
        </button>

        {/* Progress bar */}
        <div
          className={`
            absolute left-0 bottom-0 h-[3px]
            ${ok ? "bg-emerald-500" : "bg-red-500"}
            animate-toastProgress
          `}
        />
      </div>
    </div>
  );
};

/* ─────────────────────────────
   Main Component
───────────────────────────── */
const BecomePartner = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);
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

  const closeToast = () => {
    clearTimeout(timerRef.current);
    setToast(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!formData.companyName.trim())
      return showToast("error", "Please enter your company name."), false;

    if (!formData.companyType.trim())
      return showToast("error", "Please enter your company type."), false;

    if (!formData.mobile.trim())
      return showToast("error", "Please enter your mobile number."), false;

    if (!/^[0-9]{10}$/.test(formData.mobile.trim()))
      return showToast("error", "Enter a valid 10-digit mobile number."), false;

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
      showToast("success", "Thanks! Our team will contact you within 24 hours.");
    }, 1200);
  };

  const inputStyle = `
    w-full px-4 py-3 pl-11
    border border-[#d9d1ad]
    rounded-xl
    bg-white/95
    text-[#2B2B2B]
    placeholder:text-[#6b6553]
    focus:ring-2 focus:ring-[#c8b46a]
    focus:border-[#7A6730]
    outline-none transition
  `;

  return (
    <>
      {/* Toast */}
      <Toast toast={toast} onClose={closeToast} />

      {/* Toast Animations */}
      <style>{`
        @keyframes toastIn {
          0%   { opacity: 0; transform: translateY(18px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%;   }
        }
        .animate-toastIn {
          animation: toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-toastProgress {
          animation: toastProgress 4.5s linear forwards;
        }
      `}</style>

      <section
        id="become-partner"
        className="
          relative w-full overflow-hidden
          bg-gradient-to-br from-[#fbf9f1] via-[#f2efe2] to-[#e6e0c7]
          px-4 sm:px-6 lg:px-8
          py-6 sm:py-8
        "
      >
        <div className="relative max-w-3xl mx-auto">
          <div
            data-aos="fade-up"
            className="
              bg-white/80 backdrop-blur-xl
              w-full p-6 sm:p-8
              rounded-3xl shadow-2xl
              border border-[#e8e2c8]
            "
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B2B2B] text-center">
              Become a Partner
            </h2>

            <p className="text-sm sm:text-base text-[#4b4636] text-center mt-2">
              Submit your company details and we will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 mt-7">
              {/* Company Name */}
              <div>
                <label className="block font-semibold mb-2 text-[#2B2B2B]">
                  Company Name <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A6730]" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className={inputStyle}
                    autoComplete="organization"
                  />
                </div>
              </div>

              {/* Company Type */}
              <div>
                <label className="block font-semibold mb-2 text-[#2B2B2B]">
                  Company Type <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A6730]" />
                  <input
                    type="text"
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    placeholder="Example: Pvt Ltd / Agency / Service Provider"
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block font-semibold mb-2 text-[#2B2B2B]">
                  Mobile No <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A6730]" />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className={inputStyle}
                    maxLength={10}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-2 text-[#2B2B2B]">
                  Email Address <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A6730]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className={inputStyle}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-gradient-to-r from-[#7A6730] to-[#5F4E1F]
                  hover:from-[#5F4E1F] hover:to-[#3f3312]
                  text-white py-3 rounded-xl
                  font-semibold tracking-wide transition
                  shadow-lg hover:shadow-xl
                  focus:outline-none focus:ring-2
                  focus:ring-[#c8b46a] focus:ring-offset-2
                  focus:ring-offset-[#fbf9f1]
                  disabled:opacity-75 disabled:cursor-not-allowed
                "
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default BecomePartner;
