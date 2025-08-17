// pages/admin/Dashboard/Introduce.jsx
import React, { useState } from "react";

export default function Introduce() {
  const [content, setContent] = useState(
    "Đây là nội dung giới thiệu mặc định. Bạn có thể chỉnh sửa..."
  );

  
  const handleSave = () => {
    console.log("✅ Nội dung giới thiệu đã lưu:", content);
    alert("Lưu thành công (demo)!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý Giới thiệu</h1>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 border rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Lưu thay đổi
      </button>
    </div>
  );
}
