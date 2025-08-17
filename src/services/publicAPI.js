import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// GET list products
export const fetchProducts = async (page = 1, limit = 12) => {
  try {
    const res = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error("Lỗi khi fetch products");
    return await res.json(); // { products, totalPages }
  } catch (error) {
    console.error("❌ fetchProducts error:", error);
    return { products: [], totalPages: 1 };
  }
};

// POST: thêm sản phẩm
export const addProduct = async (product) => {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Lỗi khi thêm sản phẩm");
    return await res.json();
  } catch (error) {
    console.error("❌ addProduct error:", error);
    return null;
  }
};


// DELETE: xoá sản phẩm
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Lỗi khi xoá sản phẩm");
    return true;
  } catch (error) {
    console.error("❌ deleteProduct error:", error);
    return false;
  }
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`/api/products/${id}`);
  return res.data;
};
