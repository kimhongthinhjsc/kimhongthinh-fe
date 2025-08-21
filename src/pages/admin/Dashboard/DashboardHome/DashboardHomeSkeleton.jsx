// pages/admin/Dashboard/DashboardHomeSkeleton.jsx
import React from "react";

export default function DashboardHomeSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Title */}
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>

      {/* Sections skeleton */}
      <div className="space-y-4">
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="h-40 bg-gray-200 rounded-lg"></div>
        <div className="h-40 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-6">
        <div className="h-10 w-28 bg-gray-300 rounded"></div>
        <div className="h-10 w-28 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
