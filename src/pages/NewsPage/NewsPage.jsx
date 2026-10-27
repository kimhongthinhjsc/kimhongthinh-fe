import React, { useState } from "react";
import Pagination from "~/components/Pagination/Pagination";
import { Link } from "react-router-dom";
import NewsSkeleton from "./NewsSkeleton";
import { Clock, Grid, Eye, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import DOMPurify from "dompurify";
import PageHeader from "~/components/PageHeader/PageHeader";
import { useNews } from "~/hooks/usePublic";

export default function NewsPage() {
  const postsPerPage = 7; // Lấy 7 bài: 1 bài to nổi bật, 6 bài danh sách lưới
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useNews({ page: currentPage, limit: postsPerPage });

  const news = data?.news || [];
  const totalPages = data?.totalPages || 1;

  // Tách bài nổi bật (bài đầu tiên) và các bài còn lại
  const featuredPost = news[0];
  const listPosts = currentPage === 1 ? news.slice(1) : news;

  // Hàm xử lý cắt ngắn nội dung an toàn
  const getPlainText = (htmlContent, length = 120) => {
    let plainText = DOMPurify.sanitize(htmlContent || "", { ALLOWED_TAGS: [] });
    return plainText.length > length ? plainText.substring(0, length) + "..." : plainText;
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16 w-full text-gray-800">
      
      {/* 1. PAGE HEADER ĐỨNG ĐỘC LẬP -> TRÀN 100% TOÀN MÀN HÌNH */}
      <PageHeader
        badge="Góc Kiến Thức"
        title="Tin Tức & Kiến Thức Doanh Nghiệp"
        description="Cập nhật các chính sách thuế, pháp luật kinh doanh và giải pháp công nghệ mới nhất."
      />

      {/* 2. KHU VỰC NỘI DUNG BÊN DƯỚI DÙNG CONTAINER GIỚI HẠN CHIỀU RỘNG */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-10">
        
        {/* KHU VỰC HERO: BÀI VIẾT NỔI BẬT (CHỈ HIỂN THỊ TRANG 1) */}
        {!isLoading && featuredPost && currentPage === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Thẻ bài viết nổi bật bên trái (Chiếm 2 cột) */}
            <Link
              to={featuredPost.titleLink}
              className="lg:col-span-2 group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-80 overflow-hidden bg-gray-100">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md">
                  <Sparkles size={14} /> BÀI VIẾT NỔI BẬT
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1 font-medium text-blue-600">
                    <Grid size={13} /> Tin tức, Sự kiện
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {new Date(featuredPost.updatedAt).toLocaleDateString("vi-VN")}
                  </span>
                  {typeof featuredPost.views !== "undefined" && (
                    <span className="flex items-center gap-1">
                      <Eye size={13} />
                      {featuredPost.views} lượt xem
                    </span>
                  )}
                </div>

                <h2 className="font-extrabold text-xl sm:text-2xl text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {featuredPost.title}
                </h2>

                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                  {getPlainText(featuredPost.content, 180)}
                </p>

                <div className="pt-2 flex items-center gap-2 text-sm font-bold text-blue-600">
                  <span>Đọc tiếp nội dung</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition duration-200" />
                </div>
              </div>
            </Link>

            {/* Cột tin tức tiêu điểm bên phải (Chiếm 1 cột) */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-bold text-gray-900 text-base mb-4 pb-3 border-b border-gray-100">
                  <TrendingUp className="text-blue-600" size={18} />
                  <span>Xem Nhiều Nhất</span>
                </div>

                <div className="space-y-4">
                  {news.slice(1, 5).map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.titleLink}
                      className="group/item flex items-start gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-100 shrink-0 group-hover/item:scale-105 transition duration-300"
                      />
                      <div className="space-y-1">
                        <h4 className="font-semibold text-xs sm:text-sm text-gray-800 group-hover/item:text-blue-600 transition line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-gray-400 block">
                          {new Date(item.updatedAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* DANH SÁCH TẤT CẢ BÀI VIẾT DẠNG LƯỚI 3 CỘT */}
        <div className="space-y-6">
          {currentPage === 1 && (
            <h3 className="font-bold text-lg text-gray-900 border-l-4 border-blue-600 pl-3">
              Mới Cập Nhật
            </h3>
          )}

          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 sm:gap-8">
            {isLoading
              ? Array.from({ length: postsPerPage }).map((_, i) => <NewsSkeleton key={i} />)
              : listPosts.map((newItem, index) => (
                  <Link
                    key={index}
                    to={newItem.titleLink}
                    className="group block bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image */}
                      <div className="w-full h-48 sm:h-52 overflow-hidden bg-gray-100">
                        <img
                          src={newItem.image}
                          alt={newItem.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1 font-medium text-blue-600">
                            <Grid size={13} /> Tin tức
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={13} />
                            {new Date(newItem.updatedAt).toLocaleDateString("vi-VN")}
                          </span>
                        </div>

                        <h2 className="font-bold text-base sm:text-lg text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {newItem.title}
                        </h2>

                        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                          {getPlainText(newItem.content, 110)}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 mt-2">
                      <span className="font-semibold text-blue-600 group-hover:underline">Xem chi tiết</span>
                      {typeof newItem.views !== "undefined" && (
                        <span className="flex items-center gap-1">
                          <Eye size={13} />
                          {newItem.views}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
          </div>
        </div>

        {/* PHÂN TRANG */}
        {!isLoading && totalPages > 1 && (
          <div className="pt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

      </div>
    </div>
  );
}
