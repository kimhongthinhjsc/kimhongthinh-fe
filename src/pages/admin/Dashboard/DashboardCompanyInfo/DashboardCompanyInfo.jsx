// src/pages/admin/Dashboard/CompanyInfo.jsx
import React, { useState, useEffect } from "react";
import EditableImage from "~/components/EditableImage/EditableImage";
import { updateCompanyProfile } from "~/services/adminAPI";
import CompanyInfoSkeleton from "./CompanyInfoSkeleton";
import { globalLoading } from "~/context/LoadingContext";
import { useCompanyInfo } from "~/hooks/useCompanyInfo";

export default function DashboardCompanyInfo() {
  const { data, isLoading } = useCompanyInfo(); // chỉ GET thông tin
  const [formData, setFormData] = useState({});

  // Khi dữ liệu từ hook về, khởi tạo state local
  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleChange = (e, key, nestedKey) => {
    const value = e.target.value;
    if (nestedKey) {
      setFormData((prev) => ({
        ...prev,
        [key]: { ...prev[key], [nestedKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSave = async () => {
    globalLoading(true, "Đang lưu...");
    try {
      const updated = await updateCompanyProfile(formData);
      if (updated) {
        setFormData(updated);
        alert("✅ Đã lưu thông tin công ty");
      } else {
        alert("❌ Lưu thất bại");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Có lỗi xảy ra khi lưu");
    } finally {
      globalLoading(false);
    }
  };

  const handleReset = () => {
    if (data) setFormData(data);
    alert("🔄 Đã tải lại dữ liệu từ máy chủ");
  };

  if (isLoading) return <CompanyInfoSkeleton />;

  console.log("formData", formData);
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Logo */}
      <EditableImage
        key={formData.logo} // thêm key để reset ảnh về src ban đầu khi bấm Đặt lại
        src={formData.logo}
        onChange={(val) => setFormData((prev) => ({ ...prev, logo: val }))}
        label="Logo"
        className="h-32 max-w-max object-contain border p-1 rounded"
      />

      {/* Thông tin cơ bản */}
      <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Fanpage</label>
          <input
            type="text"
            value={formData.fanpage || ""}
            onChange={(e) => handleChange(e, "fanpage")}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Khẩu hiệu</label>
          <input
            type="text"
            value={formData.slogan || ""}
            onChange={(e) => handleChange(e, "slogan")}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Hotline 1</label>
          <input
            type="text"
            value={formData.hotline1 || ""}
            onChange={(e) => handleChange(e, "hotline1")}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Hotline 2</label>
          <input
            type="text"
            value={formData.hotline2 || ""}
            onChange={(e) => handleChange(e, "hotline2")}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleChange(e, "email")}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* Địa chỉ */}
      <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Địa chỉ chính</label>
          <input
            type="text"
            value={formData.addressMain || ""}
            onChange={(e) => handleChange(e, "addressMain")}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Chi nhánh</label>
          <input
            type="text"
            value={formData.addressBranch || ""}
            onChange={(e) => handleChange(e, "addressBranch")}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* Website & TMĐT */}
      <div className="bg-white shadow rounded p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Website</label>
          <input
            type="text"
            value={formData.website?.name || ""}
            onChange={(e) => handleChange(e, "website", "name")}
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="text"
            value={formData.website?.link || ""}
            onChange={(e) => handleChange(e, "website", "link")}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Thương mại điện tử</label>
          <input
            type="text"
            value={formData.ecommerce?.name || ""}
            onChange={(e) => handleChange(e, "ecommerce", "name")}
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="text"
            value={formData.ecommerce?.link || ""}
            onChange={(e) => handleChange(e, "ecommerce", "link")}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      {/* Social */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="font-semibold mb-2">Mạng xã hội</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData.social || {}).map((key) => (
            <div key={key}>
              <label className="block capitalize">{key}</label>
              <input
                type="text"
                value={formData.social?.[key] || ""}
                onChange={(e) => handleChange(e, "social", key)}
                className="w-full border rounded p-2"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Google Maps */}
      <div className="bg-white shadow rounded p-4">
        <label className="block font-semibold mb-2">Google Maps Embed</label>
        <textarea
          value={formData.googleMapsEmbed || ""}
          onChange={(e) => handleChange(e, "googleMapsEmbed")}
          className="w-full border rounded p-2"
          rows={3}
        />
      </div>

      {/* Nút hành động */}
      <div className="flex flex-col md:flex-row justify-end gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          Lưu
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}
