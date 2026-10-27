import "./Introduce.scss";
import IntroduceCTA from "./IntroduceCTA";
import React from "react";
import SomethingAbout from "./SomethingAbout";
import DirectorMessage from "./DirectorMessage";
import RoadSection from "./RoadSection";
import IntroduceSkeleton from "./IntroduceSkeleton";
import FadeInWhenVisible from "~/components/FramerMotion/FadeInWhenVisible";
import { useIntroduce } from "~/hooks/usePublic";
import bannerGiatri from "../../assets/images/giatricotloi.png";
// (Nếu ảnh nằm trong thư mục images thì ghi: "~/assets/images/banner-core-value.jpg")

export default function Introduce() {
  const { data: introduceData, isLoading } = useIntroduce();

  // 📸 BƯỚC THAY BANNER:
  // Em thả ảnh banner vào thư mục public/ (ví dụ: public/banner-moi.jpg) 
  // Rồi thay đường dẫn thành: const myBanner = "/banner-moi.jpg";
  const myBanner = bannerGiatri;

  if (isLoading) {
    return <IntroduceSkeleton />;
  }

  return (
    <div className="w-full">
      {/* 1. Tổng quan công ty (Truyền data để hiển thị logo và số liệu) */}
      <FadeInWhenVisible delay={0.1}>
        <SomethingAbout data={introduceData?.somethingAbout} />
      </FadeInWhenVisible>

      {/* 2. Lời nhắn Giám đốc */}
      <FadeInWhenVisible delay={0.1}>
        <DirectorMessage />
      </FadeInWhenVisible>

      {/* 3. Tầm nhìn & Sứ mệnh */}
      <FadeInWhenVisible delay={0.1}>
        <RoadSection data={introduceData?.roadSection} />
      </FadeInWhenVisible>

      {/* 4. GIÁ TRỊ CỐT LÕI (ẨN TIÊU ĐỀ - BANNER TO TRÀN KHUNG) */}
      <FadeInWhenVisible delay={0.1}>
        <section id="custom_core_value" className="py-12 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl space-y-8">
            
            {/* 🖼️ BANNER HIỂN THỊ TO PHỦ ĐẦY ĐỦ KHUNG MAX-W-6XL */}
            <div className="w-full flex items-center justify-center">
              <img
                src={myBanner}
                alt="Banner Giá trị cốt lõi"
                className="w-full h-auto object-contain rounded-2xl shadow-sm"
              />
            </div>

            {/* 3 MỤC NẰM NGANG PHÍA DƯỚI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
              
              {/* Mục 1: Kỷ Luật */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-300 text-center space-y-3">
                <h3 className="text-2xl sm:text-2xl font-black text-slate-900 tracking-tight">Kỷ Luật</h3>
                <p className="lg:col-span-7 flex flex-col gap-5 justify-between">
                  Kỷ luật trong từng quy trình giúp Hồng Thịnh Holding đảm bảo sự chính xác, nhất quán và đáng tin cậy trong công việc.
                </p>
              </div>

              {/* Mục 2: Nghiệp Vụ */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-300 text-center space-y-3">
                <h3 className="text-2xl sm:text-2xl font-black text-slate-900 tracking-tight">Nghiệp Vụ</h3>
                <p className="lg:col-span-7 flex flex-col gap-5 justify-between">
                  Chúng tôi đề cao năng lực chuyên môn và tư duy giải quyết vấn đề, kết hợp kiến thức kế toán – thuế với công nghệ để đưa ra giải pháp phù hợp với thực tế của khách hàng.
                </p>
              </div>

              {/* Mục 3: Dịch Vụ */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-300 text-center space-y-3">
                <h3 className="text-2xl sm:text-2xl font-black text-slate-900 tracking-tight">Dịch Vụ</h3>
                <p className="lg:col-span-7 flex flex-col gap-5 justify-between">
                  Chúng tôi không chỉ cung cấp dịch vụ mà hướng đến việc tạo ra hiệu quả thực tế cho khách hàng thông qua sự tận tâm, chủ động và đồng hành lâu dài.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

      {/* 5. KHỐI KÊU GỌI HÀNH ĐỘNG (CTA) */}
      <FadeInWhenVisible delay={0.1}>
        <IntroduceCTA />
      </FadeInWhenVisible>

    </div>
  );
}