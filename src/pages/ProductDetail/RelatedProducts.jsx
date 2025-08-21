import React, { useEffect, useState } from "react";
import { fetchProducts } from "~/services/publicAPI";
import { Link } from "react-router-dom";

const RelatedProducts = ({ categoryId, subcategoryId, currentProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const data = await fetchProducts(1, 6, categoryId, subcategoryId);
        // lọc bỏ sản phẩm đang xem
        const filtered = data.products.filter(
          (p) => p._id !== currentProductId
        );
        setProducts(filtered);
      } catch (error) {
        console.error("❌ Lỗi khi tải sản phẩm liên quan:", error);
      }
    };
    if (categoryId || subcategoryId) loadRelated();
  }, [categoryId, subcategoryId, currentProductId]);

  if (!products.length) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Sản phẩm liên quan
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            to={`/san-pham/${product._id}`}
            key={product._id}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={product.images?.[0] || product.image || "/placeholder.jpg"}
              alt={product.name}
              className="h-40 mx-auto object-contain"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                {product.name}
              </h3>
              <p className="text-orange-600 font-bold text-sm">
                {product.price?.toLocaleString()}₫
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
