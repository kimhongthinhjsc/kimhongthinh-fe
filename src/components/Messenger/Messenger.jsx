// src/components/Messenger/Messenger.jsx
import React, { useState } from "react";
import messenger from "~/assets/icon/messenger.svg";

export default function Messenger({chatMessenger=""}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative w-12 h-12 cursor-pointer rounded-full bg-[#0084ff] flex items-center justify-center shadow-md transition-transform duration-200 ease-in-out hover:scale-110 hover:shadow-xl"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() =>
        window.open(chatMessenger, "_blank")
      }
    >
      {/* Tooltip */}
      {hover && (
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1 rounded-md text-white text-sm bg-gray-800 shadow-md whitespace-nowrap">
          Liên hệ Messenger
        </div>
      )}

      {/* Icon */}
      <img src={messenger} className="w-6 h-6 object-contain" alt="Messenger" />
    </div>
  );
}
