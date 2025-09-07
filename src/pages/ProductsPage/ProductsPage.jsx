import React, { useEffect, useState, useRef } from "react";
import SearchBar from "~/components/SearchBar/SearchBar";
import { useProductsInfinite, useCategory } from "~/hooks/useProduct";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";
import ProductSkeleton from "./ProductSkeleton";

const LOCAL_KEY = "products_filter_state";

const ProductsPage = () => {
  // Load state filter từ localStorage
  const savedState = JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}");
  const [selectedCategory, setSelectedCategory] = useState(savedState.selectedCategory || null);
  const [keyword, setKeyword] = useState(savedState.keyword || "");

  const observerRef = useRef(null);
  const limit = 8;

  const { data: categoryData } = useCategory();
  const categories = categoryData?.categories || [];

  // Reset khi search thay đổi
  const handleSearch = (value) => {
    setKeyword(value);
    setSelectedCategory(null); // reset category khi search
  };

  // Reset khi chọn category
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setKeyword(""); // reset keyword khi chọn category
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProductsInfinite({ limit, categoryId: selectedCategory, keyword });

  const allProducts = data?.pages.flatMap(page => page.products) || [];

  // Lưu state filter vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ selectedCategory, keyword }));
  }, [selectedCategory, keyword]);

  // Intersection Observer để load thêm sản phẩm
  useEffect(() => {
    if (!hasNextPage) return;
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="bg-bgPrimary p-4 md:p-6 space-y-6 min-h-screen">
      {/* Filter + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 flex-wrap">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={handleSelectCategory} // dùng handleSelectCategory
        />
        <div className="w-full md:flex-1 md:max-w-sm min-w-0">
          <SearchBar value={keyword} onSearch={handleSearch} /> {/* dùng handleSearch */}
        </div>
      </div>

      {/* Product grid */}
      <ProductGrid products={allProducts} isLoading={isLoading} limit={limit} />

      {/* Skeleton khi load thêm */}
      {isFetchingNextPage && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Element observe sản phẩm cuối */}
      {hasNextPage && <div ref={observerRef} className="h-10"></div>}

      {/* Hết dữ liệu */}
      {!hasNextPage && allProducts.length > 0 && (
        <p className="text-center text-gray-500 py-6">Đã tải hết sản phẩm</p>
      )}

      {/* Không có sản phẩm */}
      {!isLoading && allProducts.length === 0 && (
        <p className="text-center text-gray-500 py-6">Không tìm thấy sản phẩm nào.</p>
      )}
    </div>
  );
};

export default ProductsPage;
