import React from "react";

export default function ProductSearchBar({ value, onChange }) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-2 flex-1"
      />
    </div>
  );
}
