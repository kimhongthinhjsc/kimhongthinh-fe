// src/pages/admin/Dashboard/DashboardStatsSection/VisitsChart.jsx
import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import moment from "moment-timezone";

export default function VisitsChart({
  hourlyChartToday,
  dailyChartWeek,
  dailyChartMonth,
  monthlyChartYear,
}) {
  const [filter, setFilter] = useState("day"); // day, week, month, year
  const [customRange, setCustomRange] = useState({ from: "", to: "" });

  const chartData = useMemo(() => {
    if (filter === "day") {
      // Xử lý dữ liệu theo giờ
      const hoursData = Array.from({ length: 24 }, (_, i) => ({
        date: `${i}:00`,
        count: 0,
      }));
      hourlyChartToday?.forEach((item) => {
        const h = item._id.h ?? 0;
        hoursData[h].count = item.count;
      });
      return hoursData;
    }

    if (filter === "week") {
      return dailyChartWeek?.map((item) => ({
        date: moment
          .tz(
            `${item._id.y}-${item._id.m}-${item._id.d}`,
            "YYYY-M-D",
            "Asia/Ho_Chi_Minh"
          )
          .format("DD/MM"),
        count: item.count,
      }));
    }

    if (filter === "month") {
      return dailyChartMonth?.map((item) => ({
        date: moment
          .tz(
            `${item._id.y}-${item._id.m}-${item._id.d}`,
            "YYYY-M-D",
            "Asia/Ho_Chi_Minh"
          )
          .format("DD/MM"),
        count: item.count,
      }));
    }

    if (filter === "year") {
      return monthlyChartYear?.map((item) => ({
        date: moment
          .tz(`${item._id.y}-${item._id.m}`, "YYYY-M", "Asia/Ho_Chi_Minh")
          .format("MM/YYYY"),
        count: item.count,
      }));
    }

    if (filter === "custom") {
      const from = moment.tz(
        customRange.from,
        "YYYY-MM-DD",
        "Asia/Ho_Chi_Minh"
      );
      const to = moment.tz(customRange.to, "YYYY-MM-DD", "Asia/Ho_Chi_Minh");

      // dùng tất cả dữ liệu ngày trong tháng làm ví dụ
      const allDaily = dailyChartMonth || [];

      return allDaily
        .filter((d) => {
          const date = moment.tz(
            `${d._id.y}-${d._id.m}-${d._id.d}`,
            "YYYY-M-D",
            "Asia/Ho_Chi_Minh"
          );
          return date.isBetween(from, to, "day", "[]");
        })
        .map((d) => ({
          date: moment
            .tz(
              `${d._id.y}-${d._id.m}-${d._id.d}`,
              "YYYY-M-D",
              "Asia/Ho_Chi_Minh"
            )
            .format("DD/MM"),
          count: d.count,
        }));
    }

    return [];
  }, [
    filter,
    hourlyChartToday,
    dailyChartWeek,
    dailyChartMonth,
    monthlyChartYear,
  ]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
        <h3 className="text-lg font-semibold">Lượt truy cập theo thời gian</h3>
        <select
          className="border rounded p-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="day">Ngày</option>
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="year">Năm này</option>
          <option value="custom">Tùy chọn</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            strokeWidth={3}
          />
          <Brush dataKey="date" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
