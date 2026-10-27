import React from "react";

export default function CustomCoreValue() {
  // 📸 BƯỚC THAY BANNER:
  // Thả ảnh vào thư mục public/ (ví dụ: public/banner-moi.jpg) rồi sửa đường dẫn bên dưới:
  // const myBanner = "/banner-moi.jpg";
  const myBanner = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200";

  return (
    <section id="custom_core_value" className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl space-y-10">
        
        {/* TIÊU ĐỀ SECTION */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight">
            Giá <span className="text-[#EF5627]">trị cốt lõi</span>
          </h2>
          <div className="w-16 h-1 bg-[#EF5627] mx-auto rounded-full"></div>
        </div>

        {/* 🖼️ KHUNG CHÈN BANNER CỦA EM */}
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-2 flex items-center justify-center max-h-[450px]">
          <img
            src={myBanner}
            alt="Banner Giá trị cốt lõi"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        {/* 3 MỤC NẰM NGANG PHÍA DƯỚI (EM CHỈNH SỬA TEXT TRỰC TIẾP TẠI ĐÂY) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          
          {/* Mục 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-300 text-center space-y-3">
            <h3 className="text-xl font-bold text-[#EF5627]">Dễ dùng</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Chúng tôi đã và đang bằng mọi nỗ lực nghiên cứu các giải pháp tối ưu, thân thiện và dễ dàng ứng dụng nhất cho doanh nghiệp.
            </p>
          </div>

          {/* Mục 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-300 text-center space-y-3">
            <h3 className="text-xl font-bold text-blue-900">Tin tưởng</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Xây dựng niềm tin vững chắc cho khách hàng thông qua sự minh bạch, bảo mật và tính chính xác trong từng dịch vụ.
            </p>
          </div>

          {/* Mục 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-300 text-center space-y-3">
            <h3 className="text-xl font-bold text-[#EF5627]">Lắng nghe</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Chúng tôi luôn lắng nghe mọi ý kiến đóng góp từ khách hàng để liên tục cải tiến và hoàn thiện chất lượng dịch vụ tốt hơn.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}