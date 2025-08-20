// src/services/productAPI.js
import api from "./api"; // 👈 dùng instance có interceptor

// Lấy danh sách sản phẩm
export const fetchProducts = async (page = 1, limit = 12, categoryId, subcategoryId) => {
  try {
    const params = { page, limit };
    if (categoryId) params.categoryId = categoryId;
    if (subcategoryId) params.subcategoryId = subcategoryId;

    const res = await api.get("/products", { params });
    return res.data; // { products, totalPages, currentPage }
  } catch (error) {
    console.error("❌ fetchProducts error:", error);
    return { products: [], totalPages: 1, currentPage: 1 };
  }
};

// Lấy danh mục
export const fetchCategories = async () => {
  try {
    const res = await api.get("/categories");
    return res.data; // giả sử trả về mảng categories
  } catch (error) {
    console.error("❌ fetchCategories error:", error);
    return [];
  }
};

// Lấy chi tiết sản phẩm theo ID
export const fetchProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("❌ fetchProductById error:", error);
    return null;
  }
};

// Lấy dữ liệu trang chủ
export const fetchHomeData = async () => {
  try {
    const res = await api.get("/home");
    return res.data;
  } catch (error) {
    console.error("❌ fetchHomeData error:", error);
    return null;
  }
};


export const getCompanyProfile = async () => {
  const res = await api.get("/company-profile");
  return res.data;
};
