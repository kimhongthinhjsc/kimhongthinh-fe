// RelatedProducts.jsx
import React, { useEffect, useState } from "react";
import { fetchProducts } from "~/services/publicAPI";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const RelatedProducts = ({ categoryId, subcategoryId, currentProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const data = await fetchProducts(1, 6, categoryId, subcategoryId);
        const filtered = data.products.filter((p) => p._id !== currentProductId);
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Sản phẩm liên quan
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <Link
            to={`/san-pham/${product._id}`}
            key={product._id}
            className="group flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 hover:-translate-y-1"
          >
            <div className="relative overflow-hidden h-44 flex items-center justify-center bg-gray-50">
              <img
                src={product.images?.[0] || product.image || "/placeholder.jpg"}
                alt={product.name}
                className="object-contain h-full w-full transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 min-h-[36px]">
                {product.name}
              </h3>

              {/* Giá hoặc Liên hệ */}
              <div className="h-7 flex items-center mb-3">
                {product.price > 0 ? (
                  <p className="text-primary font-bold text-base">
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                ) : (
                  <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                    <Phone size={14} /> Liên hệ
                  </div>
                )}
              </div>

              <button className="mt-auto w-full bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-medium py-2 rounded-lg shadow hover:opacity-90 transition">
                Xem chi tiết
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
