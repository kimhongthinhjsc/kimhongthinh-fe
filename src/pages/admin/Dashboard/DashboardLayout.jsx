import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import functionAdmin from "~/models/funcionAdmin";
import DashboardHeader from "./DashboardHeader";

// Lazy imports (giữ nguyên)
const DashboardHome = lazy(() => import("./DashboardHome/DashboardHome"));
const DashboardIntroduce = lazy(() => import("./DashboardIntroduce/DashboardIntroduce"));
const DashboardProducts = lazy(() => import("./DashboardProducts/DashboardProducts"));
const DashboardServices = lazy(() => import("./DashboardService/DashboardService"));
const DashboardNews = lazy(() => import("./News/ListNews"));
const DashboardCreateNews = lazy(() => import("./News/News"));
const DashboardUpdateNews = lazy(() => import("./News/UpdateNews"));
const DashboardEvents = lazy(() => import("./Events"));
const DashboardCareers = lazy(() => import("./Careers"));
const DashboardActivities = lazy(() => import("./Activities"));
const DashboardTestimonials = lazy(() => import("./Testimonials"));
const DashboardContact = lazy(() => import("./Contact"));
const DashboardUI = lazy(() => import("./UI"));
const DashboardManageAdmin = lazy(() => import("./ManageAdmin"));
const DashboardCompanyInfo = lazy(() => import("./DashboardCompanyInfo/DashboardCompanyInfo"));
const DashboardProductEdit = lazy(() => import("./DashboardProducts/DashboardProductEdit/DashboardProductEdit"));
const DashboardServiceEdit = lazy(() => import("./DashboardService/DashboardServiceEdit/DashboardServiceEdit"));
const DashboardStatsSection = lazy(() => import("./DashboardStatsSection/DashboardStatsSection"));
const DashboardCategories = lazy(() => import("./DashboardCategories/DashboardCategories"));

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const currentTitle =
    functionAdmin.find((item) => location.pathname.startsWith(item.path))?.name ||
    "Nội dung chính";

  return (
    <div className="flex h-screen">
      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Gọi Header component */}
        <DashboardHeader currentTitle={currentTitle} onMenuClick={() => setIsOpen(true)} />

        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <Suspense fallback={<div></div>}>
            <Routes>
              <Route path="/stats" element={<DashboardStatsSection />} />
              <Route path="/home" element={<DashboardHome />} />
              <Route path="/introduce" element={<DashboardIntroduce />} />
              <Route path="/company-info" element={<DashboardCompanyInfo />} />
              <Route path="/products" element={<DashboardProducts />} />
              <Route path="/services" element={<DashboardServices />} />
              <Route path="/news" element={<DashboardNews />} />
              <Route path="/news/create" element={<DashboardCreateNews />} />
              <Route path="/news/update" element={<DashboardUpdateNews />} />
              <Route path="/events" element={<DashboardEvents />} />
              <Route path="/careers" element={<DashboardCareers />} />
              <Route path="/activities" element={<DashboardActivities />} />
              <Route path="/testimonials" element={<DashboardTestimonials />} />
              <Route path="/contact" element={<DashboardContact />} />
              <Route path="/ui" element={<DashboardUI />} />
              <Route path="/manage-admin" element={<DashboardManageAdmin />} />
              <Route path="/products/:id/edit" element={<DashboardProductEdit />} />
              <Route path="/services/:id/edit" element={<DashboardServiceEdit />} />
              <Route path="/categories" element={<DashboardCategories />} />
              <Route index element={<DashboardStatsSection />} />
            </Routes>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
