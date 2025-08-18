import React from "react";

export default function Testimonial({ data }) {

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div
          className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden"
          data-aos="fade-left"
        >
          {/* Quote icon */}
          <div className="absolute -top-4 -left-4 text-[#EF5627] opacity-20 text-7xl">
            <i className="fa-solid fa-quote-left"></i>
          </div>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed relative z-10">
            {data.content ||
              "Nội dung chia sẻ từ khách hàng / lãnh đạo sẽ hiển thị ở đây..."}
          </p>

          <div className="mt-8 relative z-10">
            <p className="text-gray-900 font-semibold text-lg">
              {data.author || "Tên người phát biểu"}
            </p>
            <p className="text-gray-500 text-sm">
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
            className="relative rounded-2xl max-h-[400px] object-contain shadow-lg transition-transform duration-500 group-hover:scale-105"
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
