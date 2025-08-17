

// seed/products.js
const products = [
  {
    name: "Máy tính bàn",
    images: ["https://example.com/desktop.jpg"],
    price: 8000000,
    bestSeller: false,
    highlights: ["Cấu hình mạnh mẽ", "Phù hợp văn phòng"],
    features: [],
    description:
      "Máy tính bàn chất lượng, đáp ứng nhu cầu học tập và làm việc.",
    specifications: [
      { key: "CPU", value: "Intel Core i5" },
      { key: "RAM", value: "8GB" },
      { key: "Ổ cứng", value: "SSD 256GB" },
    ],
    subcategoryId: null, // sau này thay bằng ObjectId của 'Máy tính văn phòng'
    brand: "Dell",
    warranty: "12 tháng",
    stock: 20,
    subcategoryName:"Máy tính văn phòng",
    categoryName: "Thiết bị điện tử",
  },
  {
    name: "Bộ máy tính bàn tự build",
    images: ["https://example.com/custom-build.jpg"],
    price: 10000000,
    bestSeller: true,
    highlights: ["Tùy chọn linh kiện", "Hiệu năng cao"],
    features: [],
    description: "Bộ PC tự build với linh kiện tuỳ chỉnh theo nhu cầu.",
    specifications: [
      { key: "CPU", value: "AMD Ryzen 5" },
      { key: "RAM", value: "16GB" },
      { key: "GPU", value: "NVIDIA GTX 1660" },
    ],
    subcategoryId: null,
    brand: "Custom",
    warranty: "12 tháng",
    stock: 10,
    categoryName: "Thiết bị điện tử",
    subcategoryName: "Máy tính văn phòng",
  },
  {
    name: "Máy in",
    images: ["https://example.com/printer.jpg"],
    price: 2500000,
    bestSeller: false,
    highlights: ["In nhanh", "Tiết kiệm mực"],
    features: [],
    description: "Máy in văn phòng tiện lợi, tốc độ cao.",
    specifications: [
      { key: "Loại in", value: "Laser" },
      { key: "Tốc độ", value: "20 trang/phút" },
    ],
    subcategoryId: null,
    brand: "HP",
    warranty: "12 tháng",
    stock: 15,
    subcategoryName: "Máy tính văn phòng",
    categoryName: "Thiết bị điện tử",
  },
  {
    name: "Máy POS bán hàng",
    images: ["https://example.com/pos.jpg"],
    price: 8250000,
    bestSeller: true,
    highlights: ["Màn hình cảm ứng", "Quản lý bán hàng dễ dàng"],
    features: [],
    description: "Máy POS bán hàng chuyên nghiệp cho quán cà phê, nhà hàng.",
    specifications: [
      { key: "Màn hình", value: "15.6'' Full HD" },
      { key: "RAM/ROM", value: "3GB/32GB" },
    ],
    subcategoryId: null,
    brand: "Sunmi",
    warranty: "12 tháng",
    stock: 5,
    subcategoryName: "Thiết bị POS bán hàng",
    categoryName: "Thiết bị điện tử",
  },
  {
    name: "Máy POS cầm tay",
    images: ["https://example.com/pos-handheld.jpg"],
    price: 4500000,
    bestSeller: false,
    highlights: ["Nhỏ gọn", "Hỗ trợ nhiều phương thức thanh toán"],
    features: [],
    description: "Thiết bị POS cầm tay tiện dụng, di động.",
    specifications: [
      { key: "Màn hình", value: "5.5 inch" },
      { key: "Kết nối", value: "WiFi, 4G" },
    ],
    subcategoryId: null,
    brand: "PosApp",
    warranty: "12 tháng",
    stock: 12,
    subcategoryName: "Thiết bị POS bán hàng",
    categoryName: "Thiết bị điện tử",
  },
  {
    name: "Máy in bill",
    images: ["https://example.com/bill-printer.jpg"],
    price: 1200000,
    bestSeller: false,
    highlights: ["Kết nối USB/LAN", "Tương thích nhiều phần mềm bán hàng"],
    features: [],
    description: "Máy in hóa đơn nhiệt tốc độ cao, tiện lợi cho bán hàng.",
    specifications: [
      { key: "Khổ giấy", value: "80mm" },
      { key: "Tốc độ in", value: "200mm/s" },
    ],
    subcategoryId: null,
    brand: "Xprinter",
    warranty: "12 tháng",
    stock: 25,
    subcategoryName: "Thiết bị POS bán hàng",
    categoryName: "Thiết bị điện tử",
  },
  {
    name: "POS365",
    images: ["https://pos365.vn/storage/app/media/logo.png"],
    price: 2500000,
    bestSeller: true,
    highlights: [
      "Quản lý bán hàng đa kênh",
      "Báo cáo chi tiết",
      "Hỗ trợ in bill",
    ],
    features: [],
    description:
      "Phần mềm quản lý bán hàng POS365, phù hợp cho cửa hàng, quán ăn, siêu thị mini.",
    specifications: [
      { key: "Loại", value: "Phần mềm quản lý bán hàng" },
      { key: "Hệ điều hành", value: "Windows, Android, iOS" },
    ],
    subcategoryId: null, // Phần mềm quản lý bán hàng
    brand: "POS365",
    warranty: "12 tháng",
    stock: 999,
    categoryName: "Thiết bị điện tử",
    subcategoryName: "Phần mềm quản lý bán hàng",
  },
  {
    name: "Tendoo",
    images: ["https://example.com/tendoo.png"],
    price: 2000000,
    bestSeller: false,
    highlights: ["Quản lý đơn giản", "Chi phí thấp"],
    features: [],
    description:
      "Tendoo là phần mềm bán hàng dành cho các cửa hàng nhỏ và vừa.",
    specifications: [{ key: "Loại", value: "Phần mềm quản lý bán hàng" }],
    subcategoryId: null,
    brand: "Tendoo",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm quản lý bán hàng",
    categoryName: "Thiết bị điện tử"
  },
  {
    name: "easyPos",
    images: ["https://example.com/easypos.png"],
    price: 2200000,
    bestSeller: false,
    highlights: ["Giao diện thân thiện", "Hỗ trợ nhiều chi nhánh"],
    features: [],
    description:
      "easyPos giúp quản lý bán hàng hiệu quả và tiết kiệm thời gian.",
    specifications: [{ key: "Loại", value: "Phần mềm quản lý bán hàng" }],
    subcategoryId: null,
    brand: "easyPos",
    warranty: "12 tháng",
    stock: 999,
    categoryName: "Quản trị điều hành",
    subcategoryName: "Phần mềm quản lý bán hàng"
  },
  {
    name: "1C",
    images: ["https://example.com/1c.png"],
    price: 3000000,
    bestSeller: false,
    highlights: ["Quản trị nhân lực", "Quản lý văn phòng"],
    features: [],
    description:
      "1C là giải pháp phần mềm đa năng: quản trị nhân lực, quản lý văn phòng và kế toán.",
    specifications: [
      { key: "Loại", value: "Phần mềm quản trị nhân lực / văn phòng" },
    ],
    subcategoryId: null,
    brand: "1C",
    warranty: "12 tháng",
    stock: 999,
    categoryName: "Quản trị điều hành",
    subcategoryName: "Phần mềm quản trị nhân lực",
  },
  {
    name: "easyHRM",
    images: ["https://example.com/easyhrm.png"],
    price: 2500000,
    bestSeller: false,
    highlights: ["Quản lý nhân sự", "Theo dõi chấm công"],
    features: [],
    description: "Phần mềm HRM giúp doanh nghiệp quản lý nhân sự hiệu quả.",
    specifications: [{ key: "Loại", value: "Phần mềm quản trị nhân lực" }],
    subcategoryId: null,
    brand: "easyHRM",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm quản trị nhân lực",
    categoryName: "Quản trị điều hành"
  },
  {
    name: "1Office",
    images: ["https://1office.vn/wp-content/uploads/2021/07/logo-1office.png"],
    price: 2800000,
    bestSeller: true,
    highlights: ["Quản lý văn phòng", "Quản trị nhân sự", "Quản trị sale"],
    features: [],
    description:
      "1Office là phần mềm quản trị tổng thể doanh nghiệp: nhân sự, văn phòng, sale.",
    specifications: [
      { key: "Loại", value: "Phần mềm quản trị văn phòng / sale thị trường" },
    ],
    subcategoryId: null,
    brand: "1Office",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm quản trị văn phòng",
    categoryName: "Quản trị điều hành"
  },
  {
    name: "Misa",
    images: ["https://example.com/misa.png"],
    price: 3500000,
    bestSeller: true,
    highlights: [
      "Phần mềm kế toán phổ biến tại VN",
      "Đáp ứng đầy đủ chuẩn mực kế toán",
    ],
    features: [],
    description:
      "Misa là phần mềm kế toán phổ biến, phù hợp cho doanh nghiệp vừa và nhỏ tại Việt Nam.",
    specifications: [{ key: "Loại", value: "Phần mềm kế toán" }],
    subcategoryId: null,
    brand: "Misa",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm kế toán",
    categoryName: "Tài chính kế toán"
  },
  {
    name: "easyBooks",
    images: ["https://example.com/easybooks.png"],
    price: 3000000,
    bestSeller: false,
    highlights: ["Kế toán đơn giản", "Chi phí thấp"],
    features: [],
    description:
      "easyBooks hỗ trợ các doanh nghiệp nhỏ quản lý sổ sách kế toán một cách dễ dàng.",
    specifications: [{ key: "Loại", value: "Phần mềm kế toán" }],
    subcategoryId: null,
    brand: "easyBooks",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm kế toán",
    categoryName: "Tài chính kế toán"
  },
  {
    name: "Viettel Invoice",
    images: ["https://example.com/viettel-invoice.png"],
    price: 2500000,
    bestSeller: true,
    highlights: [
      "Xuất hóa đơn điện tử nhanh chóng",
      "Được cơ quan thuế chấp thuận",
    ],
    features: [],
    description:
      "Viettel Invoice là giải pháp hóa đơn điện tử được sử dụng rộng rãi.",
    specifications: [{ key: "Loại", value: "Phần mềm Hóa đơn điện tử" }],
    subcategoryId: null,
    brand: "Viettel",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm Hóa đơn điện tử",
    categoryName: "Tài chính kế toán"
  },
  {
    name: "EasyInvoice",
    images: ["https://example.com/easyinvoice.png"],
    price: 2400000,
    bestSeller: false,
    highlights: ["Hóa đơn điện tử tiện lợi", "Chi phí hợp lý"],
    features: [],
    description:
      "EasyInvoice giúp doanh nghiệp dễ dàng phát hành và quản lý hóa đơn điện tử.",
    specifications: [{ key: "Loại", value: "Phần mềm Hóa đơn điện tử" }],
    subcategoryId: null,
    brand: "EasyInvoice",
    warranty: "12 tháng",
    stock: 999,
    categoryName: "Tài chính kế toán",
    subcategoryName: "Phần mềm Hóa đơn điện tử"
  },
  {
    name: "Viettel CA",
    images: ["https://example.com/viettel-ca.png"],
    price: 2000000,
    bestSeller: false,
    highlights: ["Chữ ký số an toàn", "Đáp ứng chuẩn pháp lý"],
    features: [],
    description:
      "Dịch vụ chữ ký số Viettel CA giúp ký điện tử an toàn, hợp pháp.",
    specifications: [{ key: "Loại", value: "Phần mềm Chữ ký số" }],
    subcategoryId: null,
    brand: "Viettel",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm Chữ ký số",
    categoryName: "Tài chính kế toán"
  },
  {
    name: "EasyCA",
    images: ["https://example.com/easyca.png"],
    price: 1800000,
    bestSeller: false,
    highlights: ["Chữ ký số dễ sử dụng", "Phù hợp doanh nghiệp nhỏ"],
    features: [],
    description:
      "EasyCA cung cấp dịch vụ chữ ký số với giao diện đơn giản và dễ sử dụng.",
    specifications: [{ key: "Loại", value: "Phần mềm Chữ ký số" }],
    subcategoryId: null,
    brand: "EasyCA",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm Chữ ký số",
    categoryName: "Tài chính kế toán"
  },
  {
    name: "Viettel BHXH",
    images: ["https://example.com/viettel-bhxh.png"],
    price: 2200000,
    bestSeller: false,
    highlights: ["Khai báo BHXH điện tử", "Kết nối cơ quan BHXH"],
    features: [],
    description:
      "Giải pháp BHXH điện tử của Viettel giúp doanh nghiệp nộp hồ sơ bảo hiểm nhanh chóng.",
    specifications: [{ key: "Loại", value: "Phần mềm Bảo hiểm xã hội" }],
    subcategoryId: null,
    brand: "Viettel",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm Bảo hiểm xã hội",
    categoryName: "Tài chính kế toán"
  },
  {
    name: "Viettel Tra cứu Hóa đơn",
    images: ["https://example.com/viettel-tra-cuu.png"],
    price: 1500000,
    bestSeller: false,
    highlights: ["Tra cứu nhanh chóng", "Kết nối trực tiếp với hệ thống thuế"],
    features: [],
    description:
      "Dịch vụ tra cứu hóa đơn Viettel giúp doanh nghiệp kiểm tra tính hợp lệ của hóa đơn.",
    specifications: [{ key: "Loại", value: "Phần mềm tra cứu hóa đơn" }],
    subcategoryId: null,
    brand: "Viettel",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm tra cứu hóa đơn",
    categoryName: "Tài chính kế toán"
  },
  {
    name: "Viettel EasyDocs",
    images: ["https://example.com/viettel-easydocs.png"],
    price: 2600000,
    bestSeller: false,
    highlights: ["Hợp đồng điện tử", "Ký kết nhanh chóng, hợp pháp"],
    features: [],
    description:
      "Viettel EasyDocs hỗ trợ tạo, ký và quản lý hợp đồng điện tử một cách tiện lợi.",
    specifications: [{ key: "Loại", value: "Phần mềm Hợp đồng điện tử" }],
    subcategoryId: null,
    brand: "Viettel",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm Hợp đồng điện tử",
    categoryName: "Tài chính kế toán"
  },
  {
    name: "EasyDocs",
    images: ["https://example.com/easydocs.png"],
    price: 2500000,
    bestSeller: false,
    highlights: ["Tạo hợp đồng điện tử", "Quản lý dễ dàng"],
    features: [],
    description:
      "EasyDocs là giải pháp hợp đồng điện tử dành cho doanh nghiệp hiện đại.",
    specifications: [{ key: "Loại", value: "Phần mềm Hợp đồng điện tử" }],
    subcategoryId: null,
    brand: "EasyDocs",
    warranty: "12 tháng",
    stock: 999,
    subcategoryName: "Phần mềm Hợp đồng điện tử",
    categoryName: "Tài chính kế toán"
  },
];

export default products;


// Thiết bị điện tử	Máy tính văn phòng
	
	
// 	Thiết bị POS bán hàng
	
	
// Quản trị điều hành	Phần mềm quản lý bán hàng
// 	Phần mềm quản trị nhân lực
// 	Phần mềm quản trị văn phòng
// 	Phần mềm quản trị sale thị trường
// Tài chính kế toán	Phần mềm kế toán
// 	Phần mềm Hóa đơn điện tử
// 	Phần mềm Chữ ký số
// 	Phần mềm Bảo hiểm xã hội
// 	Phần mềm tra cứu hóa đơn
// 	Phần mềm Hợp đồng điện tử
