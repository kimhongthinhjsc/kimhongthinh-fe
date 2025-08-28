import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ _id, name, image, bestSeller }) {
  return (
    <div className="relative bg-white rounded-xl shadow-md p-3 sm:p-4 text-center border-2 border-transparent hover:shadow-xl hover:border-primary transition">
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
  );
}
