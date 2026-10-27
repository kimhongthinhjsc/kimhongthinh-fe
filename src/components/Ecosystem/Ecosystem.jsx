import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

// Dữ liệu dự phòng nếu backend chưa kịp trả về
const defaultItems = [
  {
    name: "POS365",
    desc: "Phần mềm quản lý bán hàng",
    link: "https://easybooks.vn",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS07CQJNFZGW-TlrkyVzmNg9F8hRku4qWFfGA&s",
  },
  {
    name: "Tendoo",
    desc: "Phần mềm quản lý bán hàng",
    link: "https://easybooks.vn",
    icon: "https://chukysoviettel-ca.com/wp-content/uploads/2025/06/logo-tendoo.jpg",
  },
  {
    name: "easyPos",
    desc: "Phần mềm quản lý bán hàng",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon4.png",
  },
  {
    name: "1C",
    desc: "Phần mềm quản trị nhân lực / văn phòng / sale thị trường",
    link: "https://easybooks.vn",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzo2oSHI0jflNhN264DwsJ_M2IY579dtVvw&s",
  },
  {
    name: "easyHRM",
    desc: "Phần mềm quản trị nhân lực",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon2.png",
  },
  {
    name: "1Office",
    desc: "Phần mềm quản trị nhân lực / văn phòng / sale thị trường",
    link: "https://easybooks.vn",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/af/c3/1f/afc31f4d-149b-40c2-ccb8-34a563054f00/AppIcon-0-0-1x_U007emarketing-0-8-0-0-85-220.png/434x0w.webp",
  },
  {
    name: "Misa",
    desc: "Phần mềm kế toán",
    link: "https://easybooks.vn",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/05/d7/e1/05d7e1fc-9792-f76a-f501-f4d973028b6d/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/434x0w.webp",
  },
  {
    name: "easyBooks",
    desc: "Phần mềm kế toán",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon1.png",
  },
  {
    name: "Viettel",
    desc: "Phần mềm hóa đơn điện tử / chữ ký số / bảo hiểm xã hội / tra cứu hóa đơn / hợp đồng điện tử",
    link: "https://easybooks.vn",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOR_gI9heq7_pkyLJpz-vfbVn7TCyzDxKyH405QD-e2yvkApWuoZywUl_b5KUUcbov98c&usqp=CAU",
  },
  {
    name: "EasyInvoice",
    desc: "Phần mềm hóa đơn điện tử",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon3.png",
  },
  {
    name: "EasyCA",
    desc: "Phần mềm chữ ký số",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon5.png",
  },
  {
    name: "EasyDocs",
    desc: "Phần mềm hợp đồng điện tử",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon6.png",
  },
];

export default function Ecosystem({ data }) {
  const [activeTab, setActiveTab] = useState("all");

  // Đảm bảo không bị crash nếu data undefined
  const title = data?.title || "Các phần mềm dành cho doanh nghiệp & hộ kinh doanh";
  const rawItems = data?.items || defaultItems;

  const tabs = [
    { id: "all", label: "Tất cả phần mềm" },
    { id: "pos", label: "Bán hàng & POS" },
    { id: "accounting", label: "Kế toán & Hóa đơn" },
    { id: "hrm", label: "Quản trị & Nhân sự" },
  ];

  // Lọc theo danh mục
  const filteredItems = rawItems.filter((item) => {
    if (activeTab === "all") return true;
    const desc = item.desc?.toLowerCase() || "";
    if (activeTab === "pos") return desc.includes("bán hàng");
    if (activeTab === "accounting")
      return (
        desc.includes("kế toán") ||
        desc.includes("hóa đơn") ||
        desc.includes("chữ ký") ||
        desc.includes("hợp đồng")
      );
    if (activeTab === "hrm")
      return desc.includes("nhân lực") || desc.includes("văn phòng");
    return true;
  });

  return (
    <section className="py-16 md:py-20 bg-gray-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tiêu đề & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 inline-block mb-3">
            Hệ Sinh Thái Giải Pháp
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Tích hợp toàn diện các công cụ công nghệ bán hàng, vận hành và tài chính doanh nghiệp.
          </p>
        </div>

        {/* Thanh chuyển Tab */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lưới sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filteredItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center group-hover:bg-blue-50/50 transition-colors">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-600 group-hover:text-white text-gray-400 transition-all shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
