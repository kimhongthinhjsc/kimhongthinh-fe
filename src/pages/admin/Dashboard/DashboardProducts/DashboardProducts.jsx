import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "~/components/SearchBar/SearchBar";
import ProductTable from "./ProductTable";
import ProductTableSkeleton from "./ProductTableSkeleton";
import Pagination from "~/components/Pagination/Pagination";
import { useProducts, useCategory } from "~/hooks/usePublic";
import CategoryFilter from "~/pages/ProductsPage/CategoryFilter";

export default function DashboardProducts() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const { data: categoryData } = useCategory();
  const categories = categoryData?.categories || [];

  // Dùng hook useProducts
  const { data, isLoading, isFetching } = useProducts({
    page: currentPage,
    limit: itemsPerPage,
    keyword: search,
    categoryId: selectedCategory, // không filter theo category
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

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
          setCurrentPage(1); // reset trang khi search
        }}
      />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Danh sách sản phẩm */}
      {isLoading || isFetching ? (
        <ProductTableSkeleton rows={itemsPerPage} />
      ) : (
        <ProductTable products={products} onEdit={handleEdit} />
      )}

      {/* Pagination */}
      {!isLoading && !isFetching && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
