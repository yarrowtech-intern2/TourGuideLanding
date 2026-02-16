import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      mobile: "",
      email: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="
        relative w-full overflow-hidden
        bg-gradient-to-br from-[#f5f2dc] via-[#e6e2c8] to-[#d7d1b0]
        py-20 sm:py-24 lg:py-32
        px-4 sm:px-6 lg:px-8
      "
    >

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#bfae70]/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#8c7a3d]/25 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* LEFT INFO */}
        <div data-aos="fade-right" className="text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2B2B2B] mb-4 leading-tight">
            Contact <span className="text-[#7A6730]">Us</span>
          </h2>

          <p className="text-[#3F3A2F] text-base sm:text-lg mb-6 max-w-xl mx-auto md:mx-0">
            Have questions, travel ideas, or custom tour requirements? Fill out
            the form and our team will reach out shortly.
          </p>

          <ul className="space-y-4 text-[#3F3A2F] text-sm sm:text-base">
            {/* EMAIL */}
            <li className="hover:text-[#7A6730] transition">
              <strong className="text-[#2B2B2B]">Email:</strong>{" "}
              <a
                href="mailto:support@exploremore.com"
                className="cursor-pointer hover:opacity-90"
              >
                support@exploremore.com
              </a>
            </li>

            {/* PHONE */}
            <li className="hover:text-[#7A6730] transition">
              <strong className="text-[#2B2B2B]">Phone:</strong>{" "}
              <a
                href="tel:+919830590929"
                className="cursor-pointer hover:opacity-90"
              >
                +91 98305 90929
              </a>
            </li>

            {/* LOCATION */}
            <li className="hover:text-[#7A6730] transition">
              <strong className="text-[#2B2B2B]">Location:</strong>{" "}
              <a
                href="https://www.google.com/maps/search/?api=1&query=3A,+Bertram+St,+Esplanade,+Dharmatala,+Taltala,+Kolkata,+West+Bengal+700087"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer hover:opacity-90"
              >
                3A, Bertram St, Esplanade, Dharmatala, Taltala, Kolkata, West
                Bengal 700087
              </a>
            </li>
          </ul>
        </div>

        {/* FORM */}
        <form
          data-aos="fade-left"
          onSubmit={handleSubmit}
          className="
            bg-white/75 backdrop-blur-xl
            w-full p-6 sm:p-8
            rounded-2xl shadow-xl
            border border-[#e1dab8]
            space-y-5
          "
        >
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-3
                border border-[#d9d1ad]
                rounded-lg
                bg-white/90
                focus:ring-2 focus:ring-[#bfae70]
                focus:border-[#7A6730]
                outline-none transition
              "
            />
          </div>

          {/* MOBILE */}
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="Your Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-3
                border border-[#d9d1ad]
                rounded-lg
                bg-white/90
                focus:ring-2 focus:ring-[#bfae70]
                focus:border-[#7A6730]
                outline-none transition
              "
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-3
                border border-[#d9d1ad]
                rounded-lg
                bg-white/90
                focus:ring-2 focus:ring-[#bfae70]
                focus:border-[#7A6730]
                outline-none transition
              "
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm font-medium text-[#2B2B2B] mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
              className="
                w-full px-4 py-3
                border border-[#d9d1ad]
                rounded-lg
                bg-white/90
                focus:ring-2 focus:ring-[#bfae70]
                focus:border-[#7A6730]
                outline-none transition resize-none
              "
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              w-full
              bg-[#7A6730] hover:bg-[#5F4E1F]
              text-white py-3 rounded-lg
              font-semibold transition
              focus:outline-none focus:ring-2
              focus:ring-[#bfae70] focus:ring-offset-2
              focus:ring-offset-[#f5f2dc]
            "
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
