import React from "react";

const PriceTag = ({ price, className = "" }) => {
  if (!price) return null;
  return (
    <span className={`text-lg font-bold text-orange-600 ${className}`}>
      {price.toLocaleString("vi-VN")} đ
    </span>
  );
};

export default PriceTag;
