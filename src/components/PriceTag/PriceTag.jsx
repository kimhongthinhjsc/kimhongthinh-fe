import React from "react";

const PriceTag = ({ price, className = "" }) => {
  const baseStyle = `inline-block px-3 py-1 rounded-md font-bold text-lg ${className}`;

  if (!price) {
    return (
      <div
        className={`${baseStyle} bg-orange-100 text-orange-600 border border-orange-300 italic`}
      >
        Xem giá bên dưới
      </div>
    );
  }

  return (
    <span
      className={`${baseStyle} bg-orange-50 text-orange-700 border border-orange-200 shadow-sm`}
    >
      {price.toLocaleString("vi-VN")} đ
    </span>
  );
};

export default PriceTag;
