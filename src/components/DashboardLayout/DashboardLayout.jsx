import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icon đẹp từ lucide-react
import functionAdmin from "~/models/funcionAdmin";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar (ẩn trên mobile, hiện trên md) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform 
        transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        <div className="p-4 text-xl font-bold border-b border-gray-700 flex justify-between items-center md:block">
          <span>Admin Panel</span>
          {/* Nút đóng (chỉ hiện mobile) */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {functionAdmin.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md hover:bg-gray-700 ${
                  isActive ? "bg-gray-700 font-semibold" : ""
                }`
              }
              onClick={() => setIsOpen(false)} // bấm menu thì đóng
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay khi mở sidebar (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Header (mobile có nút mở menu) */}
        <header className="bg-white shadow p-4 flex items-center md:hidden">
          <button
            className="text-gray-700"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
          <h1 className="ml-4 font-semibold text-lg">Dashboard</h1>
        </header>

        {/* Main content */}
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
