// src/components/CategorySelector/CategorySelector.jsx
import React, { useEffect, useState } from "react";
import { getCategories } from "~/services/categorieAPI";

export default function CategorySelector({ product, setProduct }) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (product?.categoryId) {
      const selectedCategory = categories.find(
        (c) => c._id === product.categoryId
      );
      setSubcategories(selectedCategory?.subcategories || []);
    } else {
      setSubcategories([]);
    }
  }, [product?.categoryId, categories]);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.categories || res);
  };

  return (
    <div
      className="p-4 rounded-lg 
        shadow bg-white
        grid gap-4
        grid-cols-1          /* mobile */
        sm:grid-cols-1       /* tablet */
        lg:grid-cols-2       /* laptop */
        xl:grid-cols-2       /* desktop lớn */
      "
    >
      <div>
        <label className="block font-semibold mb-1">Danh mục</label>
        <select
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={product.categoryId || ""}
          onChange={(e) => {
            const categoryId = e.target.value;
            setProduct({ ...product, categoryId, subcategoryId: "" });
          }}
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Danh mục con</label>
        <select
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={product.subcategoryId || ""}
          onChange={(e) =>
            setProduct({ ...product, subcategoryId: e.target.value })
          }
        >
          <option value="">-- Chọn danh mục con --</option>
          {subcategories.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
