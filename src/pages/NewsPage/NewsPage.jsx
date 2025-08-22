import React, { useState, useEffect  } from "react";
import FramePage from "~/components/FramePage/FramePage";
import posts from "~/mock/Posts.js";
import Pagination from "~/components/Pagination/Pagination";
import { getNewsList } from "~/services/publicAPI";
import { Link } from "react-router-dom";


export default function NewsPage() {
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState([]);

  // Tính tổng số trang
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Cắt bài viết theo trang hiện tại
  const startIndex = (currentPage - 1) * postsPerPage;
  


  const getNews = async () => {
    try {
      const data = await getNewsList(currentPage, postsPerPage);
      setNews(data.news);
      console.log("Danh sách tin tức:", data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tin tức:", error);
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
              {news.map((newItem, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
                >
                  {/* <a href={newItem.titleLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src={newItem.image}
                      alt={newItem.title}
                      className="w-full h-56 object-cover"
                    />
                  </a> */}
                  <div className="p-4">
                    <Link to={newItem.titleLink}>
                      <img
                        src={newItem.image}
                        alt={newItem.title}
                        className="w-full h-56 object-cover"
                      />
                    </Link>
                    {/* <a
                      href={newItem.titleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2">
                        {newItem.title}
                      </h2>
                    </a> */}
                    <p className="text-gray-600 text-sm mb-3">{newItem.title}</p>
                    <div className="text-sm text-gray-500">{newItem.title}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </div>
    </FramePage>
  );
}


