import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCareer, getCareerList } from "~/services/adminAPI";
import FormDelete from "~/components/FormNotify/FormDelete";
import { Calendar, Users, DollarSign, Briefcase, RefreshCw } from "lucide-react";

export default function CareerAdmin() {
  const [careers, setCareers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  // Gọi API
  const getCareers = async () => {
    try {
      setLoading(true);
      const data = await getCareerList(currentPage, itemsPerPage);
      setCareers(data.careers || []);
      setTotalPages(data.totalPages);
      console.log(totalPages)
    } catch (error) {
      console.error("Lỗi khi lấy tin tức:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const career = careers.find((item) => item._id === id);
    if (career) {
      navigate(`/admin/dashboard/careers/update`, { state: { id: career._id } });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCareer(id);
      setCareers(careers.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa tin tức:", error);
    }
  };

  useEffect(() => {
    getCareers();
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
    <div className="space-y-6 m-4">
      {/* Nút thêm tuyển dụng */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => navigate("/admin/dashboard/careers/create")}
          className="px-5 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow hover:bg-green-600 transition"
        >
          + Thêm tuyển dụng
        </button>
      </div>
      {/* Danh sách tin tuyển dụng */}
      <ul className="space-y-4">
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
            <li
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg shadow-sm bg-white animate-pulse"
            >
              {/* Cột trái */}
              <div className="col-span-12 md:col-span-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>

              {/* Cột giữa */}
              <div className="md:col-span-6 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>

              {/* Cột phải */}
              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
              </div>
            </li>
          ))
          :
          careers.map((career) => {
            const deadlineDate = new Date(career.deadline);
            const today = new Date();
            const diffTime = deadlineDate - today;
            const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return (
              <li
                key={career._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg shadow-sm bg-white"
              >
                {/* Cột trái - Thông tin (4 dòng tối đa) */}
                <div className="col-span-12 md:col-span-4 flex flex-col justify-between pr-4 border-r border-gray-200 text-sm text-gray-700">
                  <h2 className="font-semibold text-base text-gray-900 mb-1">
                    {career.title}
                  </h2>

                  {[
                    <p className="flex items-center gap-2" key="updated">
                      <RefreshCw size={15} className="text-indigo-500" />
                      {new Date(career.updatedAt).toLocaleDateString("vi-VN")} |
                      <Calendar size={15} className="text-blue-500 ml-1" />
                      {deadlineDate.toLocaleDateString("vi-VN")}
                      <span
                        className={`ml-2 font-medium ${remainingDays > 0 ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        {remainingDays > 0
                          ? `Còn ${remainingDays} ngày`
                          : "Đã hết hạn"}
                      </span>
                    </p>,

                    <p className="flex items-center gap-2" key="quantity">
                      <Users size={15} className="text-green-500" />
                      {career.quantity} người |
                      <Briefcase size={15} className="text-purple-500 ml-1" />
                      {career.experience?.length > 25
                        ? career.experience.slice(0, 25) + "..."
                        : career.experience}
                    </p>,

                    <p className="flex items-center gap-2" key="salary">
                      <DollarSign size={15} className="text-yellow-500" />
                      {career.salary}
                    </p>,
                  ].slice(0, 3)}
                </div>

                {/* Cột giữa - Mô tả */}
                <div className="md:col-span-6 text-gray-700 text-sm md:px-4 md:border-r border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-1">Mô tả:</h3>
                  <p className="line-clamp-3 leading-snug">{career.description}</p>
                </div>

                {/* Cột phải - Nút thao tác */}
                <div className="md:col-span-2 col-span-12 flex md:items-center md:justify-end gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => handleEdit(career._id)}
                    className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Sửa
                  </button>

                  <FormDelete
                    handleDelete={() => handleDelete(career._id)}
                    urlBack="/admin/dashboard/careers"
                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow hover:bg-red-600 transition"
                  />
                </div>
              </li>
            );
          })}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {/* Nút trước */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Trước
          </button>

          {/* Hiển thị trang */}
          {paginationPages[0] > 1 && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-3 py-1 rounded border ${currentPage === 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white hover:bg-gray-100"
                  }`}
              >
                1
              </button>
              {paginationPages[0] > 2 && <span className="px-2">...</span>}
            </>
          )}

          {paginationPages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border ${page === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          ))}

          {paginationPages[paginationPages.length - 1] < totalPages && (
            <>
              {paginationPages[paginationPages.length - 1] < totalPages - 1 && (
                <span className="px-2">...</span>
              )}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-1 rounded border ${currentPage === totalPages
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white hover:bg-gray-100"
                  }`}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Nút sau */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}

    </div>
  );
}
