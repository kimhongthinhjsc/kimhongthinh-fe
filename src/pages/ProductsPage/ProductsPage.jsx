import React, { useEffect, useState, useRef } from "react";

import SearchBar from "~/components/SearchBar/SearchBar";
import { useProductsInfinite, useCategory  } from "~/hooks/usePublic";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";
import ProductSkeleton from "./ProductSkeleton";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [keyword, setKeyword] = useState("");

  const observerRef = useRef(null);
  const limit = 8;

 const { data: categoryData } = useCategory();
  const categories = categoryData?.categories || [];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProductsInfinite({ limit, categoryId: selectedCategory, keyword });

  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  // Intersection Observer: load thêm khi sản phẩm cuối xuất hiện
  useEffect(() => {
    if (!hasNextPage) return;
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          fetchNextPage();
        }
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
          onSelect={setSelectedCategory}
        />
        <div className="w-full md:flex-1 md:max-w-sm min-w-0">
          <SearchBar value={keyword} onSearch={setKeyword} />
        </div>
      </div>

      {/* Products grid */}
      <ProductGrid products={allProducts} isLoading={isLoading} limit={limit} />

      {/* Skeleton loading khi load thêm */}
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
        <p className="text-center text-gray-500 py-6">
          Không tìm thấy sản phẩm nào.
        </p>
      )}
    </div>
  );
};

export default ProductsPage;
