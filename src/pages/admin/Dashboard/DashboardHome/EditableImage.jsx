import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import EditableField from "./EditableField";

export default function EditableImage({
  src,
  onChange,
  label = "Ảnh",
  className = "w-20 h-20", // default size nhỏ
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* Ảnh + nút sửa */}
      <div className={`relative ${className}`}>
        <img
          src={src || "https://via.placeholder.com/300x200?text=No+Image"}
          alt="preview"
          className="w-full h-full object-cover rounded border bg-white"
        />
        <button
          onClick={() => setOpen(true)}
          className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
        >
          <Pencil size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Popup chỉnh sửa */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
            {/* Nút đóng */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-4">Chỉnh sửa ảnh</h3>

            {/* Preview ảnh */}
            <div className="mb-4 flex justify-center">
              <img
                src={src || "https://via.placeholder.com/400x300?text=No+Image"}
                alt="preview"
                className="max-h-[300px] object-contain rounded border bg-gray-50"
              />
            </div>

            {/* Input URL */}
            <EditableField
              value={src}
              onChange={onChange}
              type="url"
              placeholder="Dán URL ảnh..."
              className="w-full"
            />

            {/* Nút lưu */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
              >
                Xong
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
