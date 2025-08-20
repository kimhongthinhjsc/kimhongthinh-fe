import React, { useEffect, useState } from "react";
import FramePage from "~/components/FramePage/FramePage";
import Pagination from "~/components/Pagination/Pagination";
import {
  fetchProducts,
  fetchCategories,
  searchProducts,
} from "~/services/publicAPI";
import { Link } from "react-router-dom";
import ProductSkeleton from "./ProductSkeleton";
import SearchBar from "~/components/SearchBar/SearchBar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 12;

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data.categories || []);
    };
    loadCategories();
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      let data;
      if (keyword) {
        data = await searchProducts({
          keyword,
          page: currentPage,
          limit,
          categoryId: selectedCategory,
        });
      } else {
        data = await fetchProducts(currentPage, limit, selectedCategory);
      }
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);

      // Cuộn lên đầu khi trang thay đổi hoặc tìm kiếm
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    loadProducts();
  }, [currentPage, selectedCategory, keyword]);

  return (
    <FramePage>
      <div className="bg-blue-50 p-6 space-y-6">
        {/* Thanh filter + tìm kiếm */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          {/* Bộ lọc loại sản phẩm */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full font-medium border transition ${
                !selectedCategory
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
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
                className={`px-4 py-2 rounded-full font-medium border transition ${
                  selectedCategory === _id
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Thanh tìm kiếm bên phải */}
          <div className="w-full md:w-1/3">
            <SearchBar
              value={keyword}
              onSearch={(k) => {
                setKeyword(k);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: limit }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : products.map(({ _id, name, image, bestSeller }) => (
                <div
                  key={_id}
                  className="relative bg-white rounded-xl shadow-md p-4 text-center border-2 border-transparent hover:shadow-xl hover:border-orange-400 transition"
                >
                  {bestSeller && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-3 py-1 rounded-tl-xl rounded-br-xl text-sm shadow-md">
                      🔥 Bán chạy
                    </div>
                  )}
                  <div className="border-2 border-orange-400 rounded-lg p-4 mb-4 h-44 flex justify-center items-center overflow-hidden">
                    <img
                      src={image}
                      alt={name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="font-bold mb-3 text-gray-800 min-h-[48px]">
                    {name}
                  </div>
                  <Link to={`/san-pham/${_id}`}>
                    <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-6 py-2 rounded-full hover:from-orange-500 hover:to-yellow-500 transition">
                      Xem thêm
                    </button>
                  </Link>
                </div>
              ))}
        </div>

        {/* Pagination */}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </FramePage>
  );
};

export default Products;
