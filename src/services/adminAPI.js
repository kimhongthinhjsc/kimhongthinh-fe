// adminAPI.js
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/products";

// Tạo sản phẩm
export const createProduct = async (product) => {
  const token = localStorage.getItem("accessToken"); // ✅ lấy tại thời điểm gọi
  const res = await axios.post(API_URL, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Cập nhật sản phẩm
export const updateProduct = async (id, product) => {
  const token = localStorage.getItem("accessToken"); // ✅ lấy lại
  console.log("Token:", token);
  const res = await axios.put(`${API_URL}/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
  const token = localStorage.getItem("accessToken"); // ✅ lấy lại
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
