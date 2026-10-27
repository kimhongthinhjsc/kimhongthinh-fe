import React from "react";
import { Link } from "react-router-dom";
import { Monitor, FileSpreadsheet, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DualCoreServices({ data }) {
  // Ưu tiên dữ liệu tĩnh mặc định, hoặc lấy từ API nếu backend có trả về
  const services = [
    {
      id: "it-solutions",
      badge: "Mảng Công Nghệ & Bán Hàng",
      title: data?.itTitle || "Giải Pháp CNTT & Thiết Bị POS",
      desc: data?.itDesc || "Cung cấp hạ tầng máy tính, phần mềm quản lý và thiết bị bán hàng chuyên nghiệp cho doanh nghiệp & cửa hàng.",
      icon: <Monitor className="w-8 h-8 text-blue-600" />,
      link: "/san-pham",
      btnText: "Khám phá sản phẩm CNTT",
      accentBg: "bg-blue-50 border-blue-100",
      btnBg: "bg-blue-600 hover:bg-blue-700",
      items: data?.itItems || [
        "Máy tính văn phòng, bộ PC build theo yêu cầu",
        "Máy in bill, máy quét mã vạch, phần mềm POS",
        "Lắp đặt hệ thống mạng & bảo trì máy tính tận nơi",
      ],
    },
    {
      id: "accounting-services",
      badge: "Mảng Tài Chính & Pháp Lý",
      title: data?.accTitle || "Dịch Vụ Kế Toán & Thuế Trọn Gói",
      desc: data?.accDesc || "Đồng hành cùng doanh nghiệp xử lý hồ sơ thuế, báo cáo tài chính và tối ưu hóa chi phí vận hành hợp pháp.",
      icon: <FileSpreadsheet className="w-8 h-8 text-indigo-600" />,
      link: "/dich-vu",
      btnText: "Tìm hiểu dịch vụ Kế toán",
      accentBg: "bg-indigo-50 border-indigo-100",
      btnBg: "bg-indigo-600 hover:bg-indigo-700",
      items: data?.accItems || [
        "Kế toán thuế trọn gói & kê khai thuế định kỳ",
        "Thành lập doanh nghiệp, thay đổi đăng ký kinh doanh",
        "Rà soát sổ sách & tư vấn tối ưu chi phí thuế",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tiêu đề khối */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
            Dịch Vụ Cốt Lõi Song Hành
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Giải Pháp Toàn Diện Cho Doanh Nghiệp
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Sự kết hợp hoàn hảo giữa hạ tầng công nghệ hiện đại và giải pháp tài chính minh bạch.
          </p>
        </div>

        {/* Lưới 2 cột dịch vụ */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3.5 rounded-2xl ${srv.accentBg} border`}>
                    {srv.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  {srv.desc}
                </p>

                <ul className="space-y-3 mb-8 border-t border-gray-100 pt-6">
                  {srv.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  to={srv.link}
                  className={`inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 ${srv.btnBg} text-white font-semibold rounded-xl shadow-md transition-all duration-200 group-hover:gap-3`}
                >
                  <span>{srv.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}