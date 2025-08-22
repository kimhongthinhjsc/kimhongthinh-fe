import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllService, getServiceByKeyword } from "~/services/publicAPI";
import SearchBar from "~/components/SearchBar/SearchBar";
import ServiceTable from "./ServiceTable";
import AddServiceModal from "./AddServiceModal";
// Table component riêng

export default function DashboardServices() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, [currentPage, search]);

  const loadServices = async () => {
    setLoading(true);
    let data;
    if (search) {
      data = await getServiceByKeyword(search, currentPage, itemsPerPage);
    } else {
      const all = await getAllService();
      // phân trang thủ công nếu API chưa hỗ trợ
      const total = all.services.length;
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      data = {
        services: all.services.slice(start, end),
        totalPages: Math.ceil(total / itemsPerPage),
      };
    }
    setServices(data.services || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  const handleAddSuccess = () => {
    setShowModal(false);
    loadServices();
  };

  const handleEdit = (id) => {
    navigate(`/admin/dashboard/services/${id}/edit`);
  };

  // Skeleton
  const renderSkeleton = () => (
    <div className="overflow-x-auto border rounded">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-20">Ảnh</th>
            <th className="border p-2">Tên dịch vụ</th>
            <th className="border p-2 w-36">Danh mục</th>
            <th className="border p-2 w-28">Giá</th>
            <th className="border p-2 w-20">Sửa</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="border p-2">
                <div className="w-12 h-12 bg-gray-200 rounded mx-auto" />
              </td>
              <td className="border p-2">
                <div className="h-4 bg-gray-200 rounded w-40" />
              </td>
              <td className="border p-2 text-center">
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
              </td>
              <td className="border p-2 text-center">
                <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
              </td>
              <td className="border p-2 text-center">
                <div className="h-4 bg-gray-200 rounded w-10 mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Thêm dịch vụ
        </button>
      </div>

      <SearchBar
        value={search}
        onSearch={(k) => {
          setSearch(k);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        renderSkeleton()
      ) : (
        <ServiceTable services={services} onEdit={handleEdit} />
      )}

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      )}
      {/* Modal for adding new service */}
      {showModal && (
        <AddServiceModal
          onClose={() => setShowModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
}
