// src/services/productAPI.js
import api from "./api"; // 👈 dùng instance có interceptor

// Lấy danh sách sản phẩm
export const fetchProducts = async (
  page = 1,
  limit = 12,
  categoryId,
  subcategoryId
) => {
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

//introduce
export const getIntroduce = async () => {
  const res = await api.get("/introduce");
  return res.data;
};

export const getSubcategories = async () => {
  const res = await api.get(`/subcategories`);
  return res.data;
};

export const searchProductsbyKeyword = async ({
  keyword = "",
  page = 1,
  limit = 12,
}) => {
  try {
    const params = { keyword, page, limit };

    const res = await api.get("/products/search", { params });
    return res.data; // { products, totalPages, currentPage }
  } catch (error) {
    console.error("❌ searchProducts error:", error);
    return { products: [], totalPages: 1, currentPage: 1 };
  }
};

export const getAllService = async () => {
  try {
    const res = await api.get("/services");
    return res.data;
  } catch (error) {
    console.error("❌ getAllService error:", error);
    return [];
  }
};

export const getServiceById = async (id) => {
  try {
    const res = await api.get(`/services/${id}`);
    return res.data;
  } catch (error) {
    console.error("❌ getServiceById error:", error);
    return null;
  }
};

export const getServiceByKeyword = async (keyword, page = 1, limit = 12) => {
  try {
    const res = await api.get("/services/search", {
      params: { keyword, page, limit },
    });
    return res.data;
  } catch (error) {
    console.error("❌ getServiceByKeyword error:", error);
    return { services: [], totalPages: 0, currentPage: page };
  }
};

export const getNewsList = async (page, limit) => {
  const res = await api.get(`/news/find/all?page=${page}&limit=${limit}`);
  return res.data;
};

export const getOneNews = async (titleLink) => {
  try {
    const res = await api.get(`/news/${titleLink}`);
    return res.data;
  } catch (error) {
    return { success: false, news: null };
  }
};

export const getEventList = async (page, limit) => {
  const res = await api.get(`/events/find/all?page=${page}&limit=${limit}`);
  return res.data;
};

export const getOneEvent = async (titleLink) => {
  try {
    const res = await api.get(`/events/${titleLink}`);
    return res.data;
  } catch (error) {
    return { success: false, event: null };
  }
};
