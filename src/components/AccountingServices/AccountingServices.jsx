import React from "react";
import { CheckCircle2, ShieldCheck, FileText, Calculator, Building2, PhoneCall } from "lucide-react";

export default function AccountingServices() {
  // Hàm cuộn mượt xuống Form đăng ký
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactElement = document.getElementById("contact-section");
    
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // Dự phòng nếu không tìm thấy ID contact-section thì tìm ID contact
      const fallbackElement = document.getElementById("contact");
      if (fallbackElement) {
        fallbackElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Danh sách các gói dịch vụ kế toán & pháp lý cốt lõi
  const services = [
    {
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      title: "Kế Toán Thuế Trọn Gói",
      desc: "Kê khai và nộp báo cáo thuế GTGT, TNCN, TNDN định kỳ hàng tháng/quý. Đại diện làm việc với cơ quan Thuế.",
      highlights: ["Hạn chế tối đa rủi ro phạt Thuế", "Tối ưu chi phí thuế hợp pháp", "Báo cáo tiến độ hàng tháng"],
      popular: true,
    },
    {
      icon: <Building2 className="w-8 h-8 text-indigo-600" />,
      title: "Thành Lập Doanh Nghiệp",
      desc: "Tư vấn loại hình, soạn hồ sơ, ĐKKD, con dấu và mở tài khoản ngân hàng tận nơi nhanh chóng trong 3 ngày.",
      highlights: ["Khắc con dấu & biển công ty", "Hỗ trợ ĐKKD & thủ tục ban đầu", "Khởi tạo hóa đơn điện tử"],
      popular: false,
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: "Rà Soát Sổ Sách & BCTN",
      desc: "Kiểm tra, hoàn thiện hệ thống sổ sách kế toán các năm cũ, lập báo cáo tài chính cuối năm chuẩn chỉnh.",
      highlights: ["Dọn dẹp sổ sách sai sót", "Gỡ rối hồ sơ chứng từ cũ", "Chuẩn bị hồ sơ quyết toán"],
      popular: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header khối */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100 inline-block mb-3">
            Giải Pháp Tài Chính & Pháp Lý
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Dịch Vụ Kế Toán & Thuế Chuyên Nghiệp
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Đồng hành cùng doanh nghiệp tối ưu chi phí vận hành, an tâm pháp lý và minh bạch tài chính.
          </p>
        </div>

        {/* Lưới 3 dịch vụ chính */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between ${
                item.popular
                  ? "border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20"
                  : "border-gray-200/80 shadow-sm hover:shadow-lg hover:border-gray-300"
              }`}
            >
              {item.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Được chọn nhiều nhất
                </span>
              )}

              <div>
                {/* Icon & Title */}
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Các điểm nổi bật */}
                <ul className="space-y-3 mb-8">
                  {item.highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button Tư vấn - Đã thêm onClick cuộn trang */}
              <a
                href="#contact-section"
                onClick={scrollToContact}
                className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  item.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                Đăng ký tư vấn ngay
              </a>
            </div>
          ))}
        </div>

        {/* Khối Cam kết bảo mật & Trách nhiệm */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg">Cam Kết Trách Nhiệm & Bảo Mật 100%</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Chịu toàn bộ trách nhiệm giải trình số liệu và bồi thường nếu phát sinh lỗi sai sót từ dịch vụ.
              </p>
            </div>
          </div>
          
          {/* Nút Nhận báo giá - Đã thêm onClick cuộn trang */}
          <a
            href="#contact-section"
            onClick={scrollToContact}
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
          >
            Nhận báo giá chi tiết
          </a>
        </div>
      </div>
    </section>
  );
}