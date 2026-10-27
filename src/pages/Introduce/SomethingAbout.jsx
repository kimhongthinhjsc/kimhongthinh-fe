import React from "react";
import { CheckCircle2 } from "lucide-react";

const defaultAboutData = {
  title: "CÔNG TY TNHH DỊCH VỤ TỔNG HỢP KIM HỒNG THỊNH",
  subtitle: "NÂNG TẦM QUẢN TRỊ DOANH NGHIỆP & HỘ KINH DOANH VỚI CÁC GIẢI PHÁP CÔNG NGHỆ THÔNG MINH",
  descriptions: [
    "Kim Hồng Thịnh là đơn vị tiên phong cung cấp giải pháp toàn diện về Công nghệ thông tin (máy tính, phần mềm quản lý) và Dịch vụ Kế toán – Thuế. Chúng tôi đồng hành cùng doanh nghiệp và hộ kinh doanh tối ưu vận hành trong thời đại chuyển đổi số.",
    "Bằng sự kết hợp giữa công nghệ hiện đại và chuyên môn sâu, chúng tôi giúp khách hàng chuẩn hóa quy trình, thực hiện đúng nghĩa vụ thuế và xây dựng nền tảng tài chính minh bạch. Với phương châm \"Chất lượng – Tận tâm – Hiệu quả\", Kim Hồng Thịnh cam kết mang lại giá trị bền vững cho đối tác."
  ],
  stats: [
    { label: "Năm kinh nghiệm", value: "3+" },
    { label: "Khách hàng thân thiết", value: "400+" },
    { label: "Sự hài lòng từ khách hàng", value: "Đáp ứng 99%" },
    { label: "Lượt tư vấn khách hàng mới", value: "Hơn 1000+" }
  ]
};

export default function SomethingAbout({ data }) {
  const descriptions =
    Array.isArray(data?.descriptions) && data.descriptions.length > 0
      ? data.descriptions
      : defaultAboutData.descriptions;

  const stats = data?.stats || defaultAboutData.stats;

  return (
    <section id="sdsc_about" className="py-10 sm:py-14 bg-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* TIÊU ĐỀ TRANG */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 border border-amber-300/60 shadow-sm">
            Về Kim Hồng Thịnh
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            {data?.title || defaultAboutData.title}
          </h1>
          <p className="mt-2 text-amber-600 font-bold text-sm sm:text-base uppercase tracking-wide">
            {data?.subtitle || defaultAboutData.subtitle}
          </p>
        </div>

        {/* BỐ CỤC 2 CỘT TỰ ĐỘNG CÂN BẰNG CHIỀU CAO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* CỘT TRÁI: 2 Khối chữ chia đều cao bằng nhau */}
          <div className="lg:col-span-7 flex flex-col gap-5 justify-between">
            {descriptions.slice(0, 2).map((text, idx) => (
              <div
                key={idx}
                className="flex-1 p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-4 transition-all hover:shadow-md"
              >
                <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* CỘT PHẢI: Khung Logo không bị cắt chữ & 4 Ô số liệu nổi bật */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            
            {/* Khung chứa Logo/Ảnh vừa vặn */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-0 shadow-sm flex items-center justify-center h-52 sm:h-56">
              <img
                src={data?.image || data?.logo || "/logo.png"}
                alt="Kim Hồng Thịnh Logo"
                className="max-h-full w-auto object-contain"
              />
            </div>

            {/* Grid 4 Ô Số Liệu - Màu chữ trắng & vàng kim siêu rõ */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 text-white p-4 rounded-xl text-center shadow-md border border-slate-800 flex flex-col justify-center items-center"
                >
                  <p className="text-xl sm:text-2xl font-black text-amber-400">
                    {item.value}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-100 font-bold mt-1 leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}