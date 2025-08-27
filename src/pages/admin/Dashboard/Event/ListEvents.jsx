import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteEvent, getEventList } from "~/services/adminAPI";
import FormDelete from "./FormDelete";
import './Event.scss';

export default function EventList() {
  const [eventList, setEventList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // ✅ thêm state loading
  const itemsPerPage = 10;
  const [toast, setToast] = useState(null); // ✅ state thông báo

  const navigate = useNavigate();
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // 3 giây tự biến mất
  };

  // Gọi API
  const getNews = async () => {
    try {
      setLoading(true); // ✅ bật loading
      const data = await getEventList(currentPage, itemsPerPage);
      setEventList(data.events || []);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy sự kiện:", error);
    } finally {
      setLoading(false); // ✅ tắt loading
    }
  };

  const handleEdit = (id) => {
    const event = eventList.find((item) => item._id === id);
    if (event) {
      navigate(`/admin/dashboard/events/update`, { state: { id: event._id } });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEventList(eventList.filter((item) => item._id !== id));
      showToast("Xóa sự kiện thành công!", "success");
    } catch (error) {
      console.error("Lỗi khi xóa sự kiện:", error);
      showToast("Xóa sự kiện thất bại!", "error");
    }
  };

  useEffect(() => {
    getNews();
  }, [currentPage]);

  // Tính trang để hiển thị
  const getPagination = () => {
    const delta = 2;
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (currentPage <= delta) {
      end = Math.min(totalPages, 5);
    } else if (currentPage + delta > totalPages) {
      start = Math.max(1, totalPages - 4);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const paginationPages = getPagination();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
        <span>Danh sách sự kiện</span>
        <Link
          to="/admin/dashboard/events/create"
          className="
    flex items-center gap-2 px-4 py-2
    bg-gradient-to-r from-green-500 to-green-600
    text-white font-medium rounded-lg shadow
    hover:from-green-600 hover:to-green-700
    transform hover:scale-105 transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
  "
        >
          <span className="text-base">➕</span>
          <span className="text-sm">Thêm sự kiện</span>
        </Link>

      </h1>

      {/* ✅ Skeleton Loading */}
      {loading ? (
        <ul className="space-y-4">
          {Array.from({ length: itemsPerPage }).map((_, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 h-16 bg-gray-300 rounded"></div>
                <div className="space-y-2">
                  <div className="w-40 h-4 bg-gray-300 rounded"></div>
                  <div className="w-28 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="w-12 h-8 bg-gray-300 rounded"></div>
                <div className="w-12 h-8 bg-gray-300 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-4">
          {eventList.map((event) => (
            <li
              key={event._id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold text-lg">{event.title}</h2>
                  <p className="text-sm text-gray-500 italic mt-1">
                    {new Date(event.updatedAt).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}{" "}
                    - <span className="font-medium text-gray-700">{event.author}</span>
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(event._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Sửa
                </button>
                <FormDelete
                  handleDelete={() => handleDelete(event._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-center mt-6 space-x-1">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            &lt;
          </button>

          {/* Pages */}
          {paginationPages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      )}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
