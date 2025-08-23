import React, { useState, useEffect } from "react";
import FramePage from "~/components/FramePage/FramePage";
import posts from "~/mock/Posts.js";
import Pagination from "~/components/Pagination/Pagination";
import { getNewsList } from "~/services/publicAPI";
import { Link } from "react-router-dom";
import NewsSkeleton from "./NewsSkeleton"; // ✅ import skeleton

export default function NewsPage() {
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ state loading

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const getNews = async () => {
    try {
      setLoading(true); // ✅ bật loading
      const data = await getNewsList(currentPage, postsPerPage);
      setNews(data.news);
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
                : news.map((newItem, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
                    >
                      <div className="p-4">
                        <Link to={newItem.titleLink}>
                          <img
                            src={newItem.image}
                            alt={newItem.title}
                            className="w-full h-56 object-cover"
                          />
                        </Link>
                        <p className="text-gray-600 text-sm mb-3">
                          {newItem.title}
                        </p>
                        <div className="text-sm text-gray-500">
                          {newItem.title}
                        </div>
                      </div>
                    </div>
                  ))}
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
      </div>
    </FramePage>
  );
}
