import React from "react";

export default function PageHeader({ badge, title, description, children }) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A2540] text-white py-16 sm:py-20 px-4 mb-10 shadow-lg">
      
      {/* 1. Hiệu ứng ánh sáng góc (Không sọc / Không chấm bi) */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Nội dung Banner */}
      <div className="max-w-6xl mx-auto relative z-10 text-center space-y-4">
        
        {/* Badge phân loại */}
        {badge && (
          <div>
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs sm:text-sm font-bold rounded-full uppercase tracking-widest shadow-sm">
              {badge}
            </span>
          </div>
        )}
        
        {/* Tiêu đề chính */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
          {title}
        </h1>

        {/* Tiêu đề phụ (Mô tả) - Ép nằm gọn trên 1 hàng */}
        {description && (
          <p className="text-slate-200 font-medium text-base sm:text-lg max-w-5xl md:max-w-full mx-auto leading-relaxed opacity-90 sm:whitespace-nowrap">
            {description}
          </p>
        )}

        {/* Khối tìm kiếm hoặc nút bấm nếu có */}
        {children && <div className="pt-4 max-w-lg mx-auto">{children}</div>}
      </div>

      {/* Đường viền chân banner */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-500/30" />
    </section>
  );
}