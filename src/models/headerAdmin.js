// model/headerAdmin.js

const headerAdminDetail = [
  { name: "Tổng quan", path: "/admin/dashboard/stats" },
  { name: "Trang chủ", path: "/admin/dashboard/home" },
  { name: "Giới thiệu", path: "/admin/dashboard/introduce" },
  { name: "Thông tin công ty", path: "/admin/dashboard/company-info" },
  { name: "Sản phẩm", path: "/admin/dashboard/products" },
  { name: "Danh mục", path: "/admin/dashboard/categories" },
  { name: "Dịch vụ", path: "/admin/dashboard/services" },
  { name: "Tin tức", path: "/admin/dashboard/news" },
  { name: "Sự kiện", path: "/admin/dashboard/events" },
  { name: "Tuyển dụng", path: "/admin/dashboard/careers" },
  { name: "Liên hệ", path: "/admin/dashboard/contact" },
  {
    path: "/admin/dashboard/products/create",
    name: "Thêm mới sản phẩm",
  },
  {
    path: "/admin/dashboard/products/:id/edit",
    name: "Chỉnh sửa sản phẩm",
  },
  {
    path: "/admin/dashboard/services/create",
    name: "Thêm mới dịch vụ",
  },
  {
    path: "/admin/dashboard/services/:id/edit",
    name: "Chỉnh sửa dịch vụ",
  },
  { path: "/admin/dashboard/news/update", name: "Cập nhật tin tức" },
  {
    path: "/admin/dashboard/news/create",
    name: "Thêm mới tin tức",
  },
  { path: "/admin/dashboard/events/update", name: "Cập nhật sự kiện" },
  {
    path: "/admin/dashboard/events/create",
    name: "Thêm mới sự kiện",
  }
];

export default headerAdminDetail;
