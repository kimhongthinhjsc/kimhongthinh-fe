import React from "react";

export default function UpdateNewsSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-4">
      {/* Title */}
      <div>
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      {/* Link */}
      <div>
        <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      {/* Thumbnail */}
      <div>
        <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>

      {/* Author */}
      <div>
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>

      {/* Date */}
      <div className="h-4 bg-gray-300 rounded w-32"></div>

      {/* Editor giả */}
      <div className="h-[300px] bg-gray-200 rounded"></div>

      {/* Buttons */}
      <div className="flex gap-4">
        <div className="h-10 w-28 bg-gray-300 rounded"></div>
        <div className="h-10 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
