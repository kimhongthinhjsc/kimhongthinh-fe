import React, { useState } from "react";
import SearchBar from "~/components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useServices } from "~/hooks/useService";
import PageHeader from "~/components/PageHeader/PageHeader";
import { ArrowRight, MessageCircle } from "lucide-react";

const ServiceSkeleton = () => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse space-y-4">
    <div className="w-full h-52 bg-gray-100 rounded-xl"></div>
    <div className="h-6 bg-gray-100 rounded w-3/4 mx-auto"></div>
    <div className="h-10 bg-gray-100 rounded-xl w-full"></div>
  </div>
);

export default function ServicesPage() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading } = useServices({ keyword, page, limit });

  const services = data?.services || [];
  const totalPages = data?.totalPages || 1;

  const zaloPhoneNumber = "0900000000"; 

  return (
    <div className="bg-[#F8FAFC] text-gray-800 min-h-screen pb-16 w-full">
      
      <PageHeader
        badge="Dịch Vụ Doanh Nghiệp"
        title="Giải Pháp Doanh Nghiệp & Kế Toán - Thuế"
        description="Đồng hành cùng sự phát triển bền vững của bạn với dịch vụ tối ưu và chuẩn xác."
      >
        {/* Nếu muốn mang ô Tìm kiếm lên Header luôn */}
        <div className="flex max-w-md mx-auto gap-2 mt-3">
          <input 
            type="text" 
            placeholder="Tìm kiếm dịch vụ..." 
            className="w-full px-4 py-2.5 rounded-xl text-gray-800 outline-none text-sm shadow-md"
          />
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 font-medium text-sm rounded-xl transition text-white shadow-md">
            Tìm
          </button>
        </div>
      </PageHeader>

      {/* 2. DANH SÁCH DỊCH VỤ - MỞ RỘNG TỚI 1600PX, THẺ TO VÀ SÁT LỀ HƠN */}
      <div className="w-full max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: limit }).map((_, i) => <ServiceSkeleton key={i} />)
            : services.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Khung ảnh tăng chiều cao h-52 để thẻ to và rõ ràng hơn */}
                    <div className="w-full h-52 mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-3">
                      <img
                        src={item.thumbnail || "/images/default-service.jpg"}
                        alt={item.name}
                        className="object-contain max-h-full max-w-full transform group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* Tên dịch vụ */}
                    <h3
                      className="font-bold text-base sm:text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 text-center mb-4 px-1"
                      style={{ minHeight: "3.2rem" }}
                    >
                      {item.name}
                    </h3>
                  </div>

                  {/* Cụm nút bấm */}
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <Link
                      to={`/dich-vu/${item._id}`}
                      className="w-full py-2.5 px-4 bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition duration-200 group/btn"
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition duration-200" />
                    </Link>

                    <a
                      href={`https://zalo.me/${zaloPhoneNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 text-blue-600 hover:text-blue-700 text-xs font-semibold flex items-center justify-center gap-1 transition duration-200"
                    >
                      <MessageCircle size={14} />
                      <span>Tư vấn qua Zalo</span>
                    </a>
                  </div>
                </div>
              ))}

          {!isLoading && services.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-400 text-base">Không tìm thấy dịch vụ nào phù hợp.</p>
            </div>
          )}
        </div>

        {/* 3. PHÂN TRANG */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-semibold text-sm transition duration-200 ${
                  page === i + 1
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
