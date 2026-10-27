import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "~/components/SearchBar/SearchBar";
import ProductTable from "./ProductTable";
import ProductTableSkeleton from "./ProductTableSkeleton";
import Pagination from "~/components/Pagination/Pagination";
import { useProducts, useCategory } from "~/hooks/useProduct";
import CategoryFilter from "~/pages/ProductsPage/CategoryFilter";

export default function DashboardProducts() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const { data: categoryData } = useCategory();
  const categories = categoryData?.categories || [];

  // Dùng hook useProducts với đầy đủ tham số
  const { data, isLoading, isFetching } = useProducts({
    page: currentPage,
    limit: itemsPerPage,
    keyword: search,
    categoryId: selectedCategory,
  });

  // Bọc an toàn mảng sản phẩm và tổng số trang
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-medium"
        >
          + Thêm sản phẩm
        </button>
      </div>

      {/* Tìm kiếm & Lọc danh mục */}
      <SearchBar
        value={search}
        onSearch={(k) => {
          setSearch(k);
          setCurrentPage(1); // Reset lại trang 1 khi thực hiện tìm kiếm
        }}
      />
      
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={(catId) => {
            setSelectedCategory(catId);
            setCurrentPage(1); // Reset trang khi thay đổi danh mục
          }}
        />
      )}

      {/* Danh sách sản phẩm */}
      {isLoading || isFetching ? (
        <ProductTableSkeleton rows={itemsPerPage} />
      ) : (
        <ProductTable products={products} onEdit={handleEdit} />
      )}

      {/* Phân trang */}
      {!isLoading && !isFetching && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
