import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
// Lazy imports (giữ nguyên)
const DashboardHome = lazy(() => import("./DashboardHome/DashboardHome"));
const DashboardIntroduce = lazy(() => import("./DashboardIntroduce/DashboardIntroduce"));
const DashboardProducts = lazy(() => import("./DashboardProducts/DashboardProducts"));
const DashboardServices = lazy(() => import("./DashboardService/DashboardService"));
const DashboardNews = lazy(() => import("./News/ListNews"));
const DashboardEditNews = lazy(() => import("./News/News"));
const DashboardEvent = lazy(() => import("./Event/ListEvents"));
const DashboardEditEvent = lazy(() => import("./Event/Event"));
const DashboardCareers = lazy(() => import("./Careers"));
const DashboardActivities = lazy(() => import("./Activities"));
const DashboardContact = lazy(() => import("./Contact"));
const DashboardCompanyInfo = lazy(() => import("./DashboardCompanyInfo/DashboardCompanyInfo"));
const DashboardProductEdit = lazy(() => import("./DashboardProducts/DashboardProductCU/DashboardProductEdit"));
const DashboardProductCreate = lazy(() => import("./DashboardProducts/DashboardProductCU/DashboardProductCreate"));
const DashboardServiceEdit = lazy(() => import("./DashboardService/DashboardServiceCU/DashboardServiceEdit"));
const DashboardServiceCreate = lazy(() => import("./DashboardService/DashboardServiceCU/DashboardServiceCreate"));
const DashboardStatsSection = lazy(() => import("./DashboardStatsSection/DashboardStatsSection"));
const DashboardCategories = lazy(() => import("./DashboardCategories/DashboardCategories"));

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);



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
        <DashboardHeader onMenuClick={() => setIsOpen(true)} />

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
              <Route path="/news/create" element={<DashboardEditNews />} />
              <Route path="/news/update" element={<DashboardEditNews />} />
              <Route path="/events" element={<DashboardEvent />} />
              <Route path="/events/create" element={<DashboardEditEvent />} />
              <Route path="/events/update" element={<DashboardEditEvent />} />
              <Route path="/careers" element={<DashboardCareers />} />
              <Route path="/activities" element={<DashboardActivities />} />
              <Route path="/contact" element={<DashboardContact />} />
              <Route path="/products/:id/edit" element={<DashboardProductEdit />} />
              <Route path="/products/create" element={<DashboardProductCreate />} />
              <Route path="/services/:id/edit" element={<DashboardServiceEdit />} />
              <Route path="/services/create" element={<DashboardServiceCreate />} />
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
