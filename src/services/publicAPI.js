import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

// GET list products (hỗ trợ filter)
export const fetchProducts = async (page = 1, limit = 12, categoryId, subcategoryId) => {
  try {
    const params = { page, limit };
    if (categoryId) params.categoryId = categoryId;
    if (subcategoryId) params.subcategoryId = subcategoryId;

    const res = await axios.get(`${API_URL}/products`, { params });
    return res.data; // { products, totalPages, currentPage }
  } catch (error) {
    console.error("❌ fetchProducts error:", error);
    return { products: [], totalPages: 1, currentPage: 1 };
  }
};

// GET list categories
export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}/categories`);
    return res.data; // giả sử trả về mảng categories
  } catch (error) {
    console.error("❌ fetchCategories error:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};
