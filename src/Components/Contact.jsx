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

/* ─────────────────────────────
   Toast (Tailwind)
───────────────────────────── */
const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  const ok = toast.type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-[320px] max-w-[90vw] animate-[toastIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards] overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.14),0_4px_16px_rgba(0,0,0,0.08)]">
      <div className={`h-[3px] w-full ${ok ? "bg-emerald-500" : "bg-red-500"}`} />

      <div className="flex items-start gap-3 px-5 py-4">
        <div className="mt-[2px] shrink-0">
          {ok ? (
            <FiCheckCircle className="text-emerald-500" size={20} />
          ) : (
            <FiAlertCircle className="text-red-500" size={20} />
          )}
        </div>

        <div className="flex-1">
          <p className="text-[13px] font-semibold tracking-wide text-neutral-900">
            {ok ? "Message Sent!" : "Error"}
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-neutral-600">
            {toast.msg}
          </p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="shrink-0 rounded-md p-1 text-neutral-300 transition hover:text-neutral-500"
        >
          <FiX size={16} />
        </button>
      </div>

      {/* Progress bar */}
      <div
        className={`h-[2px] ${ok ? "bg-emerald-500" : "bg-red-500"} animate-[toastProgress_5s_linear_forwards]`}
      />
    </div>
  );
};

/* ─────────────────────────────
   Main ContactForm
───────────────────────────── */
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(import.meta.env.VITE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          project: "CONTACT",
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          message: formData.message,
        }),
      });

      const text = await res.text();
      console.log("CONTACT RESPONSE:", text);

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
      showToast("error", err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    {
      Icon: FiClock,
      title: "Quick Response",
      sub: "We will contact you within 24–48 hours",
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
      title: "electroniceducaresales@yarrowtech.co.in",
      sub: "Drop us an email anytime",
      href: "mailto:electroniceducaresales@yarrowtech.co.in",
    },
    {
      Icon: FiMapPin,
      title: "Kolkata, WB 700087",
      sub: "3A, Bertram St, Esplanade",
      href: "https://www.google.com/maps/search/?api=1&query=3A,+Bertram+St,+Esplanade,+Kolkata,+West+Bengal+700087",
    },
  ];

  return (
    <>
      {/* Animations for toast */}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(60px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>

      <Toast toast={toast} onClose={closeToast} />

      <section
        id="contact"
        className="relative w-full overflow-hidden bg-gradient-to-br from-[#f8f5e4] via-[#ede9d0] to-[#ddd7bb] py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      >
        {/* Dot Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(122,103,48,0.16)_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(191,174,112,0.28)_0%,transparent_70%)]" />
          <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(122,103,48,0.22)_0%,transparent_70%)]" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[rgba(122,103,48,0.09)] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Heading */}
          <div className="mb-14 text-center" data-aos="fade-up">
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-[rgba(122,103,48,0.2)] to-[#7A6730]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#7A6730]">
                Get In Touch
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-[rgba(122,103,48,0.2)] to-[#7A6730]" />
            </div>

            <h2 className="mb-5 text-[clamp(2.4rem,5vw,3.6rem)] font-light leading-tight text-[#2B2B2B]">
              Contact{" "}
              <span className="relative inline-block italic text-[#7A6730]">
                Us
                <span className="absolute left-0 -bottom-1 h-[1.5px] w-full rounded-full bg-gradient-to-r from-[#7A6730] to-[rgba(122,103,48,0.15)]" />
              </span>
            </h2>

            <div className="mx-auto h-px w-14 rounded-full bg-gradient-to-r from-transparent via-[rgba(43,43,43,0.2)] to-transparent" />
          </div>

          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-12">
            {/* LEFT */}
            <div data-aos="fade-right" className="flex flex-col gap-4">
              {/* Hero Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5c3f1a] via-[#8a6828] to-[#c4a84a] p-8">
                <div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/10" />
                <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/10" />
                <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:20px_20px]" />

                <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/20 backdrop-blur-md">
                  <FiSend size={20} className="text-white" />
                </div>

                <h3 className="relative mb-3 text-3xl font-light leading-tight text-white">
                  Let's <em className="italic">Connect</em>
                </h3>

                <p className="relative text-[0.92rem] leading-relaxed text-white/80">
                  Have questions, travel ideas, or custom tour requirements? Fill
                  out the form and our team will reach out shortly.
                </p>

                <div className="relative mt-6 h-px w-10 bg-white/40" />
              </div>

              {/* Info Cards */}
              {infoItems.map(({ Icon, title, sub, href }) => {
                const Wrapper = href ? "a" : "div";
                const extraProps = href
                  ? {
                      href,
                      target: href.startsWith("http") ? "_blank" : undefined,
                      rel: href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined,
                    }
                  : {};

                return (
                  <Wrapper
                    key={title}
                    className="flex items-center gap-4 rounded-2xl border border-white/90 bg-white/70 px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:border-[#7A6730]/30 hover:shadow-[0_12px_36px_rgba(0,0,0,0.10)]"
                    {...extraProps}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7A6730] to-[#c4a84a] shadow-[0_6px_18px_rgba(122,103,48,0.28)]">
                      <Icon size={18} className="text-white" />
                    </div>

                    <div>
                      <p className="text-[0.9rem] font-semibold text-[#2B2B2B]">
                        {title}
                      </p>
                      <p className="mt-0.5 text-[0.78rem] tracking-wide text-[#6b6352]">
                        {sub}
                      </p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* RIGHT FORM */}
            <form
              data-aos="fade-left"
              data-aos-delay="120"
              onSubmit={handleSubmit}
              noValidate
              className="rounded-[22px] border border-white/90 bg-white/75 p-10 shadow-[0_8px_48px_rgba(0,0,0,0.09)] backdrop-blur-xl"
            >
              <div className="mb-8 h-[2px] w-full rounded-full bg-gradient-to-r from-[#7A6730] via-[#c4a84a] to-[#7A6730]/10" />

              {/* Name + Mobile */}
              <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4a4438]">
                    Full Name <span className="text-red-600">*</span>
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#e8e2cc] bg-[#fdfcf7] px-4 transition focus-within:border-[#7A6730] focus-within:bg-white focus-within:shadow-[0_0_0_3.5px_rgba(122,103,48,0.11)]">
                    <FiUser size={14} className="text-[#7A6730]/60" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className="w-full bg-transparent py-3 text-[0.92rem] text-[#2B2B2B] outline-none placeholder:text-[#7A6730]/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4a4438]">
                    Mobile No <span className="text-red-600">*</span>
                  </label>

                  <div className="flex items-center gap-3 rounded-xl border border-[#e8e2cc] bg-[#fdfcf7] px-4 transition focus-within:border-[#7A6730] focus-within:bg-white focus-within:shadow-[0_0_0_3.5px_rgba(122,103,48,0.11)]">
                    <FiPhone size={14} className="text-[#7A6730]/60" />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter Your Mobile No"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={10}
                      autoComplete="tel"
                      className="w-full bg-transparent py-3 text-[0.92rem] text-[#2B2B2B] outline-none placeholder:text-[#7A6730]/40"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4a4438]">
                  Email Address <span className="text-red-600">*</span>
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#e8e2cc] bg-[#fdfcf7] px-4 transition focus-within:border-[#7A6730] focus-within:bg-white focus-within:shadow-[0_0_0_3.5px_rgba(122,103,48,0.11)]">
                  <FiMail size={14} className="text-[#7A6730]/60" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Mail"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full bg-transparent py-3 text-[0.92rem] text-[#2B2B2B] outline-none placeholder:text-[#7A6730]/40"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-7">
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4a4438]">
                  Message
                </label>

                <div className="flex items-start gap-3 rounded-xl border border-[#e8e2cc] bg-[#fdfcf7] px-4 transition focus-within:border-[#7A6730] focus-within:bg-white focus-within:shadow-[0_0_0_3.5px_rgba(122,103,48,0.11)]">
                  <FiMessageSquare
                    size={14}
                    className="mt-[14px] text-[#7A6730]/60"
                  />
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Write your message or travel requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full resize-none bg-transparent py-3 text-[0.92rem] text-[#2B2B2B] outline-none placeholder:text-[#7A6730]/40"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-br from-[#7A6730] via-[#b09040] to-[#8a7535] px-6 py-[15px] text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_8px_28px_rgba(122,103,48,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(122,103,48,0.48)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {/* shine */}
                <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.18)_50%,transparent_60%)]" />
                <span className="relative">
                  {loading ? "Sending…" : "Send Message"}
                </span>
                {!loading && <FiSend size={14} className="relative" />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
