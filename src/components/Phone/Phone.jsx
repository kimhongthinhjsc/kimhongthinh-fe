import React from "react";

export default function Phone({ phoneNumber }) {
  const phone = phoneNumber || "0907079168";
  const cleanPhone = phone.replace(/\s+/g, "");

  return (
    <a
      href={`tel:${cleanPhone}`}
      aria-label="Gọi điện thoại"
      className="relative group flex items-center justify-center w-12 h-12 rounded-full bg-[#22c55e] text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
    >
      {/* Sóng lan tỏa */}
      <span className="absolute -inset-1 rounded-full bg-[#22c55e] opacity-60 animate-ping group-hover:opacity-90"></span>

      {/* SVG Icon Điện Thoại Chuẩn + Hiệu ứng lắc chuông */}
      <svg className="w-6 h-6 relative z-10 fill-current animate-pulse" viewBox="0 0 24 24">
        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>

      {/* Tooltip */}
      <span className="absolute right-14 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
        Gọi ngay: {phone}
      </span>
    </a>
  );
}