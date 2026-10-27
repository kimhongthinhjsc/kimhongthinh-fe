import React from "react";
import { Quote } from "lucide-react";
import directorImg from "~/assets/images/KHT.jpg";

export default function DirectorMessage() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
          
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Cột trái: Ảnh Giám đốc */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs aspect-[4/5] rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl bg-slate-800">
              <img
                src={directorImg}
                alt="Ban Giám Đốc"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-center">
                <p className="font-extrabold text-base text-white tracking-wide">BAN GIÁM ĐỐC</p>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Kim Hồng Thịnh</p>
              </div>
            </div>
          </div>

          {/* Cột phải: Lời nhắn màu chữ trắng đục sáng rõ (text-slate-100) */}
          <div className="lg:col-span-7 space-y-4">
            <Quote className="w-10 h-10 text-amber-400 opacity-90" />
            <h3 className="text-xl sm:text-2xl font-black text-amber-400 leading-snug">
              "Đồng hành cùng sự phát triển bền vững của doanh nghiệp"
            </h3>
            <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
              "Trong kỷ nguyên số hóa, chúng tôi tin rằng công nghệ chỉ thực sự pháthuy giá trị khi được gắn kết chặt chẽ với chuyên môn quản trị và kế toán - thuế chuẩn xác. Kim Hồng Thịnh cam kết mang đến những giải pháp thực chiến nhất, giúp hộ kinh doanh và doanh nghiệp tối ưu vận hành và an tâm tăng trưởng."
            </p>
            <div className="pt-4 border-t border-slate-800">
              <p className="text-base font-bold text-white">Đại diện Ban Giám Đốc</p>
              <p className="text-xs sm:text-sm text-amber-300 font-semibold">Công ty TNHH Kim Hồng Thịnh</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}