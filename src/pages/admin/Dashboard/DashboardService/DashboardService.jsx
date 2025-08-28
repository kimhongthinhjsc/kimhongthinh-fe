import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "~/components/SearchBar/SearchBar";
import ServiceTable from "./ServiceTable";
import { useServices } from "~/hooks/usePublic";
import ServiceTableSkeleton from "./ServiceTableSkeleton";

export default function DashboardServices() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const { data, isLoading } = useServices({
    keyword: search,
    page: currentPage,
    limit: itemsPerPage,
  });

  const services = data?.services || [];
  const totalPages = data?.totalPages || 1;

  const handleEdit = (id) => navigate(`/admin/dashboard/services/${id}/edit`);
  const handleAddService = () => navigate(`/admin/dashboard/services/create`);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={handleAddService}
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

      {isLoading ? (
        <ServiceTableSkeleton rows={itemsPerPage} />
      ) : (
        <ServiceTable services={services} onEdit={handleEdit} />
      )}

      {/* Pagination */}
      {!isLoading && (
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
    </div>
  );
}
