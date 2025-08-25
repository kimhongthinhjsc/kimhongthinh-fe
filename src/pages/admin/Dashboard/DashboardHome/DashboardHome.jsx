// pages/admin/Dashboard/Home.jsx
import React, { useEffect, useState } from "react";
import { fetchHomeData } from "~/services/publicAPI";
import { updateHomeData } from "~/services/adminAPI";
import EditHeroSection from "./EditHeroSection";
import EditEcosystemSection from "./EditEcosystemSection";
import EditTestimonial from "./EditTestimonial";
import EditCulturePeople from "./EditCulturePeople";
import EditContact from "./EditContact";
import DashboardHomeSkeleton from "./DashboardHomeSkeleton";
import { globalLoading } from "~/context/LoadingContext";

export default function DashboardHome() {
  const [homeData, setHomeData] = useState(null); // dữ liệu đang chỉnh sửa
  const [originalData, setOriginalData] = useState(null); // dữ liệu gốc để reset
  const [loading, setLoading] = useState(true);

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
    globalLoading(true, "Đang lưu dữ liệu...");
    await updateHomeData(homeData)
      .then(() => {
        setOriginalData(homeData);
        alert("Cập nhật thành công!");
      })
      .catch((error) => {
        alert("Cập nhật thất bại!");
      })
      .finally(() => {
        globalLoading(false);
      });
  };

  const handleReset = () => {
    setHomeData(originalData); // trả về dữ liệu gốc
  };

  if (loading) return <DashboardHomeSkeleton />;

  return (
    <div className="">
      <EditHeroSection data={homeData} onChange={handleChange} />
      <EditEcosystemSection data={homeData} onChange={handleChange} />
      <EditTestimonial data={homeData} onChange={handleChange} />
      <EditCulturePeople data={homeData} onChange={handleChange} />
      <EditContact data={homeData} onChange={handleChange} />
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Lưu thay đổi
        </button>

        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}
