import React from "react";
import Counter from "~/components/Counter/Counter";

export default function HeroSection({ data }) {
  if (!data) return null;

  return (
    <section
      id="sec1"
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-cover bg-center bg-no-repeat text-white py-4 overflow-hidden"
      style={{
        backgroundImage: `url('${data.background}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-blue-950/70 z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 lg:space-y-6">
        
        {/* Khối Tiêu đề & Mô tả - Giữ nguyên font to */}
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-medium backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
            Giải Pháp Doanh Nghiệp Toàn Diện
          </div>

          <div
            data-aos="fade-right"
            className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white [&>strong]:text-blue-400"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />

          <div
            data-aos="fade-left"
            className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-3xl"
            dangerouslySetInnerHTML={{ __html: data.subtitle }}
          />
        </div>

        {/* Khối Thống kê (Stats) - Kích thước chữ to chuẩn */}
        {data.stats && data.stats.length > 0 && (
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            data-aos="fade-up"
          >
            {data.stats.map((item, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {item.img && (
                  <div className="p-2.5 rounded-xl bg-blue-500/20 mb-2 group-hover:scale-110 transition-transform duration-300">
                    <img src={item.img} alt="" className="w-7 h-7 object-contain" />
                  </div>
                )}
                <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  <Counter target={item.number} />
                  <span className="text-blue-400 ml-1">{item.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1 whitespace-pre-line">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Khối Slogan & Chuyển Đổi Dịch Vụ - Giữ chữ to & rõ */}
        <div 
          data-aos="zoom-in" 
          className="relative bg-slate-900/70 backdrop-blur-xl border border-blue-400/20 p-5 sm:p-6 rounded-2xl shadow-2xl shadow-blue-950/50 overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-12 gap-5 items-center relative z-10">
            
            {/* Vế trái */}
            <div className="md:col-span-5 space-y-2 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-lg border border-blue-400/30">
                <span>💎</span> Giải Pháp Song Hành
              </span>

              <div className="flex items-center gap-3 pt-1">
                <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-400/30 text-blue-400 hidden sm:block">
                  <i className="fa-solid fa-layer-group text-xl" />
                </div>
                
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase leading-snug">
                    CNTT & Kế Toán Thuế
                  </h3>
                  <p className="text-blue-400 font-medium text-xs sm:text-sm mt-0.5">
                    Tối ưu công nghệ • Minh bạch tài chính
                  </p>
                </div>
              </div>
            </div>

            {/* Vế phải */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-gray-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-blue-400 text-xs" /> Hỗ trợ kỹ thuật nhanh chóng
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check text-blue-400 text-xs" /> Tối ưu chi phí doanh nghiệp
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="/san-pham"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:gap-3"
                >
                  <span>Giải Pháp CNTT</span>
                  <i className="fa-solid fa-arrow-right text-xs" />
                </a>

                <a
                  href="/dich-vu"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:gap-3"
                >
                  <span>Kế Toán & Pháp Lý</span>
                  <i className="fa-solid fa-angle-right text-xs" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}