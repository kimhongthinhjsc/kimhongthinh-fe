import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 text-center border-2 border-transparent animate-pulse">
      {/* Badge */}
      <div className="absolute top-0 left-0 w-20 h-6 bg-gray-300 rounded-tl-xl rounded-br-xl"></div>

      {/* Image */}
      <div className="border-2 border-gray-200 rounded-lg p-4 mb-4 h-44 flex justify-center items-center">
        <div className="w-24 h-24 bg-gray-300 rounded"></div>
      </div>

      {/* Title */}
      <div className="h-6 bg-gray-300 rounded mb-3 w-3/4 mx-auto"></div>

      {/* Button */}
      <div className="h-10 bg-gray-300 rounded-full w-28 mx-auto"></div>
    </div>
  );
};

export default ProductSkeleton;
