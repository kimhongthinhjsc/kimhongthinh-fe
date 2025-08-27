import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getEventList } from "~/services/adminAPI";

// Skeleton component
function EventHeaderSkeleton() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center animate-pulse bg-gray-200">
      <div className="bg-gray-300 w-2/3 h-20 rounded-lg"></div>
    </div>
  );
}

export default function EventHeader() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await getEventList(1, 10);
      setEvents(data.events || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="event_header"
      className="relative w-full h-[400px] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://softdreams.vn/wp-content/uploads/2024/02/banner.png')",
      }}
    >
      {loading ? (
        <EventHeaderSkeleton />
      ) : events.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl md:text-3xl font-semibold text-white text-center">
            Hiện chưa có sự kiện nào sắp diễn ra!
          </h1>
        </div>
      ) : (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="w-full h-full"
        >
          {events.map((event) => (
            <SwiperSlide key={event._id || event.id}>
              <div
                className="w-full h-[400px] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${event.image})` }}
              >
                <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
                  <h2 className="text-2xl md:text-4xl font-bold text-white">
                    {event.title}
                  </h2>
                  <p className="text-white mt-2">
                    {new Date(event.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
