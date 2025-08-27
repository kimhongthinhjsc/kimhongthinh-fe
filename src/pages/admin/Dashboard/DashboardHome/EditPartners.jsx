// pages/admin/Dashboard/EditPartners.jsx
import React from "react";
import ImageUploader from "~/components/ImageUploader/ImageUploader";

export default function EditPartners({ data, onChange }) {
  if (!data?.partners) return null;

  const partners = data.partners;

  const handleTitleChange = (e) => {
    onChange("partners", { ...partners, title: e.target.value });
  };

  const handleImagesChange = (newImages) => {
    onChange("partners", { ...partners, images: newImages });
  };

  return (
    <div className="p-4 border rounded mb-6 bg-white shadow">
      <h2 className="text-xl font-bold mb-4">Đối tác</h2>

      {/* Sửa tiêu đề */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Tiêu đề</label>
        <input
          type="text"
          value={partners.title || ""}
          onChange={handleTitleChange}
          className="border p-2 w-full rounded"
          placeholder="Nhập tiêu đề đối tác"
        />
      </div>

      {/* Upload / quản lý logo */}
      <div>
        <label className="block font-medium mb-2">Danh sách logo</label>
        <ImageUploader
          images={partners.images || []}
          onChange={handleImagesChange}
          size="w-28 h-28 md:w-32 md:h-32"
        />
      </div>
    </div>
  );
}
