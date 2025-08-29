import React, { useEffect, useState } from "react";
import { fetchProducts } from "~/services/publicAPI";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react"; // Icon liên hệ

const RelatedProducts = ({ categoryId, subcategoryId, currentProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const data = await fetchProducts(1, 6, categoryId, subcategoryId);
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
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Sản phẩm liên quan
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <Link
            to={`/san-pham/${product._id}`}
            key={product._id}
            className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
          >
            <div className="relative overflow-hidden h-44 flex items-center justify-center bg-gray-50">
              <img
                src={product.images?.[0] || product.image || "/placeholder.jpg"}
                alt={product.name}
                className="object-contain h-full w-full transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4 flex flex-col">
              <h3 className="font-semibold text-gray-800 text-sm mb-2 truncate">
                {product.name}
              </h3>

              {/* Giữ cùng chiều cao cho cả giá và Liên hệ */}
              <div className="h-6 flex items-center mb-2">
                {product.price > 0 ? (
                  <p className="text-primary font-bold text-base">
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                ) : (
                  <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                    <Phone size={14} /> Giá: Liên hệ
                  </div>
                )}
              </div>

              <button className="mt-auto w-full bg-primary text-white text-xs font-medium py-1 rounded hover:bg-primary-dark transition">
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
