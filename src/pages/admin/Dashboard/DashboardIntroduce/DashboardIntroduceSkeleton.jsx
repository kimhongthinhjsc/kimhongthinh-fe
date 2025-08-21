// pages/admin/Dashboard/DashboardIntroduceSkeleton.jsx
import React from "react";

export default function DashboardIntroduceSkeleton() {
  return (
    <div className="w-full p-6 animate-pulse">
      {/* Banner */}
      <div className="mb-6">
        <div className="h-7 w-52 bg-gray-200 rounded mb-2"></div>
        <div className="h-64 w-full bg-gray-200 rounded-xl"></div>
      </div>

      {/* Something About */}
      <div className="mb-6">
        <div className="h-7 w-64 bg-gray-200 rounded mb-2"></div>
        <div className="space-y-2">
          <div className="h-5 w-full bg-gray-200 rounded"></div>
          <div className="h-5 w-4/5 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Video Section */}
      <div className="mb-6">
        <div className="h-7 w-52 bg-gray-200 rounded mb-2"></div>
        <div className="h-52 w-full bg-gray-200 rounded-xl"></div>
      </div>

      {/* Road Section */}
      <div className="mb-6">
        <div className="h-7 w-56 bg-gray-200 rounded mb-2"></div>
        <div className="space-y-2">
          <div className="h-5 w-11/12 bg-gray-200 rounded"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Behavior Rules */}
      <div className="mb-6">
        <div className="h-7 w-44 bg-gray-200 rounded mb-2"></div>
        <div className="space-y-2">
          <div className="h-5 w-[95%] bg-gray-200 rounded"></div>
          <div className="h-5 w-4/5 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Core Value */}
      <div className="mb-6">
        <div className="h-7 w-52 bg-gray-200 rounded mb-2"></div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 w-full bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>

      {/* Clients Testimonials */}
      <div className="mb-6">
        <div className="h-7 w-56 bg-gray-200 rounded mb-2"></div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 w-full bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <div className="h-10 w-36 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
}
