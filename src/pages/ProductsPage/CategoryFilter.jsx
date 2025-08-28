import React from "react";

export default function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 flex-1 min-w-0">
      <button
        onClick={() => onSelect(null)}
        className={`${
          !selectedCategory
            ? "btn-ocean"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition"
        }`}
      >
        Tất cả
      </button>
      {categories.map(({ _id, name }) => (
        <button
          key={_id}
          onClick={() => onSelect(_id)}
          className={`${
            selectedCategory === _id
              ? "btn-ocean"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition"
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
