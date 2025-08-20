// adminAPI.js
import axios from "axios";
const token = localStorage.getItem("accessToken");

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/products";

// Tạo sản phẩm
export const createProduct = async (product) => {
  const res = await axios.post(API_URL, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Cập nhật sản phẩm
export const updateProduct = async (id, product) => {
  console.log("Token:", token);
  const res = await axios.put(`${API_URL}/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
  // ✅ lấy lại
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};



//Home


//Cập nhật Home
export const updateHomeData = async (data) => {
  const res = await axios.put(`${API_URL}/home`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


// Đăng nhập admin
export const loginAdmin = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const createNews = async (news) => {
  console.log(news.image)

  //Call api upload ảnh
  const resImage = await axios.post(`${API_URL}/upload/image`, { file: news.image }, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    },
  });

  if (resImage.status === 200) {
    news.image = resImage.data.url; // Lưu URL ảnh đã upload
  }

  const res = await axios.post(`${API_URL}/news`, news, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};