import React from "react";
import { Pencil } from "lucide-react";

export default function ServiceTable({ services, onEdit }) {
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
          {services.map((s) => (
            <tr key={s._id}>
              <td className="border p-2 text-center">
                {s.thumbnail ? (
                  <img
                    src={s.thumbnail}
                    alt={s.name}
                    className="w-12 h-12 object-cover mx-auto rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded mx-auto" />
                )}
              </td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2 text-center">{s.category}</td>
              <td className="border p-2 text-center">
                {s.price?.toLocaleString()} VND
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => onEdit(s._id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Pencil size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
