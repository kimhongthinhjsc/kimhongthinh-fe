import React, { useState, useEffect } from "react";
import FramePage from "~/components/FramePage/FramePage";
import SearchBar from "~/components/SearchBar/SearchBar";
import { getAllService, getServiceByKeyword } from "~/services/publicAPI";

// Skeleton component
const ServiceSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center animate-pulse">
    <div className="w-28 h-28 mb-4 bg-gray-200 rounded"></div>
    <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
    <div className="h-8 w-24 bg-gray-200 rounded mt-auto"></div>
  </div>
);

export default function ServicesPage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      let data;
      if (keyword.trim() === "") {
        data = await getAllService();
        setServices(data.services || []);
        setTotalPages(1);
      } else {
        data = await getServiceByKeyword(keyword, page, 12);
        setServices(data.services || []);
        setTotalPages(data.totalPages);
      }
      setLoading(false);
    };
    fetchServices();
  }, [keyword, page]);

  return (
    <FramePage>
      <div className="bg-bgPrimary p-6 space-y-6 min-h-screen">
        {/* SearchBar */}
        <div className="max-w-md mx-auto">
          <SearchBar
            value={keyword}
            onSearch={(k) => {
              setPage(1);
              setKeyword(k);
            }}
          />
        </div>

        {/* Lưới dịch vụ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <ServiceSkeleton key={i} />
              ))
            : services.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center 
             hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Hình ảnh */}
                  <div className="w-48 h-28 mb-4 flex justify-center items-center overflow-hidden shadow-md rounded-lg">
                    <img
                      src={item.thumbnail || "/images/default-service.jpg"}
                      alt={item.name}
                      className="object-cover w-full h-full transform hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Tên dịch vụ */}
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Nút xem chi tiết */}
                  <a
                    href={`/dich-vu/${item._id}`}
                    className="btn-ocean w-full"
                  >
                    Xem chi tiết
                  </a>
                </div>
              ))}

          {!loading && services.length === 0 && (
            <div className="col-span-full text-center text-gray-500 mt-6">
              Không tìm thấy dịch vụ nào.
            </div>
          )}
        </div>
      </div>
    </FramePage>
  );
}
