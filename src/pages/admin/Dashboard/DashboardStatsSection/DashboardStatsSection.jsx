import React from "react";
import StatsSkeleton from "./StatsSkeleton";
import { useStatsVisits } from "~/hooks/useAdmin";
import VisitsChart from "./VisitsChart";

export default function DashboardStatsSection() {
  const { data, isLoading, error } = useStatsVisits();

  if (isLoading || !data) return <StatsSkeleton />;
  if (error) return <div className="text-red-500">Lỗi tải số liệu</div>;

  const { total, today, week, month, year, uniqueVisitors, topPages,
          hourlyChartToday, dailyChartWeek, dailyChartMonth, monthlyChartYear } = data;

  const pageNames = {
    "/api/v1/home": "Trang chủ",
    "/api/v1/products": "Sản phẩm",
    "/api/v1/introduce": "Giới thiệu",
    "/api/v1/services": "Dịch vụ",
    "/api/v1/news": "Tin tức",
    "/api/v1/company-profile": "Thông tin công ty",
    "/api/v1/news/find/all": "Tin tức",
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow space-y-4">
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
          <div className="text-gray-500">Năm này</div>
          <div className="text-2xl font-bold">{year}</div>
        </div>
        <div className="p-4 bg-pink-50 rounded">
          <div className="text-gray-500">Người truy cập duy nhất</div>
          <div className="text-2xl font-bold">{uniqueVisitors}</div>
        </div>
      </div>

      <VisitsChart
        hourlyChartToday={hourlyChartToday}
        dailyChartWeek={dailyChartWeek}
        dailyChartMonth={dailyChartMonth}
        monthlyChartYear={monthlyChartYear}
      />

      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Các trang hàng đầu</h3>
        <ul className="space-y-1">
          {topPages
            .filter((page) => pageNames[page._id])
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
