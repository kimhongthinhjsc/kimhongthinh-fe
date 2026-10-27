export const generateSlug = (str) => {
    return str
        .toLowerCase()
        .replace(/đ/g, "d") 
        .replace(/Đ/g, "D")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};

// Khai báo thêm cấu hình thông tin liên hệ mới bên dưới
export const CONTACT_INFO = {
  ZALO_LINK: "https://zalo.me/0366660237",
  HOTLINE: "0366660237",
  EMAIL: "",
};

