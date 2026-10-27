import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Headset } from "lucide-react";

// Khai báo trực tiếp tại đây
const CONTACT_INFO = {
  ZALO_LINK: "https://zalo.me/0366660237",
};

export default function Navbar({ profile }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Lấy link Zalo: Ưu tiên profile -> CONTACT_INFO -> fallback
  const zaloUrl = CONTACT_INFO?.ZALO_LINK || profile?.social?.zalo || "https://zalo.me/0366660237";

  const menuItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/gioi-thieu", label: "Giới thiệu" },
    { path: "/san-pham", label: "Sản phẩm" },
    { path: "/dich-vu", label: "Dịch vụ" },
    { path: "/tin-tuc", label: "Tin Tức" },
    { path: "/tuyen-dung", label: "Tuyển dụng" },
    { path: "/su-kien", label: "Sự kiện" },
  ];

  const basePath = "/" + location.pathname.split("/")[1];
  const currentPage =
    menuItems.find((item) => item.path === basePath)?.label || "404";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="cursor-pointer">
            <img
              src={profile?.logo}
              alt="Logo"
              className="h-10 sm:h-14 lg:h-20 w-auto object-contain scale-150"
            />
          </Link>
        </div>

        {/* Hiện tên trang ở giữa chỉ khi mobile */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 text-gray-800 font-semibold">
          {currentPage}
        </div>

        {/* Menu desktop & Nút bấm */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav className="flex items-center gap-4 lg:gap-8 font-bold text-gray-700">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`pb-1 transition-colors ${
                  location.pathname === item.path
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* NÚT TƯ VẤN NGAY (DESKTOP) */}
          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs lg:text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Headset size={18} />
            <span>Tư Vấn Ngay</span>
          </a>
        </div>

        {/* Nút menu mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-blue-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-3 font-medium text-gray-700 bg-white border-t border-gray-200">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`py-2 border-b ${
                location.pathname === item.path
                  ? "text-blue-600 border-blue-600"
                  : "hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* NÚT TƯ VẤN NGAY (MOBILE) */}
          <div className="pt-2">
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl shadow-md"
            >
              <Headset size={18} />
              <span>Tư Vấn Ngay</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
