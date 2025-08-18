// adminAPI.js
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
