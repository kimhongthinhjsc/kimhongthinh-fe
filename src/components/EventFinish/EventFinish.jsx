import React from "react";
import EventCard from "../EventCard/EventCard";

// Skeleton cho card sự kiện
function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
      <div className="mt-4 h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="mt-4 h-10 bg-gray-300 rounded-lg w-28"></div>
    </div>
  );
}

export default function EventFinish({events, isLoading}) {
  return (
    <section id="event_finish" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Sự kiện đã diễn ra
        </h2>

        {isLoading ? (
          // Hiện skeleton 6 cái cho đẹp
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events?.length === 0 ? (
          <p className="text-gray-600">Chưa có sự kiện nào đã diễn ra.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
