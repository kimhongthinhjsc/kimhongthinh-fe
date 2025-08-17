import React, { useEffect, useState } from "react";
import FramePage from "~/components/FramePage/FramePage";
import Pagination from "~/components/Pagination/Pagination";
import { fetchProducts } from "~/services/publicAPI";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(currentPage, limit);
      setProducts(data.products);
      setTotalPages(data.totalPages);
    };

    loadProducts();
  }, [currentPage]);

  return (
    <FramePage>
      <div className="bg-blue-50 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(({ _id, name, image, bestSeller }) => (
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </FramePage>
  );
};

export default Products;
