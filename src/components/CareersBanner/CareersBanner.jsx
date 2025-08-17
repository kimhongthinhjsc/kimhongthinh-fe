import React from "react";

export default function CareersBanner() {
  return (
    <section id="careers_banner" className="relative w-full">
      {/* Background */}
      <img
        src="https://softdreams.vn/wp-content/uploads/2023/12/Group-2609356.png"
        alt="Tuyển dụng"
        className="w-full object-cover h-[400px] md:h-[500px]"
      />

      {/* Banner Content */}
      <div className="absolute inset-0 flex items-center px-6 md:px-20">
        <div className="text-left text-white max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold leading-snug">
            <span className="text-blue-500">Gia nhập Softdreams</span> <br />
            <span className="text-yellow-300">
              SÁNG TẠO KHÔNG NGỪNG <br /> MAKE IT SIMPLE
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
