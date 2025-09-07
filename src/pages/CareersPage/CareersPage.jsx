import React, { useEffect, useState } from "react";
import WhySoftdreams from "~/components/WhySoftdreams/WhySoftdreams";
import RecruitmentProcess from "~/components/RecruitmentProcess/RecruitmentProcess";
import Activities from "~/components/Activities/Activities";
import RecruitmentFAQ from "~/components/RecruitmentFAQ/RecruitmentFAQ";
import CareersBanner from "~/components/CareersBanner/CareersBanner";
import JobList from "~/components/JobList/JobList";
import { useCareerList } from "~/hooks/usePublic";

export default function CareersPage() {
  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: useCareerData } = useCareerList(currentPage, jobsPerPage);

  return (
    <>
      <div className="w-full">
        <CareersBanner />
        <JobList
          careers={useCareerData?.careers}
          currentPage={useCareerData?.currentPage}
          totalPages={useCareerData?.totalPages}
          onPageChange={setCurrentPage}
        />
        <WhySoftdreams />
        <RecruitmentProcess />
        <Activities />
        <RecruitmentFAQ />
      </div>
    </>
  );
}

