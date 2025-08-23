import React from "react";

export default function Testimonial({ data }) {
  if (!data) return null;

  return (
    <section className="bg-gray-50 py-10 px-4 sm:py-14 sm:px-8 lg:py-16 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        
        {/* Left content */}
        <div
          className="rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm"
          data-aos="fade-left"
        >
          {/* Quote icon */}
          <div className="absolute -top-4 -left-4 text-[#EF5627] opacity-20 text-5xl sm:text-6xl lg:text-7xl">
            <i className="fa-solid fa-quote-left"></i>
          </div>

          <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed relative z-10">
            {data.content ||
              "Nội dung chia sẻ từ khách hàng / lãnh đạo sẽ hiển thị ở đây..."}
          </p>

          <div className="mt-6 sm:mt-8 relative z-10">
            <p className="text-gray-900 font-semibold text-base sm:text-lg lg:text-xl">
              {data.author || "Tên người phát biểu"}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              {data.position || "Chức danh / vai trò"}
            </p>
          </div>

          <hr className="mt-6 border-gray-200" />
        </div>

        {/* Right image */}
        <div
          className="flex justify-center relative group"
          data-aos="fade-right"
        >
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#a8a8a8] to-[#fbfbfb] rounded-2xl blur-lg opacity-30 group-hover:opacity-40 transition"></div>
          <img
            className="relative rounded-2xl w-48 sm:w-64 lg:w-80 object-contain shadow-lg transition-transform duration-500 group-hover:scale-105"
            src={
              data.image ||
              "https://via.placeholder.com/400x400?text=No+Image"
            }
            alt={data.author || "Người phát biểu"}
          />
        </div>
      </div>
    </section>
  );
}
