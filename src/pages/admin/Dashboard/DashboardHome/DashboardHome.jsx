// pages/admin/Dashboard/Home.jsx
import React, { useEffect, useState } from "react";
import { fetchHomeData } from "~/services/publicAPI";
import { updateHomeData } from "~/services/adminAPI";
import EditHeroSection from "./EditHeroSection";
import EditEcosystemSection from "./EditEcosystemSection";
import EditTestimonial from "./EditTestimonial";

export default function DashboardHome() {
  const [homeData, setHomeData] = useState(null); // dữ liệu đang chỉnh sửa
  const [originalData, setOriginalData] = useState(null); // dữ liệu gốc để reset
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchHomeData();
      setHomeData(data);
      setOriginalData(data); // lưu bản gốc để reset
      setLoading(false);
    };
    loadData();
  }, []);

  const handleChange = (field, value) => {
    setHomeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateHomeData(homeData);
    setOriginalData(homeData); // sau khi lưu thì cập nhật bản gốc
    setSaving(false);
    alert("Cập nhật thành công!");
  };

  const handleReset = () => {
    setHomeData(originalData); // trả về dữ liệu gốc
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản trị trang chủ</h1>

      {/* Background / Hero Section */}
      <EditHeroSection data={homeData} onChange={handleChange} />
      <EditEcosystemSection data={homeData} onChange={handleChange} />
      <EditTestimonial data={homeData} onChange={handleChange} />
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>

        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
