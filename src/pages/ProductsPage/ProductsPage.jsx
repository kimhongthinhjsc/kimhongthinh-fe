import React, { useEffect, useState } from "react";
import Pagination from "~/components/Pagination/Pagination";
import { getCategories } from "~/services/categorieAPI";
import SearchBar from "~/components/SearchBar/SearchBar";
import { useProducts } from "~/hooks/usePublic";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data.categories || []);
    };
    loadCategories();
  }, []);

  const { data, isLoading } = useProducts({
    page: currentPage,
    limit,
    categoryId: selectedCategory,
    keyword,
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="bg-bgPrimary p-4 md:p-6 space-y-6 min-h-screen">
      {/* Filter + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 flex-wrap">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={(catId) => {
            setSelectedCategory(catId);
            setCurrentPage(1);
          }}
        />
        <div className="w-full md:flex-1 md:max-w-sm min-w-0">
          <SearchBar
            value={keyword}
            onSearch={(k) => {
              setKeyword(k);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Products grid */}
      <ProductGrid products={products} isLoading={isLoading} limit={limit} />

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ProductsPage;
