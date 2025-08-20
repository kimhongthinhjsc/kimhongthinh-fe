import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import functionAdmin from "~/models/funcionAdmin";

// Lazy load các trang con
const DashboardHome = lazy(() => import("./DashboardHome/DashboardHome"));
const DashboardIntroduce = lazy(() => import("./DashboardIntroduce/DashboardIntroduce"));
const DashboardProducts = lazy(() => import("./DashboardProducts/DashboardProducts"));
const DashboardServices = lazy(() => import("./Services"));
const DashboardNews = lazy(() => import("./News"));
const DashboardEvents = lazy(() => import("./Events"));
const DashboardCareers = lazy(() => import("./Careers"));
const DashboardActivities = lazy(() => import("./Activities"));
const DashboardTestimonials = lazy(() => import("./Testimonials"));
const DashboardContact = lazy(() => import("./Contact"));
const DashboardUI = lazy(() => import("./UI"));
const DashboardManageAdmin = lazy(() => import("./ManageAdmin"));
const DashboardCompanyInfo = lazy(() => import("./CompanyInfo"));
const DashboardProductEdit = lazy(() => import("./DashboardProducts/DashboardProductEdit/DashboardProductEdit"));

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        <div className="p-4 text-xl font-bold border-b border-gray-700 flex justify-between items-center">
          <span>Admin Panel</span>
          {/* Nút đóng sidebar (mobile only) */}
          <button
            className="text-gray-300 hover:text-white md:hidden"
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
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Header: mobile có menu button, desktop ẩn */}
        <header className="bg-white shadow p-4 flex items-center md:hidden">
          <button className="text-gray-700" onClick={() => setIsOpen(true)}>
            <Menu size={28} />
          </button>
          <h1 className="ml-4 font-semibold text-lg">Dashboard</h1>
        </header>

        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <Suspense fallback={<div>Đang tải...</div>}>
            <Routes>
              <Route path="/home" element={<DashboardHome />} />
              <Route path="/introduce" element={<DashboardIntroduce />} />
              <Route path="/company-info" element={<DashboardCompanyInfo />} />
              <Route path="/products" element={<DashboardProducts />} />
              <Route path="/services" element={<DashboardServices />} />
              <Route path="/news" element={<DashboardNews />} />
              <Route path="/events" element={<DashboardEvents />} />
              <Route path="/careers" element={<DashboardCareers />} />
              <Route path="/activities" element={<DashboardActivities />} />
              <Route path="/testimonials" element={<DashboardTestimonials />} />
              <Route path="/contact" element={<DashboardContact />} />
              <Route path="/ui" element={<DashboardUI />} />
              <Route path="/manage-admin" element={<DashboardManageAdmin />} />
              <Route path="/products/:id/edit" element={<DashboardProductEdit />} />
              {/* default */}
              <Route index element={<DashboardHome />} />
            </Routes>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
