import React, { useEffect, useState } from "react";
import Pagination from "~/components/Pagination/Pagination";
import { getCategories } from "~/services/categorieAPI";
import { Link } from "react-router-dom";
import ProductSkeleton from "./ProductSkeleton";
import SearchBar from "~/components/SearchBar/SearchBar";
import { useProducts } from "~/hooks/usePublic";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  // gọi categories riêng (chưa query hóa, có thể query hóa thêm)
  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data.categories || []);
    };
    loadCategories();
  }, []);

  // gọi product data qua React Query
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
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 sm:gap-3 flex-1 min-w-0">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage(1);
            }}
            className={`${
              !selectedCategory
                ? "btn-ocean"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition"
            }`}
          >
            Tất cả
          </button>
          {categories.map(({ _id, name }) => (
            <button
              key={_id}
              onClick={() => {
                setSelectedCategory(_id);
                setCurrentPage(1);
              }}
              className={`${
                selectedCategory === _id
                  ? "btn-ocean"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Search bar */}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {isLoading
          ? Array.from({ length: limit }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : products.length > 0
          ? products.map(({ _id, name, image, bestSeller }) => (
              <div
                key={_id}
                className="relative bg-white rounded-xl shadow-md p-3 sm:p-4 text-center border-2 border-transparent hover:shadow-xl hover:border-primary transition"
              >
                {bestSeller && (
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-2 sm:px-3 py-1 rounded-tl-xl rounded-br-xl text-xs sm:text-sm shadow-md">
                    🔥 Bán chạy
                  </div>
                )}
                <div className="border-2 border-cardBorder rounded-lg p-2 sm:p-4 mb-3 sm:mb-4 h-40 sm:h-44 flex justify-center items-center overflow-hidden">
                  <img
                    src={image}
                    alt={name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="font-bold mb-2 sm:mb-3 text-gray-800 text-sm sm:text-base min-h-[40px] sm:min-h-[48px]">
                  {name}
                </div>
                <Link to={`/san-pham/${_id}`}>
                  <button className="btn-ocean">Xem thêm</button>
                </Link>
              </div>
            ))
          : (
              <div className="col-span-full text-center text-gray-500 py-6">
                Không tìm thấy sản phẩm nào.
              </div>
            )}
      </div>

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
