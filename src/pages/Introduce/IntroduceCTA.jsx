import React from "react";

export default function IntroduceCTA() {
  // Thay SĐT Zalo cá nhân của em vào đây (Ví dụ: 0912345678)
  const zaloPhoneNumber = "0366660237";

  return (
    <section className="py-16 bg-[#0f172a] text-white relative overflow-hidden border-t border-slate-800">
      {/* Họa tiết ánh sáng hiệu ứng nền */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-10 -top-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-5xl text-center space-y-6 relative z-10">
        
        {/* TIÊU ĐỀ CTA */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
          Sẵn Sàng Tối Ưu Vận Hành Cùng <span className="text-amber-400">Kim Hồng Thịnh?</span>
        </h2>

        {/* MÔ TẢ NẮNG */}
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Hãy để chúng tôi đồng hành cùng doanh nghiệp của bạn với các giải pháp công nghệ thông minh và dịch vụ Kế toán – Thuế chuyên nghiệp nhất.
        </p>

        {/* CÁC NÚT HÀNH ĐỘNG */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          
          {/* Nút Đăng Ký Tư Vấn (Màu Vàng Kim -> Mở Zalo) */}
          <a
            href={`https://zalo.me/${zaloPhoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-bold rounded-xl shadow-lg hover:shadow-amber-500/20 transition duration-300 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
          >
            <span>Đăng Ký Tư Vấn Ngay</span>
          </a>

          {/* Nút Gọi Hotline */}
          <a
            href={`tel:${zaloPhoneNumber}`}
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl transition duration-300 text-center"
          >
            Hotline: 03.6666.0237
          </a>

        </div>

      </div>
    </section>
  );
}