import React from "react";


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

      {/* Ngày diễn ra */}
      <p className="text-sm text-gray-500 mt-2">
        {new Date(event.date).toLocaleDateString("vi-VN")}
      </p>

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
