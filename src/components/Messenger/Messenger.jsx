import React from "react";
import { MessageCircle } from "lucide-react"; // Hoặc dùng icon SVG Messenger có sẵn của em

export default function Messenger({ chatMessenger }) {
  // Chuẩn hóa link Messenger (dùng m.me)
  const messengerUrl = chatMessenger 
    ? (chatMessenger.startsWith("http") ? chatMessenger : `https://m.me/${chatMessenger}`)
    : "https://www.facebook.com/HongThinhTechnology"; // Điền Fanpage ID/Username mặc định

  return (
    <a
      href={messengerUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat qua Facebook Messenger"
      className="relative group flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
    >
      {/* Vòng sóng lan tỏa hiệu ứng (Pulse Animation) */}
      <span className="absolute -inset-1 rounded-full bg-blue-500 opacity-75 animate-ping group-hover:opacity-100"></span>
      
      {/* Icon Messenger */}
      <div className="relative z-10">
        <MessageCircle className="w-6 h-6 fill-current" />
      </div>

      {/* Tooltip hiển thị khi hover */}
      <span className="absolute right-14 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
        Chat Messenger
      </span>
    </a>
  );
}
