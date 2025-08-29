import React from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function CategoryTable({ categories, onDelete, onEdit, onAddSub }) {
  if (!categories || categories.length === 0) {
    return <p className="text-center text-gray-500">Không có danh mục nào</p>;
  }

  return (
    <div className="overflow-x-auto border rounded">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Tên danh mục</th>
            <th className="border p-2 w-32 text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <React.Fragment key={cat._id}>
              {/* category cha */}
              <tr className="bg-gray-50">
                <td className="border p-2 font-semibold">{cat.name}</td>
                <td className="border p-2 text-center space-x-3">
                  <button
                    onClick={() => onEdit(cat)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Sửa"
                  >
                    <FaEdit className="inline w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(cat._id, false)}
                    className="text-red-600 hover:text-red-800"
                    title="Xóa"
                  >
                    <FaTrash className="inline w-5 h-5" />
                  </button>
                </td>
              </tr>

              {/* subcategories */}
              {cat.subcategories &&
                cat.subcategories.length > 0 &&
                cat.subcategories.map((sub) => (
                  <tr key={sub._id}>
                    <td className="border p-2 pl-8 text-gray-700">↳ {sub.name}</td>
                    <td className="border p-2 text-center space-x-3">
                      <button
                        onClick={() => onEdit(sub)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Sửa"
                      >
                        <FaEdit className="inline w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(sub._id, true)}
                        className="text-red-500 hover:text-red-700"
                        title="Xóa"
                      >
                        <FaTrash className="inline w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}

              {/* nút thêm subcategory */}
              <tr>
                <td className="border p-2 pl-8 text-gray-400 italic">
                  <button
                    onClick={() => onAddSub(cat)}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-800"
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Thêm danh mục con</span>
                  </button>
                </td>
                <td className="border p-2"></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
