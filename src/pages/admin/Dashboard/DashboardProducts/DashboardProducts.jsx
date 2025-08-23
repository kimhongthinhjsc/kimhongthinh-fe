import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "~/services/publicAPI";
import SearchBar from "~/components/SearchBar/SearchBar";
import ProductTable from "./ProductTable";

export default function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    loadProducts();
  }, [currentPage, search]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts(currentPage, itemsPerPage, search);
    setProducts(data.products || []);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  };

  const handleAddSuccess = () => {
    setShowModal(false);
    loadProducts();
  };

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/admin/dashboard/products/${id}/edit`);
  };

  const handleCreate = () => {
    navigate("/admin/dashboard/products/create");
  };

  // Skeleton loading cho bảng
  const renderSkeleton = () => {
    return (
      <div className="overflow-x-auto border rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 w-20">Ảnh</th>
              <th className="border p-2">Tên sản phẩm</th>
              <th className="border p-2 w-28">Giá</th>
              <th className="border p-2 w-36">Danh mục</th>
              <th className="border p-2 w-40">Loại sản phẩm</th>
              <th className="border p-2 w-28">Best Seller</th>
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
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
                </td>
                <td className="border p-2 text-center">
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
                </td>
                <td className="border p-2 text-center">
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
                </td>
                <td className="border p-2 text-center">
                  <div className="h-4 bg-gray-200 rounded w-6 mx-auto" />
                </td>
                <td className="border p-2 text-center">
                  <div className="h-4 bg-gray-200 rounded w-6 mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* Tìm kiếm */}
      <SearchBar
        value={search}
        onSearch={(k) => {
          setSearch(k);
          setCurrentPage(1);
        }}
      />

      {/* Danh sách sản phẩm */}
      {loading ? (
        renderSkeleton()
      ) : (
        <ProductTable products={products} onEdit={handleEdit} />
      )}

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-center gap-2">
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
