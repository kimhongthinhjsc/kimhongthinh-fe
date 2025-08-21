// src/pages/admin/Dashboard/CompanyInfoSkeleton.jsx
import React from "react";

export default function CompanyInfoSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto animate-pulse">
      {/* Title */}
      <div className="h-10 w-72 bg-gray-300 rounded mx-auto"></div>

      {/* Logo */}
      <div className="flex justify-center">
        <div className="h-28 w-28 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Basic Info */}
      <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-300 rounded"></div>
        ))}
      </div>

      {/* Address */}
      <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-300 rounded"></div>
        ))}
      </div>

      {/* Website & Ecommerce */}
      <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-11 bg-gray-300 rounded"></div>
        ))}
      </div>

      {/* Social */}
      <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-11 bg-gray-300 rounded"></div>
        ))}
      </div>

      {/* Google Maps */}
      <div className="bg-white shadow rounded p-4">
        <div className="h-32 w-full bg-gray-300 rounded"></div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <div className="h-10 w-28 bg-gray-300 rounded"></div>
        <div className="h-10 w-28 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}
