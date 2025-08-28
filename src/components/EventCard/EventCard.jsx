import React from "react";
import { Eye, Calendar } from "lucide-react";

const getDaysLeft = (date) => {
  const today = new Date();
  const eventDate = new Date(date);
  const diffTime = eventDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 0) return `(${diffDays} ngày nữa)`;
  if (diffDays === 0) return `(Hôm nay)`;
  return `(Đã diễn ra)`;
};

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      {/* Ảnh sự kiện */}
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg"
      />

      {/* Tiêu đề */}
      <h3 className="mt-4 text-lg font-semibold text-gray-800 line-clamp-2">
        {event.title}
      </h3>

      <div className="flex items-center gap-6 text-sm text-gray-500 mt-2">
        {/* Ngày diễn ra */}
        {event.date && (
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-blue-600" />
            <span className="text-gray-700">
              {new Date(event.date).toLocaleDateString("vi-VN")}
            </span>
            <span className="text-red-500 font-medium">
              {getDaysLeft(event.date)}
            </span>
          </div>
        )}

        {/* Lượt xem */}
        {typeof event.views !== "undefined" && (
          <div className="flex items-center gap-1">
            <Eye size={16} className="text-purple-600" />
            <span className="text-gray-800">{event.views}</span>
          </div>
        )}
      </div>

      {/* Link xem chi tiết */}
      {event.titleLink && (
        <a
          href={`/su-kien/${event.titleLink}`}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Xem chi tiết
        </a>
      )}
    </div>
  );
}
