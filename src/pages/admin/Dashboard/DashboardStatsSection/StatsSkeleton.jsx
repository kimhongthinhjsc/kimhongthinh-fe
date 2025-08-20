// DashboardHome/StatsSkeleton.jsx
import React from "react";

export default function StatsSkeleton() {
  return (
    <div className="p-4 bg-white rounded-xl shadow space-y-4 animate-pulse">
      <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 bg-gray-100 rounded h-20"></div>
        ))}
      </div>
      <div>
        <div className="h-5 w-1/4 bg-gray-200 rounded mb-2"></div>
        <ul className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex justify-between py-1 border-b">
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
