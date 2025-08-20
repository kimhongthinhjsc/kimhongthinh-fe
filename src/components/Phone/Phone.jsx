// src/components/Phone/Phone.jsx
import React, { useState } from "react";
import phone from "~/assets/icon/phone.svg";

export default function Phone() {
  const [hover, setHover] = useState(false);

  return (
    <a
      href="tel:0346353913"
      className="relative w-12 h-12 cursor-pointer rounded-full bg-green-500 flex items-center justify-center shadow-md transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-xl"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Tooltip */}
      {hover && (
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1 rounded-md text-white text-sm bg-gray-800 shadow-md whitespace-nowrap">
          0346 353 913
        </div>
      )}

      {/* Icon */}
      <img src={phone} className="w-6 h-6 object-contain" alt="Phone" />
    </a>
  );
}
