// src/pages/admin/Dashboard/CompanyInfoSkeleton.jsx
import React from "react";

export default function CompanyInfoSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto animate-pulse">
      {/* Logo */}
      <div className="h-32 w-32 bg-gray-200 rounded-md" />

      {/* Thông tin cơ bản */}
      <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="md:col-span-2 h-10 bg-gray-200 rounded" />
      </div>

      {/* Địa chỉ */}
      <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>

      {/* Website & TMĐT */}
      <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Social */}
      <div className="bg-white shadow rounded p-4 space-y-3">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Google Maps */}
      <div className="bg-white shadow rounded p-4">
        <div className="h-24 bg-gray-200 rounded" />
      </div>

      {/* Nút hành động */}
      <div className="flex flex-col md:flex-row justify-end gap-4">
        <div className="h-10 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
