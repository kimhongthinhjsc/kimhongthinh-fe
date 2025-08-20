// src/pages/admin/Dashboard/CompanyInfo.jsx
import React, { useState, useEffect } from "react";
import { getCompanyProfile } from "~/services/publicAPI";
import { updateCompanyProfile, uploadImage } from "~/services/adminAPI";
import { profile as defaultProfile } from "~/models/CompanyProfile";

const withDefaults = (data) => ({
  ...defaultProfile,
  ...(data || {}),
  website: { ...defaultProfile.website, ...(data?.website || {}) },
  ecommerce: { ...defaultProfile.ecommerce, ...(data?.ecommerce || {}) },
  social: { ...defaultProfile.social, ...(data?.social || {}) },
});

export default function CompanyInfo() {
  const [formData, setFormData] = useState(defaultProfile);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getCompanyProfile();
      setFormData(withDefaults(data));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const localUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, logo: localUrl }));

      const res = await uploadImage(file);
      const uploadedUrl = res.url || res.secure_url;
      if (uploadedUrl) {
        setFormData((prev) => ({ ...prev, logo: uploadedUrl }));
      } else {
        alert("❌ Upload thất bại, không có URL trả về");
      }
    } catch (error) {
      console.error("Upload logo error:", error);
      alert("❌ Có lỗi khi upload logo");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateCompanyProfile(formData);
      if (updated) {
        setFormData(withDefaults(updated));
        alert("✅ Đã lưu thông tin công ty");
      } else {
        alert("❌ Lưu thất bại");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Có lỗi xảy ra khi lưu");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    await fetchData();
    alert("🔄 Đã tải lại dữ liệu từ máy chủ");
  };

  if (loading) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Thông tin công ty</h1>

      {/* Logo */}
      <div className="bg-white shadow rounded p-4 flex flex-col md:flex-row items-center gap-6">
        {formData.logo && (
          <img
            src={formData.logo}
            alt="Company Logo"
            className="h-32 w-32 object-contain border p-1 rounded"
          />
        )}
        <div className="flex-1">
          <label className="block font-semibold mb-2">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

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
          <label className="block font-semibold">Slogan</label>
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
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Đang lưu..." : "Lưu"}
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
