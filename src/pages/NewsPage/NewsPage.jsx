import React, { useState, useEffect } from "react";
import FramePage from "~/components/FramePage/FramePage";
import posts from "~/mock/Posts.js";
import Pagination from "~/components/Pagination/Pagination";
import { getNewsList } from "~/services/publicAPI";
import { Link } from "react-router-dom";
import NewsSkeleton from "./NewsSkeleton"; // ✅ import skeletoni
import { Clock, Grid } from "lucide-react";
import DOMPurify from "dompurify";


export default function NewsPage() {
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ state loading


  const getNews = async () => {
    try {
      setLoading(true); // ✅ bật loading
      const data = await getNewsList(currentPage, postsPerPage);
      setNews(data.news);
      setTotalPages(data.totalPages);
      console.log("Danh sách tin tức:", data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tin tức:", error);
    } finally {
      setLoading(false); // ✅ tắt loading
    }
  };

  useEffect(() => {
    getNews();
  }, [currentPage]);

  return (
    <FramePage>
      <div className="w-full">
        {/* Banner */}
        <section id="sds_banner" className="w-full">
          <img
            src="http://softdreams.vn/wp-content/uploads/2023/11/Group-2609280-1-1.png"
            alt="Banner"
            className="w-full object-cover"
          />
        </section>

        {/* Posts */}
        <section id="showall_posts" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {loading
                ? Array.from({ length: postsPerPage }).map((_, i) => (
                  <NewsSkeleton key={i} />
                ))
                :
                news.map((newItem, index) => {
                  // Lấy text thuần từ content (bỏ thẻ HTML)
                  let plainText = DOMPurify.sanitize(newItem.content, { ALLOWED_TAGS: [] });
                  if (plainText.length > 120) {
                    plainText = plainText.substring(0, 120) + "...";
                  }

                  return (
                    <Link
                      key={index}
                      to={newItem.titleLink}
                      className="block bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
                    >
                      <div className="p-4">
                        {/* Hình ảnh */}
                        <img
                          src={newItem.image}
                          alt={newItem.title}
                          className="w-full h-56 object-cover"
                        />

                        {/* Tiêu đề */}
                        <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mt-3 line-clamp-2">
                          {newItem.title}
                        </h2>

                        {/* Nội dung rút gọn */}
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {plainText}
                        </p>

                        {/* Metadata */}
                        <div className="flex items-center gap-6 text-red-600 text-sm mt-3">
                          <div className="flex items-center gap-1">
                            <Grid size={16} />
                            <span>{"Tin tức, Sự kiện"}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>
                              {new Date(newItem.updatedAt).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              }
            </div>

            {/* Pagination */}
            {!loading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </section>
      </div >
    </FramePage >
  );
}
