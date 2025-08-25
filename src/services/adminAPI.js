// adminAPI.js
const token = localStorage.getItem("accessToken");

const API_URL =
  import.meta.env.VITE_API_URL_SERVER || "http://localhost:5000/api/products";

import api from "./api"; // 👈 import instance có interceptor

// Tạo sản phẩm
export const createProduct = async (product) => {
  const res = await api.post("/products", product);
  return res.data;
};

// Cập nhật sản phẩm
export const updateProduct = async (id, product) => {
  const res = await api.put(`/products/${id}`, product);
  return res.data;
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

// Cập nhật Home
export const updateHomeData = async (data) => {
  const res = await api.put("/home", data);
  return res.data;
};

// Đăng nhập admin
export const loginAdmin = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const createNews = async (news) => {
  const formData = new FormData();
  formData.append("file", news.image);
  const resImage = await api.post(`/upload/image`, formData);

  if (resImage.status === 200) {
    news.image = resImage.data.url; // Lưu URL ảnh đã upload
  }
  const res = await api.post(`/news`, news);
  return res.data;
};

export const updateNews = async (news) => {
  if (typeof news.image !== "string") {
    console.log("Uploading new image...");
    const formData = new FormData();
    formData.append("file", news.image);
    const resImage = await api.post(`/upload/image`, formData);
    if (resImage.status === 200) {
      news.image = resImage.data.url; // Lưu URL ảnh đã upload
    }
  }
  const res = await api.put(`/news/${news._id}`, news);
  return res.data;
};

export const getNewsList = async (page, limit) => {
  const res = await api.get(`/news/find/all?page=${page}&limit=${limit}`);
  return res.data;
};

export const getOneNewsById = async (id) => {
  const res = await api.get(`/news/findId/${id}`);
  return res.data;
};

export const getOneNews = async (titleLink) => {
  const res = await api.get(`/news/${titleLink}`);
  return res.data;
};

export const deleteNews = async (id) => {
  const res = await api.delete(`/news/${id}`);
  return res.data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post(`/upload/image`, formData);
  return res.data;
};

// Upload nhiều ảnh (tối đa 5 theo backend)
export const uploadImages = async (files) => {
  const formData = new FormData();
  files.forEach((f) => formData.append("file", f));

  const res = await api.post("/upload/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Upload video
export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload/video", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateCompanyProfile = async (data) => {
  try {
    const res = await api.put("/company-profile", data);
    return res.data;
  } catch (error) {
    console.error("❌ updateCompanyProfile error:", error);
    return null;
  }
};

//introduce update
export const updateIntroduceData = async (data) => {
  try {
    const res = await api.put("/introduce", data);
    return res.data;
  } catch (error) {
    console.error("❌ updateIntroduceData error:", error);
    return null;
  }
};

export const fetchStatsVisits = async () => {
  try {
    const res = await api.get("/stats/visits");
    return res.data;
  } catch (error) {
    console.error("❌ fetchStatsVisits error:", error);
    return null;
  }
};

export const updateService = async (id, service) => {
  const res = await api.put(`/services/${id}`, service);
  return res.data;
};

export const deleteService = async (id) => {
  const res = await api.delete(`/services/${id}`);
  return res.data;
};

export const createService = async (service) => {
  const res = await api.post("/services", service);
  return res.data;
};

export const sendResetPasswordEmail = async (email) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};
