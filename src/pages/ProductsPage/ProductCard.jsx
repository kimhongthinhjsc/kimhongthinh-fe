import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function ProductCard({ _id, name, image, bestSeller, price }) {
  return (
    <div className="relative bg-white rounded-xl shadow-md p-3 sm:p-4 text-center border-2 border-transparent hover:shadow-xl hover:border-primary transition flex flex-col">
      {bestSeller && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-2 sm:px-3 py-1 rounded-tl-xl rounded-br-xl text-xs sm:text-sm shadow-md">
          🔥 Bán chạy
        </div>
      )}

      <div className="border-2 border-cardBorder rounded-lg p-2 sm:p-4 mb-2 h-40 sm:h-44 flex justify-center items-center overflow-hidden">
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Tên sản phẩm, thu nhỏ nếu dài */}
      <div className="font-bold text-gray-800 text-sm sm:text-base mb-1 truncate" style={{ lineHeight: '1.2' }}>
        {name}
      </div>

      {/* Giá hoặc Giá: Liên hệ */}
      <div className="flex items-center justify-center text-sm sm:text-base mb-3">
        {price > 0 ? (
          <span className="text-primary font-bold">
            {price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-green-600 font-bold">
            <Phone size={14} /> Giá: Liên hệ
          </span>
        )}
      </div>

      <Link to={`/san-pham/${_id}`} className="mt-auto">
        <button className="btn-ocean w-full">Xem thêm</button>
      </Link>
    </div>
  );
}
