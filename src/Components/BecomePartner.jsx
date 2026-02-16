import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BecomePartner = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    mobile: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.companyName.trim() ||
      !formData.companyType.trim() ||
      !formData.mobile.trim() ||
      !formData.email.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setSubmitted(true);
    setError("");

    setFormData({
      companyName: "",
      companyType: "",
      mobile: "",
      email: "",
    });

    setTimeout(() => setSubmitted(false), 2500);
  };

  const inputStyle = `
    w-full px-4 py-3
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
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className={inputStyle}
              />
            </div>

            {/* Company Type */}
            <div>
              <label className="block font-semibold mb-2 text-[#2B2B2B]">
                Company Type <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                placeholder="Example: Pvt Ltd / Agency / Service Provider"
                className={inputStyle}
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block font-semibold mb-2 text-[#2B2B2B]">
                Mobile No <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-2 text-[#2B2B2B]">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={inputStyle}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="text-center text-red-600 font-semibold">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
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
              "
            >
              Submit
            </button>

            {/* Success */}
            {submitted && (
              <div className="text-center text-green-700 font-semibold">
                ✅ Submitted Successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BecomePartner;
