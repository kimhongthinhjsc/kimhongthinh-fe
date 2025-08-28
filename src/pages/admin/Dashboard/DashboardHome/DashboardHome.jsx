// pages/admin/Dashboard/Home.jsx
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useHome } from "~/hooks/usePublic";
import { updateHomeData } from "~/services/adminAPI";
import EditHeroSection from "./EditHeroSection";
import EditEcosystemSection from "./EditEcosystemSection";
import EditTestimonial from "./EditTestimonial";
import EditCulturePeople from "./EditCulturePeople";
import EditContact from "./EditContact";
import DashboardHomeSkeleton from "./DashboardHomeSkeleton";
import { globalLoading } from "~/context/LoadingContext";
import EditPartners from "./EditPartners";

export default function DashboardHome() {
  const queryClient = useQueryClient();
  const { data: homeData, isLoading } = useHome();

  const [draft, setDraft] = useState(null);
  useEffect(() => {
    if (homeData) {
      setDraft(homeData);
    }
  }, [homeData]);

  const handleChange = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    globalLoading(true, "Đang lưu dữ liệu...");
    try {
      await updateHomeData(draft);
      alert("✅ Cập nhật thành công!");
      // Invalidate để reload lại dữ liệu home từ server
      queryClient.invalidateQueries(["home"]);
    } catch (err) {
      alert("❌ Cập nhật thất bại!");
    } finally {
      globalLoading(false);
    }
  };

  const handleReset = () => {
    setDraft(homeData); // reset lại bản draft = dữ liệu gốc
  };

  if (isLoading || !draft) return <DashboardHomeSkeleton />;
  return (
    <div>
      <EditHeroSection data={draft} onChange={handleChange} />
      <EditEcosystemSection data={draft} onChange={handleChange} />
      <EditTestimonial data={draft} onChange={handleChange} />
      <EditCulturePeople data={draft} onChange={handleChange} />
      <EditContact data={draft} onChange={handleChange} />
      <EditPartners data={draft} onChange={handleChange} />

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
