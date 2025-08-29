// ProductMainInfo.jsx
import React from "react";
import ProductImages from "~/components/ImageCarousel/ImageCarousel";
import PriceTag from "~/components/PriceTag/PriceTag";
import HighlightList from "~/components/HighlightList/HighlightList";

export const ProductMainInfo = ({ product }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Carousel ảnh */}
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      <ProductImages images={product.images} alt={product.name} />
    </div>

    {/* Thông tin chi tiết */}
    <div className="flex flex-col justify-between">
      {product.bestSeller && (
        <div className="mb-5 inline-block bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-5 py-2 rounded-full shadow-lg animate-pulse">
          🔥 Sản phẩm bán chạy
        </div>
      )}

      <div className="space-y-2 text-gray-700">
        <p><span className="font-semibold">Danh mục:</span> {product.categoryName}</p>
        <p><span className="font-semibold">Nhóm:</span> {product.subcategoryName || "Chưa có"}</p>
        <p><span className="font-semibold">Thương hiệu:</span> {product.brand}</p>
        <p><span className="font-semibold">Bảo hành:</span> {product.warranty}</p>
      </div>

      <PriceTag price={product.price} className="my-6 text-2xl" />

      <p className="text-gray-600 leading-relaxed">{product.description}</p>

      <HighlightList highlights={product.highlights} className="mt-5" />
    </div>
  </div>
);
