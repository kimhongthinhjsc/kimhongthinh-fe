import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "~/components/DashboardLayout/DashboardLayout";

// Lazy load các trang con
const DashboardHome = lazy(() => import("./Home"));
const DashboardIntroduce = lazy(() => import("./Introduce"));
const DashboardProducts = lazy(() => import("./Products"));
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


export default function Dashboard() {
  return (
    <div className="flex">
      {/* Sidebar + Header */}
      <DashboardLayout />

      {/* Nội dung thay đổi theo route */}
      <div className="flex-1 p-6">
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

          {/* Mặc định */}
          <Route index element={<DashboardHome />} />
        </Routes>
      </div>
    </div>
  );
}
