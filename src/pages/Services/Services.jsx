import React, { useState, useEffect } from "react";
import FramePage from "~/components/FramePage/FramePage";
import SearchBar from "~/components/SearchBar/SearchBar";
import servicesData from "~/mock/services.js";

// Skeleton component
const ServiceSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center animate-pulse">
    <div className="w-28 h-28 mb-4 bg-gray-200 rounded"></div>
    <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
    <div className="h-8 w-24 bg-gray-200 rounded mt-auto"></div>
  </div>
);

export default function Services() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  // Giả lập fetch API
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setServices(servicesData);
      setLoading(false);
    }, 800); // 0.8s delay
    return () => clearTimeout(timer);
  }, []);

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <FramePage>
      <div className="bg-blue-50 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#EF5627]">
          Dịch vụ của chúng tôi
        </h1>

        {/* SearchBar */}
        <div className="max-w-md mx-auto">
          <SearchBar value={keyword} onSearch={(k) => setKeyword(k)} />
        </div>

        {/* Lưới dịch vụ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ServiceSkeleton key={i} />)
            : filteredServices.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-xl transition"
                >
                  <div className="w-28 h-28 mb-4 flex justify-center items-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                  <h3 className="font-bold mb-2 text-gray-800">{item.title}</h3>
                  <a
                    href={item.link}
                    className="mt-auto bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-4 py-2 rounded-full hover:from-orange-500 hover:to-yellow-500 transition"
                  >
                    Xem chi tiết
                  </a>
                </div>
              ))}

          {!loading && filteredServices.length === 0 && (
            <div className="col-span-full text-center text-gray-500 mt-6">
              Không tìm thấy dịch vụ nào.
            </div>
          )}
        </div>
      </div>
    </FramePage>
  );
}
