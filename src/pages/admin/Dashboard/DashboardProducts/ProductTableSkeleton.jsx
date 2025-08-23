// src/components/admin/ProductTableSkeleton.jsx
import React from "react";

export default function ProductTableSkeleton({ rows = 10 }) {
  return (
    <div className="overflow-x-auto border rounded">
      <table className="hidden md:table w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-20">Ảnh</th>
            <th className="border p-2">Tên sản phẩm</th>
            <th className="border p-2 w-28">Giá</th>
            <th className="border p-2 w-36">Danh mục</th>
            <th className="border p-2 w-40">Loại sản phẩm</th>
            <th className="border p-2 w-20">Sửa</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="border p-2">
                <div className="w-12 h-12 bg-gray-200 rounded mx-auto" />
              </td>
              <td className="border p-2">
                <div className="h-4 bg-gray-200 rounded w-40" />
              </td>
              <td className="border p-2 text-center">
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
              </td>
              <td className="border p-2 text-center">
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
              </td>
              <td className="border p-2 text-center">
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
              </td>
              <td className="border p-2 text-center">
                <div className="h-4 bg-gray-200 rounded w-6 mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile skeleton dạng card */}
      <div className="md:hidden space-y-3 p-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="border rounded p-3 animate-pulse flex gap-3 items-center"
          >
            <div className="w-16 h-16 bg-gray-200 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
