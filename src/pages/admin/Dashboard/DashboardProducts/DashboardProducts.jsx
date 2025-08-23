import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, searchProductsbyKeyword } from "~/services/publicAPI";
import SearchBar from "~/components/SearchBar/SearchBar";
import ProductTable from "./ProductTable";
import ProductTableSkeleton from "./ProductTableSkeleton";
import Pagination from "~/components/Pagination/Pagination";

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
    if (search.trim()) {
      console.log("Searching for:", search);
      const data = await searchProductsbyKeyword({
        keyword: search,
        currentPage,
        itemsPerPage,
      });
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } else {
      const data = await fetchProducts(currentPage, itemsPerPage);
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    }
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
        <ProductTableSkeleton rows={itemsPerPage} />
      ) : (
        <ProductTable products={products} onEdit={handleEdit} />
      )}

      {/* Pagination */}
      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
