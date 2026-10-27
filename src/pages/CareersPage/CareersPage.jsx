import React, { useState } from "react";
import PageHeader from "~/components/PageHeader/PageHeader";
import RecruitmentProcess from "~/components/RecruitmentProcess/RecruitmentProcess";
import RecruitmentFAQ from "~/components/RecruitmentFAQ/RecruitmentFAQ";
import JobList from "~/components/JobList/JobList";
import WhySoftdreams from "~/components/WhySoftdreams/WhySoftdreams";
import { useCareerList } from "~/hooks/usePublic";

export default function CareersPage() {
  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: useCareerData } = useCareerList(currentPage, jobsPerPage);

  return (
    <div className="bg-[#F8FAFC] text-gray-800 min-h-screen w-full pb-16">
      {/* HERO BANNER */}
      <PageHeader
        badge="Gia Nhập Đội Ngũ Kim Hồng Thịnh"
        title="Cơ Hội Nghề Nghiệp & Phát Triển"
        description="Đồng hành cùng chúng tôi kiến tạo giải pháp công nghệ và dịch vụ doanh nghiệp toàn diện."
      />

      {/* ĐÃ BỎ max-w-[1400px] để các khối rộng rãi, tràn lề chuẩn responsive */}
      <div className="w-full space-y-16 mt-8">
        <JobList
          careers={useCareerData?.careers}
          currentPage={useCareerData?.currentPage}
          totalPages={useCareerData?.totalPages}
          onPageChange={setCurrentPage}
        />

        <WhySoftdreams />

        <RecruitmentProcess />

        <RecruitmentFAQ />
      </div>
    </div>
  );
}