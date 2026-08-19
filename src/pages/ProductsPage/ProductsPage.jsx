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

  // Reset khi search thay đổi + Cuộn lên đầu
  const handleSearch = (value) => {
    setKeyword(value);
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset khi chọn category + Cuộn lên đầu
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setKeyword("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProductsInfinite({ limit, categoryId: selectedCategory, keyword });

  // Lấy toàn bộ sản phẩm và lọc trùng lặp ID (nếu có)
  const rawProducts = data?.pages.flatMap((page) => page.products) || [];
  const allProducts = Array.from(
    new Map(rawProducts.map((p) => [p._id || p.id, p])).values()
  );

  // Lưu state filter vào localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ selectedCategory, keyword }));
  }, [selectedCategory, keyword]);

  // Intersection Observer chuẩn - Chặn gọi trùng khi đang fetching
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="bg-bgPrimary p-4 md:p-6 space-y-6 min-h-screen">
      {/* Filter + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 flex-wrap">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={handleSelectCategory}
        />
        <div className="w-full md:flex-1 md:max-w-sm min-w-0">
          <SearchBar value={keyword} onSearch={handleSearch} />
        </div>
      </div>

      {/* Product grid */}
      <ProductGrid products={allProducts} isLoading={isLoading} limit={limit} />

      {/* Skeleton khi load thêm */}
      {isFetchingNextPage && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Element observe sản phẩm cuối (Chỉ hiển thị khi không phải trang đầu đang load) */}
      {hasNextPage && !isLoading && (
        <div ref={observerRef} className="h-10 w-full"></div>
      )}

      {/* Hết dữ liệu */}
      {!hasNextPage && allProducts.length > 0 && !isLoading && (
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