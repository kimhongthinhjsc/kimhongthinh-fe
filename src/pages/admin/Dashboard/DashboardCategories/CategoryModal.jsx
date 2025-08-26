// src/components/admin/CategoryModal.jsx
import React, { useState, useEffect } from "react";

export default function CategoryModal({ open, onClose, onSave, initialName }) {
  const [name, setName] = useState(initialName || "");

  useEffect(() => {
    setName(initialName || "");
  }, [initialName]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {initialName ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
        </h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên..."
          className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={() => onSave(name)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
