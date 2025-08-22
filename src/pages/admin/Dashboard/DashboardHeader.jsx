import React, { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader({ currentTitle, onMenuClick }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/admin/login");
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Header Mobile */}
      <header className="bg-white shadow p-4 flex items-center justify-between md:hidden">
        <div className="flex items-center">
          <button className="text-gray-700" onClick={onMenuClick}>
            <Menu size={28} />
          </button>
          <h1 className="ml-4 font-semibold text-lg">{currentTitle}</h1>
        </div>

        {/* Account menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 rounded-full hover:bg-gray-100 px-2 py-1"
          >
            <img
              src="https://themewagon.github.io/ruang-admin/img/boy.png"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">Admin</span>
          </button>
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 text-gray-400 cursor-not-allowed">
                  Hồ sơ (Khóa)
                </li>
                <li className="px-4 py-2 text-gray-400 cursor-not-allowed">
                  Cài đặt (Khóa)
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-600"
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Header Desktop */}
      <header className="sticky top-0 z-50 bg-[#fff] p-4 pr-12 font-bold border-b border-gray-700 hidden md:flex justify-between items-center">
        <h2 className="text-xl font-bold">{currentTitle}</h2>

        {/* Account menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 rounded-full hover:bg-gray-100 px-3 py-1"
          >
            <img
              src="https://themewagon.github.io/ruang-admin/img/boy.png"
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">Admin</span>
          </button>
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
              <ul className="text-sm text-gray-700">
                <li className="px-4 py-2 text-gray-400 cursor-not-allowed">
                  Hồ sơ (Khóa)
                </li>
                <li className="px-4 py-2 text-gray-400 cursor-not-allowed">
                  Cài đặt (Khóa)
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-600"
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
