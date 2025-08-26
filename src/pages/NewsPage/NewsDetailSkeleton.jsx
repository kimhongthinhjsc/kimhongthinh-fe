import React from "react";

export default function NewsDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6 animate-pulse">
      {/* Danh mục */}
      <div className="h-5 w-40 bg-gray-200 rounded"></div>

      {/* Tiêu đề */}
      <div className="space-y-3">
        <div className="h-7 bg-gray-200 rounded w-3/4"></div>
        <div className="h-7 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Ngày đăng */}
      <div className="h-4 bg-gray-200 rounded w-32"></div>

      {/* Thumbnail */}
      <div className="h-80 w-full bg-gray-200 rounded-xl"></div>

      {/* Nội dung mô phỏng */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}
