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
   Toast (Pure Tailwind)
───────────────────────────── */
const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  const ok = toast.type === "success";

  return (
    <div className="fixed bottom-7 right-7 z-[9999] w-[92vw] max-w-[380px]">
      <div
        className={`relative overflow-hidden rounded-2xl border bg-white/90 px-5 py-4 shadow-2xl backdrop-blur-xl
        ${ok ? "border-emerald-200/70" : "border-red-200/70"}`}
      >
        {/* Top Bar */}
        <div
          className={`absolute left-0 top-0 h-[3px] w-full ${
            ok ? "bg-emerald-500" : "bg-red-500"
          }`}
        />

        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              ok ? "bg-emerald-100" : "bg-red-100"
            }`}
          >
            {ok ? (
              <FiCheckCircle className="text-emerald-600" size={20} />
            ) : (
              <FiAlertTriangle className="text-red-600" size={20} />
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold tracking-tight text-[#1f1f1f]">
              {ok ? "Submitted Successfully" : "Submission Failed"}
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#666]">
              {toast.msg}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#aaa] transition hover:text-[#666]"
            aria-label="Close"
          >
            <FiX size={16} />
          </button>
        </div>
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

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!formData.companyName.trim())
      return showToast("error", "Please enter your company name."), false;

    if (!formData.companyType.trim())
      return showToast("error", "Please enter your company type."), false;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(import.meta.env.VITE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          project: "PARTNER",
          companyName: formData.companyName,
          companyType: formData.companyType,
          mobile: formData.mobile,
          email: formData.email,
        }),
      });

      const text = await res.text();
      console.log("PARTNER RESPONSE:", text);

      // ✅ Safe parse
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { ok: true };
      }

      if (!res.ok || result.ok === false) {
        throw new Error(result.error || "Submission failed");
      }

      setFormData(INITIAL_FORM);

      showToast(
        "success",
        "Thank you for your submission. We will reach out to you within 24–48 hours."
      );
    } catch (err) {
      console.error(err);
      showToast("error", err.message || "Could not submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast toast={toast} onClose={closeToast} />

      <section
        id="become-partner"
        className="relative w-full overflow-hidden bg-gradient-to-br from-[#fbf9f1] via-[#f2efe2] to-[#e6e0c7] px-4 py-10 sm:px-6 lg:px-8"
      >
        {/* Dot Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(122,103,48,0.14)_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(191,174,112,0.22)_0%,transparent_70%)]" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(122,103,48,0.18)_0%,transparent_70%)]" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div
            data-aos="fade-up"
            className="rounded-[24px] border border-white/90 bg-white/80 p-8 shadow-[0_12px_56px_rgba(0,0,0,0.10)] backdrop-blur-xl sm:p-10"
          >
            {/* Top bar */}
            <div className="mb-6 h-[2px] w-full rounded-full bg-gradient-to-r from-[#7A6730] via-[#c4a84a] to-[#7A6730]/10" />

            <h2 className="text-center text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-tight text-[#2B2B2B]">
              Become a{" "}
              <em className="italic text-[#7A6730]">Partner</em>
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-center text-[clamp(0.88rem,1.4vw,1rem)] leading-relaxed text-[#5a5344]">
              Submit your company details and we will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Company Name */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4a4438]">
                  Company Name <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <FiUser
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A6730]/60"
                  />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    autoComplete="organization"
                    className="w-full rounded-2xl border border-[#e0d7b8] bg-[#fdfcf7] py-3.5 pl-11 pr-4 text-[0.92rem] text-[#2B2B2B] outline-none transition
                    placeholder:text-[#7A6730]/40 focus:border-[#7A6730] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(122,103,48,0.10)]"
                  />
                </div>
              </div>

              {/* Company Type */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4a4438]">
                  Company Type <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <FiBriefcase
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A6730]/60"
                  />
                  <input
                    type="text"
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    placeholder="Example: Pvt Ltd / Agency / Service Provider"
                    className="w-full rounded-2xl border border-[#e0d7b8] bg-[#fdfcf7] py-3.5 pl-11 pr-4 text-[0.92rem] text-[#2B2B2B] outline-none transition
                    placeholder:text-[#7A6730]/40 focus:border-[#7A6730] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(122,103,48,0.10)]"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4a4438]">
                  Mobile No <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <FiPhone
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A6730]/60"
                  />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    maxLength={10}
                    autoComplete="tel"
                    className="w-full rounded-2xl border border-[#e0d7b8] bg-[#fdfcf7] py-3.5 pl-11 pr-4 text-[0.92rem] text-[#2B2B2B] outline-none transition
                    placeholder:text-[#7A6730]/40 focus:border-[#7A6730] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(122,103,48,0.10)]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#4a4438]">
                  Email Address <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <FiMail
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A6730]/60"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    autoComplete="email"
                    className="w-full rounded-2xl border border-[#e0d7b8] bg-[#fdfcf7] py-3.5 pl-11 pr-4 text-[0.92rem] text-[#2B2B2B] outline-none transition
                    placeholder:text-[#7A6730]/40 focus:border-[#7A6730] focus:bg-white focus:shadow-[0_0_0_3.5px_rgba(122,103,48,0.10)]"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#7A6730] via-[#b09040] to-[#8a7535] py-4 text-[12px] font-semibold uppercase tracking-[0.20em] text-white shadow-[0_8px_28px_rgba(122,103,48,0.30)] transition
                hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(122,103,48,0.45)]
                disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.16)_50%,transparent_60%)]" />
                <span className="relative">
                  {loading ? "Submitting…" : "Submit Application"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default BecomePartner;
