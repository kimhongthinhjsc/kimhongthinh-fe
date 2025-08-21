// src/services/subcategoryAPI.js
import api from "./api";

/**
 * Lấy danh sách subcategories (có thể filter/search)
 * @param {Object} params { categoryId, q }
 */

export const getCategories = async (params = {}) => {
  try {
    const res = await api.get("/categories", { params });
    return res.data;
  } catch (error) {
    console.error("❌ getCategories error:", error);
    return { categories: [], total: 0, currentPage: 1, totalPages: 1 };
  }
};

/**
 * Tạo mới category
 */
export const createCategory = async (data) => {
  try {
    const res = await api.post("/categories", data);
    return res.data;
  } catch (error) {
    console.error("❌ createCategory error:", error);
    throw error;
  }
};

/**
 * Cập nhật category
 */
export const updateCategory = async (id, data) => {
  try {
    const res = await api.put(`/categories/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("❌ updateCategory error:", error);
    throw error;
  }
};

/**
 * Xoá category
 */
export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  } catch (error) {
    console.error("❌ deleteCategory error:", error);
    throw error;
  }
};
export const getSubcategories = async (params = {}) => {
  try {
    const res = await api.get("/subcategories", { params });
    return res.data;
  } catch (error) {
    console.error("❌ getSubcategories error:", error);
    return { subcategories: [], total: 0 };
  }
};

/**
 * Lấy 1 subcategory theo id
 */
export const getSubcategoryById = async (id) => {
  try {
    const res = await api.get(`/subcategories/${id}`);
    return res.data;
  } catch (error) {
    console.error("❌ getSubcategoryById error:", error);
    return null;
  }
};

/**
 * Tạo mới subcategory
 */
export const createSubcategory = async (data) => {
  try {
    const res = await api.post("/subcategories", data);
    return res.data;
  } catch (error) {
    console.error("❌ createSubcategory error:", error);
    throw error;
  }
};

/**
 * Cập nhật subcategory
 */
export const updateSubcategory = async (id, data) => {
  try {
    const res = await api.put(`/subcategories/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("❌ updateSubcategory error:", error);
    throw error;
  }
};

/**
 * Xoá subcategory
 */
export const deleteSubcategory = async (id) => {
  try {
    const res = await api.delete(`/subcategories/${id}`);
    return res.data;
  } catch (error) {
    console.error("❌ deleteSubcategory error:", error);
    throw error;
  }
};
