// pages/admin/Dashboard/Home.jsx
import React from "react";


export default function DashboardHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trang quản trị</h1>
      <p className="text-gray-600 mb-6">
        Chào mừng bạn đến với trang quản trị. Dưới đây là một số thống kê nhanh:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold">Sản phẩm</h2>
          <p className="text-3xl font-bold text-blue-500">120</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold">Tin tức</h2>
          <p className="text-3xl font-bold text-green-500">45</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold">Sự kiện</h2>
          <p className="text-3xl font-bold text-red-500">8</p>
        </div>
      </div>
    </div>
  );
}
