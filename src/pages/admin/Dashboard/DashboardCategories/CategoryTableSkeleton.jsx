import React from "react";

export default function CategoryTableSkeleton({ rows = 10 }) {
  return (
    <div className="overflow-x-auto border rounded">
      {/* Desktop Table */}
      <table className="hidden md:table w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-12">#</th>
            <th className="border p-2 text-center">Tên danh mục</th>
            <th className="border p-2 w-48">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="border p-2 text-center">
                <div className="h-4 w-4 bg-gray-200 rounded mx-auto" />
              </td>
              <td className="border p-2">
                <div className="h-4 w-40 bg-gray-200 rounded mx-auto" />
              </td>
              <td className="border p-2 text-center">
                <div className="flex justify-center gap-2">
                  <div className="h-6 w-12 bg-gray-200 rounded" />
                  <div className="h-6 w-12 bg-gray-200 rounded" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card */}
      <div className="md:hidden space-y-3 p-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="border rounded p-3 flex gap-3 items-center animate-pulse"
          >
            <div className="w-10 h-10 bg-gray-200 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
            <div className="h-6 w-10 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
