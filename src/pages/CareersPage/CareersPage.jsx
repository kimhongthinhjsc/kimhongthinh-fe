import React, { useState } from "react";
import jobs from "~/mock/Jobs.js";
import WhySoftdreams from "~/components/WhySoftdreams/WhySoftdreams";
import RecruitmentProcess from "~/components/RecruitmentProcess/RecruitmentProcess";
import Activities from "~/components/Activities/Activities";
import RecruitmentFAQ from "~/components/RecruitmentFAQ/RecruitmentFAQ";
import CareersBanner from "~/components/CareersBanner/CareersBanner";
import JobList from "~/components/JobList/JobList";

export default function CareersPage() {
  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <>
      <div className="w-full">
        {/* <CareersBanner />
        <JobList
          jobs={currentJobs}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <WhySoftdreams />
        <RecruitmentProcess />
        <Activities />
        <RecruitmentFAQ /> */}
      </div>
    </>
  );
}

