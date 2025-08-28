import React, { useEffect, useState } from "react";
import { getEventUpcoming } from "~/services/publicAPI";
import { Eye, Calendar } from "lucide-react";

// Skeleton Card
function EventCardSkeleton() {
  return (
    <div className="bg-gray-50 rounded-xl shadow p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
      <div className="mt-4 h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="mt-4 h-10 bg-gray-300 rounded-lg w-28"></div>
    </div>
  );
}

export default function EventComing() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await getEventUpcoming(1, 10);
      setEvents(data.events || []);
    } finally {
      setLoading(false);
    }
  };

  const getDaysLeft = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `(${diffDays} ngày nữa)`;
    if (diffDays === 0) return `(Hôm nay)`;
    return `(Đã diễn ra)`;
  };

  return (
    <section id="event_coming" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Sắp diễn ra
        </h2>

        {loading ? (
          // Skeleton khi đang load
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <h1 className="text-center text-gray-600">
            Hiện chưa có sự kiện nào sắp diễn ra!
          </h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-4"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
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
                {event.titleLink && (
                  <a
                    href={`/su-kien/${event.titleLink}`}
                    className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Xem chi tiết
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
