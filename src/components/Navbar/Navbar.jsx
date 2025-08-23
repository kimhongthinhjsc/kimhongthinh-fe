import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icon menu hamburger
import logo from "~/assets/images/HongThinhTechnologyServices.png";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/gioi-thieu", label: "Giới thiệu" },
    { path: "/san-pham", label: "Sản phẩm" },
    { path: "/dich-vu", label: "Dịch vụ" },
    { path: "/tin-tuc", label: "Tin Tức" },
    { path: "/tuyen-dung", label: "Tuyển dụng" },
    { path: "/su-kien", label: "Sự kiện" },
  ];

  // tìm label theo pathname
  const basePath = "/" + location.pathname.split("/")[1];
  const currentPage =
    menuItems.find((item) => item.path === basePath)?.label || "Trang chủ";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="cursor-pointer">
            <img
              src={logo}
              alt="Logo"
              className="h-10 sm:h-14 lg:h-20 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Hiện tên trang ở giữa chỉ khi mobile */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2 text-gray-800 font-semibold">
          {currentPage}
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 font-bold text-gray-700">
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
        </nav>
      )}
    </header>
  );
}
