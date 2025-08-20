import React, { useState } from "react";

export default function SearchBar({ value = "", onSearch }) {
  const [keyword, setKeyword] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword.trim()); // truyền ra page cha
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        Tìm
      </button>
    </form>
  );
}
