// src/pages/admin/Dashboard/ServiceTableSkeleton.jsx
import React from "react";

export default function ServiceTableSkeleton({ rows = 10 }) {
  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-20">Ảnh</th>
            <th className="border p-2">Tên dịch vụ</th>
            <th className="border p-2 w-36">Danh mục</th>
            <th className="border p-2 w-28">Giá</th>
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
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
              </td>
              <td className="border p-2 text-center">
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
              </td>
              <td className="border p-2 text-center">
                <div className="h-4 bg-gray-200 rounded w-10 mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
