import React from "react";
import bannerCareer from '~/assets/images/banner-career.png';

export default function CareersBanner() {
  return (
    <section id="careers_banner" className="relative w-full">
      {/* Background */}
      <img
        src={bannerCareer}
        alt="Tuyển dụng"
        className="w-full object-cover h-[400px] md:h-[500px]"
      />

      {/* Banner Content */}
    </section>
  );
}
