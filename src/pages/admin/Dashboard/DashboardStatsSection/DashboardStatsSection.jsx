import React, { useEffect, useState } from "react";
import { fetchStatsVisits } from "~/services/adminAPI";
import StatsSkeleton from "./StatsSkeleton";

export default function DashboardStatsSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const res = await fetchStatsVisits();
        setData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading || !data) return <StatsSkeleton />;

  const { total, today, week, month, uniqueVisitors, topPages } = data;

  const pageNames = {
    "/api/v1/home": "Trang chủ",
    "/api/v1/products": "Sản phẩm",
    "/api/v1/introduce": "Giới thiệu",
    "/api/v1/services": "Dịch vụ",
    "/api/v1/news": "Tin tức",
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">Tổng quan truy cập</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded">
          <div className="text-gray-500">Tổng lượt truy cập</div>
          <div className="text-2xl font-bold">{total}</div>
        </div>
        <div className="p-4 bg-green-50 rounded">
          <div className="text-gray-500">Hôm nay</div>
          <div className="text-2xl font-bold">{today}</div>
        </div>
        <div className="p-4 bg-yellow-50 rounded">
          <div className="text-gray-500">Tuần này</div>
          <div className="text-2xl font-bold">{week}</div>
        </div>
        <div className="p-4 bg-purple-50 rounded">
          <div className="text-gray-500">Tháng này</div>
          <div className="text-2xl font-bold">{month}</div>
        </div>
        <div className="p-4 bg-red-50 rounded">
          <div className="text-gray-500">Người truy cập duy nhất</div>
          <div className="text-2xl font-bold">{uniqueVisitors}</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Các trang hàng đầu</h3>
        <ul className="space-y-1">
          {topPages
            .filter((page) => pageNames[page._id]) // chỉ lấy các api có trong mapping
            .map((page) => (
              <li key={page._id} className="flex justify-between border-b py-1">
                <span>{pageNames[page._id]}</span>
                <span className="font-bold">{page.count}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
