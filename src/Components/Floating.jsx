import React from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const RightSideFloating = () => {
  return (
    <div className="fixed right-4 top-[92%] -translate-y-1/2 z-[9999] flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/919830590929"
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={22} />
      </a>

      {/* Mail */}
      <a
        href="mailto:yourmail@gmail.com"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:scale-110 transition"
        title="Send Email"
      >
        <FaEnvelope size={20} />
      </a>
    </div>
  );
};

export default RightSideFloating;
