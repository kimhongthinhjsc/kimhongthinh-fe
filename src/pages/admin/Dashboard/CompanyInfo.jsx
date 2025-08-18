// src/pages/admin/Dashboard/CompanyInfo.jsx
import React, { useState } from "react";
import { profile as defaultProfile } from "~/mock/CompanyProfile";

export default function CompanyInfo() {
  const [formData, setFormData] = useState(defaultProfile);

  // Xử lý thay đổi input
  const handleChange = (e, key, nestedKey) => {
    const value = e.target.value;
    if (nestedKey) {
      setFormData({
        ...formData,
        [key]: {
          ...formData[key],
          [nestedKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [key]: value,
      });
    }
  };

  // Xử lý thay đổi Logo (file upload)
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // preview
      setFormData({
        ...formData,
        logo: imageUrl,
      });
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData(defaultProfile);
  };

  // Giả lập lưu (sau này call API)
  const handleSave = () => {

    alert("Đã lưu thông tin công ty (demo, chưa gọi API)");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Chỉnh sửa thông tin công ty</h1>

      {/* Logo */}
      <div>
        <label className="block font-semibold mb-2">Logo</label>
        {formData.logo && (
          <img
            src={formData.logo}
            alt="Company Logo"
            className="h-20 object-contain mb-2 border p-1 rounded"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Fanpage & Slogan */}
      <div>
        <label className="block font-semibold">Fanpage</label>
        <input
          type="text"
          value={formData.fanpage}
          onChange={(e) => handleChange(e, "fanpage")}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-semibold">Slogan</label>
        <input
          type="text"
          value={formData.slogan}
          onChange={(e) => handleChange(e, "slogan")}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Hotline & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Hotline 1</label>
          <input
            type="text"
            value={formData.hotline1}
            onChange={(e) => handleChange(e, "hotline1")}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Hotline 2</label>
          <input
            type="text"
            value={formData.hotline2}
            onChange={(e) => handleChange(e, "hotline2")}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Địa chỉ */}
      <div>
        <label className="block font-semibold">Địa chỉ chính</label>
        <input
          type="text"
          value={formData.addressMain}
          onChange={(e) => handleChange(e, "addressMain")}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block font-semibold">Chi nhánh</label>
        <input
          type="text"
          value={formData.addressBranch}
          onChange={(e) => handleChange(e, "addressBranch")}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Website & TMĐT */}
      <div>
        <label className="block font-semibold">Website</label>
        <input
          type="text"
          value={formData.website.name}
          onChange={(e) => handleChange(e, "website", "name")}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="text"
          value={formData.website.link}
          onChange={(e) => handleChange(e, "website", "link")}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-semibold">Thương mại điện tử</label>
        <input
          type="text"
          value={formData.ecommerce.name}
          onChange={(e) => handleChange(e, "ecommerce", "name")}
          className="w-full border rounded p-2 mb-2"
        />
        <input
          type="text"
          value={formData.ecommerce.link}
          onChange={(e) => handleChange(e, "ecommerce", "link")}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Social */}
      <div>
        <h2 className="font-semibold">Mạng xã hội</h2>
        {Object.keys(formData.social).map((key) => (
          <div key={key} className="mt-2">
            <label className="block capitalize">{key}</label>
            <input
              type="text"
              value={formData.social[key]}
              onChange={(e) => handleChange(e, "social", key)}
              className="w-full border rounded p-2"
            />
          </div>
        ))}
      </div>

      {/* Google Maps */}
      <div>
        <label className="block font-semibold">Google Maps Embed</label>
        <textarea
          value={formData.googleMapsEmbed}
          onChange={(e) => handleChange(e, "googleMapsEmbed")}
          className="w-full border rounded p-2"
          rows={3}
        />
      </div>

      {/* Nút hành động */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lưu
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
