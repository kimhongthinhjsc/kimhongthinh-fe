import React from "react";

export default function ChatZalo({ chatZalo }) {
  // Chuẩn hóa link Zalo sang số điện thoại mới
  const phone = chatZalo || "0366660237"; // Số điện thoại mặc định nếu không có dữ liệu
  const cleanPhone = phone.replace(/\s+/g, "");
  const zaloUrl = cleanPhone.startsWith("http")
    ? cleanPhone
    : `https://zalo.me/${cleanPhone}`;

  return (
    <a
      href={zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Zalo"
      className="relative group flex items-center justify-center w-12 h-12 rounded-full bg-[#0068FF] shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
    >
      {/* Sóng lan tỏa */}
      <span className="absolute -inset-1 rounded-full bg-[#0068FF] opacity-60 animate-ping group-hover:opacity-90"></span>

      {/* Icon Zalo Badge Chuẩn */}
      <div className="relative z-10 w-7 h-7 bg-white rounded-lg flex items-center justify-center p-0.5 shadow-sm">
        <span className="text-[#0068FF] font-black text-[10px] tracking-tighter leading-none select-none">
          Zalo
        </span>
      </div>

      {/* Tooltip */}
      <span className="absolute right-14 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
        Chat qua Zalo ({cleanPhone})
      </span>
    </a>
  );
}